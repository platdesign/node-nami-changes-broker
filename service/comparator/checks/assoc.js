'use strict';


module.exports = [

	/**
	 * Member left dpsg-stamm
	 */
	{
		type: 'left-association',
		*match(old, latest) {
			yield !latest && old
		}
	},


	/**
	 * Member joined dpsg-stamm
	 */
	{
		type: 'joined-association',
		*match(old, latest) {
			yield !old && latest;
		}
	},

];
