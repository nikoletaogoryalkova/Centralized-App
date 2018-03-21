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
		return web3.utils.toWei(response.data.fast / 10, 'gwei');

	} catch (e) {
		return web3.eth.getGasPrice();
	}
};

export async function gasToLoc(gasAmount) {
	const gasCost = await getGasPrice() * gasAmount;
	return await LOCExchangeContract.methods.weiToLocWei(gasCost).call();
};