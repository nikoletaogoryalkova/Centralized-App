import {
	LOCExchangeContract
} from '../config/contracts-config.js';
import ethers from 'ethers';
import {
	Config
} from '../../../config';

const providers = ethers.providers;
const localNodeProvider = new providers.JsonRpcProvider(Config.getValue('WEB3_HTTP_PROVIDER'), providers.networks.unspecified);
const ERROR = require('./../config/errors.json');

export async function validateContractBalance(amount) {

	const balance = await localNodeProvider.getBalance(LOCExchangeContract.address);
	if (amount.gt(balance)) {
		throw ERROR.INSUFFICIENT_AMOUNT_ETH_EXCHANGE_CONTRACT
	}
};