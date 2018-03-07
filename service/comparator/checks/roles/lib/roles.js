'use strict';



module.exports = [
	{
		id: 1,
		type: 'member',
		desc: 'Mitglied',
		debited: true
	},

	{
		id: 2,
		type: 'representative',
		desc: 'SprecherIn',
		debited: true
	},

	{
		id: 4,
		type: 'representative.parents',
		desc: 'ElternvertreterIn',
		debited: false
	},

	{
		id: 5,
		type: 'representative.leaderteam',
		desc: 'Leitungsteam-SprecherIn',
		debited: true
	},

	{
		id: 6,
		type: 'leader',
		desc: 'Leiter',
		debited: true
	},

	{
		id: 10,
		type: 'advisor',
		desc: 'Referent',
		debited: true
	},

	{
		id: 11,
		type: 'cleric',
		desc: 'Kurat',
		debited: true
	},

	{
		id: 13,
		type: 'president',
		desc: 'Vorsitzender',
		debited: true
	},

	{
		id: 19,
		type: 'business-executive',
		debited: true
	},

	{
		id: 20,
		type: 'cashier',
		desc: 'Kassierer',
		debited: true
	},


	{
		id: 21,
		type: 'cash-auditor',
		desc: 'Kassenprüfer',
		debited: true
	},

	{
		id: 23,
		type: 'kitman',
		desc: 'Materialwart',
		debited: true
	},

	{
		id: 35,
		type: 'member-trial',
		desc: 'Schnuppermitgliedschaft',
		debited: false
	},

	{
		id: 39,
		type: 'passive-member',
		debited: true
	},

	{
		id: 40,
		type: 'misc-member-insured',
		desc: 'sonst. MitarbeiterIn (mit Versicherungsschutz)',
		debited: true
	},

	{
		id: 41,
		type: 'misc-member',
		desc: 'sonst. MitarbeiterIn (ohne Versicherungsschutz)',
		debited: false
	}

];

