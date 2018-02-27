import {
	BigNumber
} from 'bignumber.js';
import {
	LOCTokenContract
} from '../config/contracts-config.js';

import {
	gasToLoc
} from '../utils/ethFuncs.js';

const ERROR = require('./../config/errors.json');
const gasConfig = require('./../config/gas-config.json');
const {
	TIMES_GAS_AMOUNT
} = require('../config/constants.json');

export async function validateLocBalance(account, locAmount, actionGas = 0) {
	const totalGas = new BigNumber(gasConfig.approve + actionGas);
	const totalGasLoc = new BigNumber(await gasToLoc(totalGas));
	const locAmountToValidate = (totalGasLoc
			.times(TIMES_GAS_AMOUNT))
		.plus(locAmount);
	let balance = await LOCTokenContract.methods.balanceOf(account).call();
	if (locAmountToValidate.gt(balance)) {
		throw ERROR.INSUFFICIENT_AMOUNT_LOC;
	}
};