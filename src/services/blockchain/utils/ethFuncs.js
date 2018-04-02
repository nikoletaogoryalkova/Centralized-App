import axios from 'axios';
import {
	LOCExchangeContract,
	LOCExchangeContractWithWallet,
	nodeProvider
} from '../config/contracts-config.js';

import {
	validateContractBalance
} from '../validators/exchange-validators.js'
import {
	approveContract
} from "../utils/approveContract";
import {
	Config
} from '../../../config.js';
import ethers from 'ethers';

const {
	GAS_STATION_API,
	JAVA_REST_API_SEND_FUNDS,
	nonceMaxNumber
} = require('../config/constants.json');
const gasConfig = require('../config/gas-config.json');

export async function getGasPrice() {

	try {
		let response = await axios.get(GAS_STATION_API);
		return ethers.utils.parseUnits((response.data.fast / 10).toString(10), 'gwei');

	} catch (e) {
		return await nodeProvider.getGasPrice();
	}
};

export async function gasToLoc(gasAmount) {
	let gasCostPrice = await getGasPrice();
	let gasCost = gasCostPrice.mul(gasAmount);
	const gasCoonst = ethers.utils.bigNumberify(gasCost);
	let contractBalacne = await LOCExchangeContract.getLocBalance();

	return await LOCExchangeContract.weiToLocWei(gasCoonst);
};

export async function exchangeLocForEth(walletAddress, walletPrivateKey, amount) {
	let result = {};
	let wallet = new ethers.Wallet(walletPrivateKey);
	const gasPrice = await getGasPrice();

	await validateContractBalance(amount);
	const locWeiAmount = await LOCExchangeContract.weiToLocWei(amount);

	result.ApproveContractTxn = await approveContract(
		wallet,
		locWeiAmount,
		LOCExchangeContract.address,
		gasPrice
	);

	const LOCExchangeContractInstance = LOCExchangeContractWithWallet(wallet);
	const overrideOptions = {
		gasLimit: gasConfig.exchangeLocToEth,
		gasPrice: gasPrice
	};
	result.exchangeLocToEthTxn = await LOCExchangeContractInstance.exchangeLocWeiToEthWei(
		locWeiAmount, overrideOptions
	);
	await nodeProvider.waitForTransaction(result.exchangeLocToEthTxn.hash);
	return result;
};

export async function fundTransactionAmountIfNeeded(walletAddress, walletPrivateKey,
	actionGas = 0) {

	let result = {};
	let accountBalance = await nodeProvider.getBalance(walletAddress);

	const gasPrice = await getGasPrice();
	result.gasPrice = gasPrice;

	const gasAmountApprove = gasPrice.mul(gasConfig.approve);
	const gasAmountExchange = gasPrice.mul(gasConfig.exchangeLocToEth);
	const gasAmountNeeded = gasAmountApprove.add(gasAmountExchange);
	const gasAmountAction = gasPrice.mul(actionGas);
	let nonceNumber = await localNodeProvider.getTransactionCount(walletAddress);

	if (gasAmountNeeded.gt(accountBalance) && nonceNumber < nonceMaxNumber) {
		// TODO: This should point to the backend java rest-api
		result.FundInitialGas = await axios.post((Config.getValue('basePath') + JAVA_REST_API_SEND_FUNDS), {
			amount: gasAmountNeeded.toString(10),
			recipient: walletAddress
		})
		accountBalance = await nodeProvider.getBalance(walletAddress);

	}
	const minAllowedGasAmountFirst = (gasAmountAction
		.add(gasAmountNeeded));

	const minAllowedGasAmount = minAllowedGasAmountFirst.mul(gasConfig.MIN_TIMES_GAS_AMOUNT)

	if (minAllowedGasAmount.gt(accountBalance)) {
		const amountToExchange = (gasAmountAction
				.add(gasAmountApprove))
			.mul(gasConfig.TIMES_GAS_AMOUNT);
		result.exchangeLocToEthTxn = await exchangeLocForEth(
			walletAddress,
			walletPrivateKey,
			amountToExchange
		);
	}
	return result;
}