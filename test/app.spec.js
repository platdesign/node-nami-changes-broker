'use strict';



const { expect } = require('code');
const boot = require('../service');
const Mongoose = require('mongoose').Mongoose;
const Mockgoose = require('mockgoose').Mockgoose;
const chalk = require('chalk');
const glob = require('glob');
const path = require('path');


const config = {
	logger: false,
	nami: {
		userId: "123456",
		password: "qwe123",
		groupId: "123456",
	},
	db: {
		host: 'localhost',
		port: 27017,
		user: '',
		pass: ''
	}
}


describe('app', function() {
	this.timeout(0);

	let app;
	let mongoose;
	let _config;
	let mockgoose


	before(async () => {

		mongoose = new Mongoose();
		mockgoose = new Mockgoose(mongoose);

		_config = {
			...config,
			mongoose
		};

		await mockgoose.prepareStorage();
		app = await boot(_config);

	});

	after(async () => {
		await app.shutdown();
		mockgoose.mongodHelper.mongoBin.childProcess.kill('SIGKILL');
	});

	const dropDB = () => before(async () => await app.db.connection.db.dropDatabase());



	describe('syncFromLatestImage()', () => {



		describe('flows', () => {

			let flows = glob.sync('*.js', { cwd: path.join(__dirname, 'flows'), realpath: true })
				.map(f => require(f))

			flows.forEach(flow => {

				describe(`Flow: ${flow.title}`, () => {
					dropDB();

					flow.steps.forEach((step, stepIndex) => {

						describe(`Step ${stepIndex+1}`, () => {

							before(async () => app.db.models.Event.remove());
							before(async () => app.db.models.Image.create(step.image));
							before(async () => app.syncFromLatestImage());
							let log;
							before(async () => log = await app.db.models.Event.find());

							it(`should emit ${step.events.length} events`, () => {

								if(step.logEvents) {
									console.log(log)
								}

								expect(log.length)
									.to.equal(step.events.length);
							});

							step.events.forEach((stepEvent, i) => {

								describe(`Event ${i+1}`, () => {

									let logEvent;
									before(() => logEvent = log[i]);

									it(`should have type: ${stepEvent.type}`, () => {
										expect(logEvent.type)
											.to.equal(stepEvent.type);
									});

									if(stepEvent.memberId) {
										it(`should have memberId: ${stepEvent.memberId}`, () => {
											expect(logEvent.memberId)
												.to.equal(stepEvent.memberId);
										});
									}

									if(stepEvent.payload) {

										describe('payload', () => {

											Object.keys(stepEvent.payload).forEach(pkey => {

												it(`${chalk.cyan(pkey+':')} ${stepEvent.payload[pkey]}`, () => {
													expect(logEvent.payload[pkey])
														.to.equal(stepEvent.payload[pkey]);
												});

											});

										});

									}

								});

							});

							describe('after image events processed', () => {
								it('should not emit any events if syncFromLatestImage() is called again', async () => {

									await app.db.models.Event.remove();
									await app.syncFromLatestImage();
									let count = await app.db.models.Event.count();
									expect(count).to.equal(0);

								});
							});

						});

					});

				})

			});

		});

	});

});
