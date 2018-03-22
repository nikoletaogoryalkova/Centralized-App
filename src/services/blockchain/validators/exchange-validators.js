import {
	BigNumber
} from 'bignumber.js';
import {
	web3
} from '../config/contracts-config.js';
import {
	LOCTokenContract
} from '../config/contracts-config.js';
import {
	LOCExchangeContract
} from '../config/contracts-config.js';


const ERROR = require('./../config/errors.json');

export async function validateContractBalance(amount) {
	const balance = await web3.eth.getBalance(LOCExchangeContract._address);

	let amountBN = new BigNumber(amount);
	if (amount.gt(balance)) {
		throw ERROR.INSUFFICIENT_AMOUNT_ETH_EXCHANGE_CONTRACT
	}
};