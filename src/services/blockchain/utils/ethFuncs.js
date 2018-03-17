import axios from 'axios';
import {
	BigNumber
} from 'bignumber.js';
import {
	web3
} from '../config/contracts-config.js';
import {
	LOCExchangeContract
} from '../config/contracts-config.js';

import {
	validateContractBalance
} from '../validators/exchange-validators.js'
import {
	approveContract
} from "../utils/approveContract";

import {
	signTransaction
} from '../utils/signTransaction.js';

const {
	GAS_STATION_API
} = require('../config/constants.json');
const gasConfig = require('../config/gas-config.json');

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

export async function exchangeLocForEth(JSONPassPublicKey, JSONPassPrivateKey, amount) {

	let result = {};

	validateContractBalance(amount);
	const locWeiAmount = await LOCExchangeContract.methods.weiToLocWei(
		amount.toString(10)).call();
	result.ApproveContractTxn = await approveContract(
		JSONPassPublicKey,
		JSONPassPrivateKey,
		locWeiAmount,
		LOCExchangeContract._address
	);

	const exchangeMethod = await LOCExchangeContract.methods.exchangeLocWeiToEthWei(
		locWeiAmount
	);
	const funcData = await exchangeMethod.encodeABI({
		from: JSONPassPublicKey
	});

	const signedData = await signTransaction(
		LOCExchangeContract._address,
		JSONPassPublicKey,
		JSONPassPrivateKey,
		gasConfig.exchangeLocToEth,
		funcData,
	);

	result.exchangeLocToEthTxn = await web3.eth.sendSignedTransaction(signedData);
	return result;
};

export async function fundTransactionAmountIfNeeded(JSONPassPublicKey, JSONPassPrivateKey,
	actionGas = 0) {

	let result = {};
	let accountBalance = await web3.eth.getBalance(JSONPassPublicKey);

	const gasPrice = await web3.eth.getGasPrice();
	const gasAmountApprove = new BigNumber(gasPrice * gasConfig.approve);
	const gasAmountExchange = new BigNumber(gasPrice * gasConfig.exchangeLocToEth);
	const gasAmountNeeded = gasAmountApprove.plus(gasAmountExchange);
	const gasAmountAction = new BigNumber(gasPrice * actionGas);

	//This should be in the Java
	if (gasAmountNeeded.gt(accountBalance)) {
		result.FundInitialGas = await axios.post('http://localhost:8080/sendFundsToAccount', {
			amount: gasAmountNeeded.toString(10),
			recipient: JSONPassPublicKey
		})
		accountBalance = await web3.eth.getBalance(JSONPassPublicKey);
	}

	const minAllowedGasAmount = (gasAmountAction
			.plus(gasAmountNeeded))
		.times(gasConfig.MIN_TIMES_GAS_AMOUNT);

	if (minAllowedGasAmount.gt(accountBalance)) {
		const amountToExchange = (gasAmountAction
				.plus(gasAmountApprove))
			.times(gasConfig.TIMES_GAS_AMOUNT);

		result.exchangeLocToEthTxn = await exchangeLocForEth(
			JSONPassPublicKey,
			JSONPassPrivateKey,
			amountToExchange
		);
	}

	return result;
}