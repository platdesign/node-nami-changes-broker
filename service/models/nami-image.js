'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types } = Schema;


module.exports = db => {



	let RoleSchema = new Schema({
		id: Types.Number,
		gruppierungId: Types.Number,
		taetigkeitId: Types.Number,
		untergliederungId: Types.Number,
		aktivVon: Types.Date,
		aktivBis: Types.Date,
		//debited: Types.Boolean
	});

	RoleSchema.virtual('active').get(function() {
		return this.aktivVon && !this.aktivBis;
	});


	let MemberSchema = new Schema({
		id: Types.Number,
		vorname: Types.String,
		nachname: Types.String,

		geschlecht: Types.String,
		geburtsDatum: Types.Date,
		staatsangehoerigkeit: Types.String,

		eintrittsdatum: Types.Date,
		austrittsDatum: Types.Date,

		mitgliedsNummer: Types.Number,
		status: Types.String,
		beitragsartId: Types.Number,

		email: Types.String,
		telefon1: Types.String,
		telefon2: Types.String,

		strasse: Types.String,
		plz: Types.String,
		ort: Types.String,
		region: Types.String,
		land: Types.String,

		roles: {
			type: [RoleSchema],
			default: []
		}
	});


	let schema = new Schema({

		members: {
			type: [MemberSchema],
			default: []
		},

		processed: {
			type: Types.Boolean,
			default: false
		}

	}, {
		collection: 'sync-images',
		timestamps: true
	});


	return db.model('Image', schema);

}
