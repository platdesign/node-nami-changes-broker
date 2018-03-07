'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types } = Schema;


module.exports = db => {



	let schema = new Schema({
		type: Types.String,
		memberId: Types.Number,
		payload: Types.Mixed
	}, {
		collection: 'eventlog',
		timestamps: {
			updatedAt: false
		},
	});


	return db.model('Event', schema);

}
