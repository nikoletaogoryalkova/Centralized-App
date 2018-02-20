import
EthereumTx
from 'ethereumjs-tx';
import {
	web3
} from '../config/contracts-config.js';
import {
	isTxDataValid,
} from '../validators/base-validators.js'

export async function signTransaction(
	toAddress,
	fromPublicKey,
	fromPrivateKey,
	gasLimit,
	funcData,
	value = 0) {
	const privateKeyBuff = new Buffer(fromPrivateKey, 'hex');

	const nonceNumber = await web3.eth.getTransactionCount(fromPublicKey);
	let gasPrice = await web3.eth.getGasPrice();
	const rawTx = {
		'nonce': nonceNumber,
		'gasPrice': web3.utils.toHex(gasPrice),
		'gasLimit': gasLimit,
		'from': fromPublicKey,
		'to': toAddress,
		'value': web3.utils.toHex(value),
		'data': funcData,
	};

	isTxDataValid(rawTx);

	let tx = new EthereumTx(rawTx);
	tx.sign(privateKeyBuff);
	let serializedTx = tx.serialize();

	return "0x" + serializedTx.toString('hex');
};