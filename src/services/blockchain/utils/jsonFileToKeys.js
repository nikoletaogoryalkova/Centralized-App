import {
	validatePassword,
	validateJsonObj
} from '../validators/base-validators.js'

import Wallet from 'ethereumjs-wallet'

export function parseJsonFile(jsonFile) {
	return JSON.parse(JSON.stringify(jsonFile).toLowerCase());
}

export function jsonFileToKeys(jsonFile, password) {

	validateJsonObj(jsonFile);
	validatePassword(password);

	let parsedJsonFile = parseJsonFile(jsonFile);
	let wallet = Wallet.fromV3(parsedJsonFile, password);

	let result = {}
	result.address = wallet.getAddressString();
	result.priavetKey = wallet.getPrivateKeyString();
	console.log(result);
	return result;
}