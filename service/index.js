'use strict';



const Mongoose = require('mongoose').Mongoose;
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const NaMi = require('@platdesign/nami-sdk');
const comparator = require('./comparator');
const EventEmitter = require('events');
const CronJob = require('cron').CronJob;




let boot = module.exports = async config => {

	let app = {};
	app.events = new EventEmitter();


	app.log = function(tags, data) {

		if(config.logger === false) {
			return;
		}

		if(!config.logger) {
			return console.log(`${new Date().toISOString()} [${tags.join(',')}]`, data);
		}

		config.logger(tags, data);

	};




	let mongoose = config.mongoose || new Mongoose();

	let db = await mongoose.connect(`mongodb://${config.db.host || 'localhost'}:${config.db.port || 27017}/${config.db.db}`, {
		user: config.db.user,
		pass: config.db.pass
	});

	app.log(['info'], 'Connected to MongoDB');


	app.db = db;

	// Register models
	glob.sync('*.js', { cwd: path.join(__dirname, 'models'), realpath: true })
		.forEach(f => {
			let registerModel = require(f);
			registerModel(db);
		});



	const nami = new NaMi({
		...config.nami,
		production: true
	});

	app.log(['info'], 'Initialized NaMi-Client');



	if(config.cron) {
		app.syncJob = new CronJob({
			cronTime: (config.cron === true || !config.cron.time) ? '00 00 03 * * *' : config.cron.time,
			async onTick() {
				await app.createImage();
				await app.syncFromLatestImage(false);
			},
			start: true,
			timeZone: 'Europe/Berlin'
		});

		app.log(['info'], 'Initialized SyncCron');
	}




	app.shutdown = async function() {
		await mongoose.disconnect();
	};



	app.createImage = async function() {

		app.log(['info', 'image'], 'Create NaMi-Image');

		let image = await db.models.Image.create({});

		try {

			let { data } = await nami.getMembersShort();
			let memberIdsRemote = data.map(e => e.id);

			await memberIdsRemote.reduce(async (p, id, index) => {
				await p;

				app.log(['info', 'image'], `Loading member ${index+1}/${memberIdsRemote.length}`);

				let { data:remote } = await nami.getMemberDetails(id);



				let roleIds = (await nami.getMemberRolesShort(id)).data.map(e => e.id);
				remote.roles = await Promise.all(roleIds.map(async rid => {
					return (await nami.getMemberRoleDetails(id, rid)).data;
				}));

				image.members.push(remote);
				await image.save();

			}, Promise.resolve())

			if(memberIdsRemote.length === image.members.length) {
				return image;
			} else {
				throw new Error('Sync length does not match');
			}

		} catch(e) {
			app.log(['error', 'image'],e)
			await image.remove();
		} finally {
			app.log(['info', 'image'], 'Created NaMi-Image');
		}

	}



	app.syncFromLatestImage = async function(reprocess = false) {

		app.log(['info', 'sync'], 'Starting from latest image');

		let [latestImage, oldImage] = (await db.models.Image.find().limit(2).sort('-createdAt'));


		if(!latestImage || (!reprocess && latestImage.processed)) {
			app.log(['info', 'sync'], 'No unprocessed image found');
			return null;
		}

		app.log(['info', 'sync'], `Using image ${latestImage.id}`);

		let pendingEvents = [];
		const emit = (memberId, type, payload) => {

			let e = {
				type,
				memberId,
				payload
			};

			pendingEvents.push(async () => {
				let _e = await db.models.Event.create(e);
				app.events.emit('member', _e);
			});
		};

		let latestMemberIds = [];
		latestImage.members.forEach(latest => {
			latestMemberIds.push(latest.id);

			let old = oldImage && oldImage.members.find(m => m.id === latest.id);

			comparator(old, latest, (type, payload) => {
				emit(latest.id, type, payload);
			});

		});


		if(oldImage) {
			oldImage.members
			.filter(m => !latestMemberIds.includes(m.id))
			.forEach(old => {
				let latest = latestImage.members.find(m => m.id === old.id);

				comparator(old, latest, (type, payload) => {
					emit(old.id, type, payload);
				}, true);

			});
		}


		latestImage.set('processed', true);
		await latestImage.save();

		await pendingEvents.reduce((p, next) => p.then(next), Promise.resolve())

		app.log(['info', 'sync'], 'Done');

	};


	app.log(['info'], 'Booted');

	setImmediate(async () => {
		if(config.imageOnStart) {
			await app.createImage();
		}

		if(config.syncOnStart) {
			await app.syncFromLatestImage();
		}
	});

	return app;
};

