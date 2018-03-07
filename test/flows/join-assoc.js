'use strict';



module.exports = {

	title: 'join/left assoc and debitType',
	steps: [
		{
			image: {
				members:[
					{
						id: 1,
						vorname: 'Hans',
						nachname: 'Peter',
						beitragsartId: 2,
						roles: [

						]
					}
				]
			},

			events: [
				{
					type: 'joined-association',
					memberId: 1,
					payload: {
						vorname: 'Hans',
						nachname: 'Peter',
					}
				},

				{
					type: 'joined-debit-type',
					memberId: 1,
					payload: {
						debitType: 'family'
					}
				}
			]
		},

		{
			image: {
				members: []
			},
			events: [
				{
					type: 'left-debit-type',
					memberId: 1,
					payload: {
						debitType: 'family'
					}
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
