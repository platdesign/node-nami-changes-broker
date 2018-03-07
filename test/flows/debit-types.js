'use strict';



module.exports = {

	title: 'debit types',
	steps: [
		{
			image: {
				members:[
					{
						id: 1,
						beitragsartId: 1
					}
				]
			},

			events: [
				{
					type: 'joined-association',
					memberId: 1
				},

				{
					type: 'joined-debit-type',
					memberId: 1,
					payload: {
						debitType: 'normal'
					}
				}
			]
		},


		{
			image: {
				members:[
					{
						id: 1,
						beitragsartId: 2
					}
				]
			},

			events: [
				{
					type: 'left-debit-type',
					memberId: 1,
					payload: {
						debitType: 'normal'
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
				members:[
					{
						id: 1,
						beitragsartId: 3
					}
				]
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
					type: 'joined-debit-type',
					memberId: 1,
					payload: {
						debitType: 'welfare'
					}
				}
			]
		},

		{
			image: {
				members:[
					{
						id: 1,
					}
				]
			},

			events: [
				{
					type: 'left-debit-type',
					memberId: 1,
					payload: {
						debitType: 'welfare'
					}
				}
			]
		},

		{
			image: {
				members:[
					{
						id: 1,
						beitragsartId: 1
					}
				]
			},

			events: [
				{
					type: 'joined-debit-type',
					memberId: 1,
					payload: {
						debitType: 'normal'
					}
				}
			]
		},



		{
			image: {
				members:[]
			},

			events: [
				{
					type: 'left-debit-type',
					memberId: 1,
					payload: {
						debitType: 'normal'
					}
				},
				{
					type: 'left-association',
					memberId: 1
				},
			]
		},

	]

};
