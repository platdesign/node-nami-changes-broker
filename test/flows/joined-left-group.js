'use strict';



module.exports = {

	title: 'joined-left-group',
	steps: [
		{
			image: {
				members:[
					{
						id: 1,
						vorname: 'Hans',
						nachname: 'Peter',
						roles: [
							{
								"id": 1,
								"taetigkeitId": 6,
								"untergliederungId": 1,
								"aktivVon": "2014-02-15 00:00:00",
								"aktivBis": ""
							}
						]

					}
				]
			},

			events: [
				{
					type: 'joined-association'
				},
				{
					type: 'joined-group.leader'
				},

			]
		},

		{
			image: {
				members: []
			},
			events: [
				{
					type: 'left-group.leader'
				},
				{
					type: 'left-association',
					memberId: 1,
					payload: {
						vorname: 'Hans',
						nachname: 'Peter'
					}
				}
			]
		}
	]

};
