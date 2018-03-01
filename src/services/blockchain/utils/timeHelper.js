const constants = require('./../config/constants.json');
const moment = require('moment');

export function formatTimestamp(timestamp) {
	let result = moment.unix(timestamp);
	result.set({
		h: constants.globalTimestampHour,
		m: constants.globalTimestampMinutes,
		s: constants.globalTimestampSeconds
	});

	return result.unix();
};