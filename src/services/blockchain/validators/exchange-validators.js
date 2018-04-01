import {
	LOCExchangeContract,
	nodeProvider
} from '../config/contracts-config.js';
import ethers from 'ethers';
import {
	Config
} from '../../../config';

const ERROR = require('./../config/errors.json');

export async function validateContractBalance(amount) {

	const balance = await nodeProvider.getBalance(LOCExchangeContract.address);
	if (amount.gt(balance)) {
		throw ERROR.INSUFFICIENT_AMOUNT_ETH_EXCHANGE_CONTRACT
	}
};