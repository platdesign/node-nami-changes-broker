'use strict';

const SCOPES = require('./lib/scopes').reduce((map, item) => map.set(item.id, item), new Map());
const ROLES = require('./lib/roles').reduce((map, item) => map.set(item.id, item), new Map());



function createGroupMember(type) {

	const roleTypesDict = {
		attendee: 'member',
		leader: 'leader',
		'attendee-trial':'member-trial'
	};

	return [
		{
			type: `left-group.${type}`,

			match: {
				*roles(old, latest) {

					if(!old || !ROLES.get(old.taetigkeitId) || ROLES.get(old.taetigkeitId).type !== roleTypesDict[type]) {
						return;
					}

					let scope = SCOPES.get(old.untergliederungId);

					if(!latest && old.active) {
						yield {
							group: scope.desc
						}
					} else if(latest && !latest.active && old.active) {
						yield {
							group: scope.desc
						}
					}

				}
			}

		},

		{
			type: `joined-group.${type}`,

			match: {
				*roles(old, latest) {

					if(
						!latest ||
						!latest.active ||
						!ROLES.has(latest.taetigkeitId) ||
						ROLES.get(latest.taetigkeitId).type !== roleTypesDict[type] ||
						(old && latest.active && old.active) ||
						![1,2,3,4].includes(latest.untergliederungId)
					) {
						return;
					}

					let scope = SCOPES.get(latest.untergliederungId);
					yield {
						group: scope.desc
					}
				}
			}

		},

	]

}



module.exports = [
	...createGroupMember('leader'),
	...createGroupMember('attendee'),
	...createGroupMember('attendee-trial'),
];
