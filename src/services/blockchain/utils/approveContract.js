import {
	web3
} from '../config/contracts-config.js';
import {
	signTransaction
} from "./signTransaction";
import {
	LOCTokenContract
} from '../config/contracts-config.js';

const gasConfig = require('./../config/gas-config.json');

export async function approveContract(senderAddress,
	senderPrivateKey,
	amount,
	contractAddressToApprove) {
	const callOptions = {
		from: senderAddress
	};

	const approveMethod = LOCTokenContract.methods.approve(
		contractAddressToApprove,
		amount
	);

	const funcData = approveMethod.encodeABI(callOptions);

	const signedData = await signTransaction(
		LOCTokenContract._address,
		senderAddress,
		senderPrivateKey,
		gasConfig.approve,
		funcData,
	);

	return await web3.eth.sendSignedTransaction(signedData);
}