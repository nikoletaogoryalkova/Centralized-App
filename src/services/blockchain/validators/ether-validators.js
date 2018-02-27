import {
	validateHexString
} from './base-validators.js';

const ERROR = require('./../config/errors.json');

export function validateEtherAddress(address) {
	if (address === '0x0000000000000000000000000000000000000000') return false;
	else if (address.substring(0, 2) !== '0x') return false;
	else if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) return false;
	else if (/^(0x)?[0-9a-f]{40}$/.test(address) ||
		/^(0x)?[0-9A-F]{40}$/.test(address)) return true;
	else
		return true;
}

export function isTxDataValid(txData) {
	if (txData.to !== '0xCONTRACT' && !validateEtherAddress(txData.to)) {
		throw ERROR.INVALID_ADDRESS;
	}
	if (parseFloat(txData.gasLimit) <= 0) {
		throw ERROR.INVALID_GAS_LIMIT;
	}
	if (!validateHexString(txData.data)) {
		throw ERROR.INVALID_DATA;
	}
};