import axios from 'axios';
import {
	web3
} from '../config/contracts-config.js';
import {
	LOCExchangeContract
} from '../config/contracts-config.js';

const {
	GAS_STATION_API
} = require('../config/constants.json');

export async function getGasPrice() {

	try {
		let response = await axios.get(GAS_STATION_API);
		return web3.utils.toWei(response.data.average_calc / 10, 'gwei');

	} catch (e) {
		return web3.eth.getGasPrice();
	}
};

export async function gasToLoc(gasAmount) {
	const gasCost = await getGasPrice() * gasAmount;
	return await LOCExchangeContract.methods.weiToLocWei(gasCost).call();
};

export function toBytes32(i) {
	const stringed = "0000000000000000000000000000000000000000000000000000000000000000" + i.toString(16);
	return "0x" + stringed.substring(stringed.length - 64, stringed.length);
};