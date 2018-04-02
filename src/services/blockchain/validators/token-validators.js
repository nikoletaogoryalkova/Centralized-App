import ethers from 'ethers';
import {
	LOCTokenContract
} from '../config/contracts-config.js';

// import {
// 	gasToLoc
// } from '../utils/ethFuncs.js';

const ERROR = require('./../config/errors.json');
// const gasConfig = require('./../config/gas-config.json');
// const {
// 	TIMES_GAS_AMOUNT
// } = require('../config/constants.json');

export async function validateLocBalance(account, locAmount, wallet, actionGas = 0) {
	const gasAmountApprove = ethers.utils.bigNumberify(gasConfig.approve);
	const gasAmountAction = ethers.utils.bigNumberify(actionGas);
	const totalGas = gasAmountApprove.add(gasAmountAction);
	const totalGasLoc = (await gasToLoc(totalGas));
	const locAmountToValidate = (totalGasLoc
			.add(TIMES_GAS_AMOUNT))
		.mul(locAmount);

	let balance = await LOCTokenContract.balanceOf(account);
	if (locAmountToValidate.gt(balance)) {
		throw ERROR.INSUFFICIENT_AMOUNT_LOC;
	}
};