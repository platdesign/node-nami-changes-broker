'use strict';

const is = require('is');


const checks = [
	...require('./checks/assoc'),
	...require('./checks/debit-type'),
	...require('./checks/roles')
];





module.exports = (old, latest, emit, reverse) => {


	let _checks = [...checks];
	if(reverse) {
		_checks.reverse();
	}


	for(let check of _checks) {

		if(check.type) {

			if(is.fn(check.match)) {
				for(let payload of check.match(old, latest)) {
					if(payload) {
						emit(check.type, payload);
					}
				}
			} else if(is.object(check.match)) {

				for(let subKey of Object.keys(check.match)) {
					if(is.fn(check.match[subKey])) {

						let oldList = ((old && old[subKey]) || []).sort((a, b) => a.id - b.id);
						let latestList = ((latest && latest[subKey]) || []).sort((a, b) => a.id - b.id);

						let oldCheckedIds = [];

						oldList.forEach(oldItem => {
							oldCheckedIds.push(oldItem.id);
							let latestItem = latestList.find(i => i.id === oldItem.id);

							for(let payload of check.match[subKey](oldItem, latestItem)) {
								if(payload) {
									emit(check.type, payload);
								}
							}
						});


						latestList.filter(i => !oldCheckedIds.includes(i.id))
							.forEach(latestItem => {

								let oldItem = oldList.find(i => i.id === latestItem.id);

								for(let payload of check.match[subKey](oldItem, latestItem)) {
									if(payload) {
										emit(check.type, payload);
									}
								}

							});


					}

				}

			}

		}


	}

}
