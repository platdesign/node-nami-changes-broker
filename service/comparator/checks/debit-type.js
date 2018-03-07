'use strict';


const DEBIT_TYPES = (new Map())
	.set(1, 'normal')
	.set(2, 'family')
	.set(3, 'welfare')
	.set(4, 'normal')		// Stiftungseuro
	.set(5, 'family')		// Stiftungseuro
	.set(6, 'welfare')	// Stiftungseuro




module.exports = [

	/**
	 * Member left dpsg-stamm
	 */
	{
		type: 'left-debit-type',

		// matchDisappear(old) {

		// },

		// matchAppear(latest) {

		// },

		*match(old, latest) {

			// Left assoc and had old.beitragsartId
			if(!latest && old && old.beitragsartId) {
				yield { debitType: DEBIT_TYPES.get(old.beitragsartId) };

			// latest.beitragsartId !== old.beitragsartId
			} else if(latest && old && old.beitragsartId && latest.beitragsartId !== old.beitragsartId) {
				yield { debitType: DEBIT_TYPES.get(old.beitragsartId) };
			}

		}
	},

	/**
	 * Member joined dpsg-stamm
	 */
	{
		type: 'joined-debit-type',
		*match(old, latest) {

			// joined assoc
			if(!old && latest && latest.beitragsartId) {
				yield { debitType: DEBIT_TYPES.get(latest.beitragsartId) };

			// latest.beitragsartId !== old.beitragsartId
			} else if(latest && old && latest.beitragsartId && latest.beitragsartId !== old.beitragsartId) {
				yield { debitType: DEBIT_TYPES.get(latest.beitragsartId) };
			}

		}
	},

];
