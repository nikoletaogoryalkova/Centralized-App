import axios from 'axios';
import {
	web3
} from '../config/contracts-config.js';

const errors = require('../config/errors.json');
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