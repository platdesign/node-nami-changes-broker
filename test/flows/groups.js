'use strict';



module.exports = {

	title: 'groups',
	steps: [
		{
			image: {
				members:[
					{
						id: 1,
						roles: [
							{
								id: 1,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 4,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: ''
							}
						]
					}
				]
			},

			events: [
				{
					type: 'joined-association',
					memberId: 1,
				},

				{
					type: 'joined-group.attendee',
					memberId: 1,
					payload: {
						group: 'Rover'
					}
				},

			]
		},





		{
			image: {
				members:[
					{
						id: 1,
						roles: [
							{
								id: 1,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 4,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: '2013-11-16 00:00:00'
							},

							{
								id: 2,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 2,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: ''
							}
						]
					}
				]
			},

			events: [
				{
					type: 'left-group.attendee',
					memberId: 1,
					payload: {
						group: 'Rover'
					}
				},
				{
					type: 'joined-group.attendee',
					memberId: 1,
					payload: {
						group: 'Jungpfadfinder'
					}
				},
			]
		},



		{
			image: {
				members:[
					{
						id: 1,
						roles: [
							{
								id: 1,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 4,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: '2013-11-16 00:00:00'
							},

							{
								id: 2,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 2,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: '2013-11-16 00:00:00'
							}
						]
					}
				]
			},

			events: [
				{
					type: 'left-group.attendee',
					memberId: 1,
					payload: {
						group: 'Jungpfadfinder'
					}
				}
			]
		},


		{
			image: {
				members:[
					{
						id: 1,
						roles: [
							{
								id: 1,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 4,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: '2013-11-16 00:00:00'
							},

							{
								id: 2,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 2,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: '2013-11-16 00:00:00'
							},

							{
								id: 3,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 2,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: ''
							},

							{
								id: 4,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 3,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: ''
							},
						]
					}
				]
			},

			events: [
				{
					type: 'joined-group.attendee',
					memberId: 1,
					payload: {
						group: 'Jungpfadfinder'
					}
				},
				{
					type: 'joined-group.attendee',
					memberId: 1,
					payload: {
						group: 'Pfadfinder'
					}
				}
			]
		},


		{
			image: {
				members:[
					{
						id: 1,
						roles: [
							{
								id: 1,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 4,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: '2013-11-16 00:00:00'
							},

							{
								id: 2,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 2,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: '2013-11-16 00:00:00'
							},

							{
								id: 3,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 2,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: ''
							},

							{
								id: 4,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 3,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: ''
							},
						]
					}
				]
			},

			events: []
		},


		{
			image: {
				members:[
					{
						id: 1,
						roles: [
							{
								id: 1,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 4,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: '2013-11-16 00:00:00'
							},

							{
								id: 2,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 2,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: '2013-11-16 00:00:00'
							},

							{
								id: 3,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 2,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: ''
							},

							{
								id: 4,
								gruppierungId: 160208,
								taetigkeitId: 1,
								untergliederungId: 3,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: ''
							},

							{
								id: 5,
								gruppierungId: 160208,
								taetigkeitId: 6,
								untergliederungId: 3,
								aktivVon: '2013-11-16 00:00:00',
								aktivBis: ''
							},
						]
					}
				]
			},

			events: [
				{
					type: 'joined-group.leader'
				}
			]
		},



		{
			image: {
				members:[

				]
			},

			events: [

				{
					type: 'left-group.attendee',
					memberId: 1,
					payload: {
						group: 'Jungpfadfinder'
					}
				},

				{
					type: 'left-group.attendee',
					memberId: 1,
					payload: {
						group: 'Pfadfinder'
					}
				},

				{
					type: 'left-group.leader',
					memberId: 1,
					payload: {
						group: 'Pfadfinder'
					}
				},

				{
					type: 'left-association',
					memberId: 1
				}
			]
		},


	]

};
