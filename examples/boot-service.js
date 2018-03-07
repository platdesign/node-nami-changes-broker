'use strict';


const boot = require('./service');


const config = {
	cron: true,
	syncOnStart: true,
	imageOnStart: false,
	db: {
		host: 'localhost',
		db: 'nami-sync',
		user: '',
		pass: ''
	},
	nami: {
		userId: '123456',
		password: 'qwe123qwe',
		groupId: '654321',
	}
};


(async () => {

	let { events } = await boot(config);

	events.on('member', e => console.log(e));

})().catch(err => {
	console.log(err);
	process.exit(1);
});
