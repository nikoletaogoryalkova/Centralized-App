import ethers from 'ethers';
import {
	validateAddress
} from './validators/base-validators';
import {
	validateLocBalance
} from './validators/token-validators';
import {
	LOCTokenContract,
	LOCTokenContractWithWallet,
	getNodeProvider
} from './config/contracts-config.js';
import {
	fundTransactionAmountIfNeeded
} from './utils/ethFuncs.js'
import {
	Config
} from '../../config';
const gasConfig = require('./config/gas-config.json');
const errors = require('./config/errors.json');

export class TokenTransactions {

	static async sendTokens(jsonObj, password, recipient, amount) {
		validateAddress(recipient, errors.INVALID_ADDRESS);

		let wallet = await ethers.Wallet.fromEncryptedWallet(jsonObj, password);

		let result = await fundTransactionAmountIfNeeded(
			wallet.address,
			wallet.privateKey,
			gasConfig.transferTokens
		);
		await validateLocBalance(wallet.address, amount, wallet, gasConfig.transferTokens);

		const LOCTokenContractWallet = LOCTokenContractWithWallet(wallet);
		var overrideOptions = {
			gasLimit: gasConfig.transferTokens,
			gasPrice: result.gasPrice
		};
		return await LOCTokenContractWallet.transfer(recipient, amount, overrideOptions);

	};

	static async getLOCBalance(address) {
		return await LOCTokenContract.balanceOf(address);
	}

	static async getETHBalance(address) {
		const nodeProvider = getNodeProvider();
		return await nodeProvider.getBalance(address);

	}
}