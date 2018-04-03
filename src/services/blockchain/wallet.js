/* eslint-disable linebreak-style */

import bip39 from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';
import ethers from 'ethers';
import {
    validateAddress,
    validatePassword
} from './validators/base-validators';
import {
    LOCTokenContract,
    getNodeProvider
} from './config/contracts-config.js';
import {
    Config
} from './../../config';

const {
    HD_WALLET_PATH
} = require('./config/constants.json');
const ERROR = require('./config/errors.json');

class Wallet {

    static async getTokenBalance(address) {
        let balance = await LOCTokenContract.balanceOf(address);
        return balance;
    }

    static async getBalance(address) {
        const nodeProvider = getNodeProvider();
        let balance = await nodeProvider.getBalance(address);
        return balance;
    }

    static async createFromPassword(password) {
        validatePassword(password);

        const mnemonic = bip39.generateMnemonic();
        const hdWallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
        const localWallet = hdWallet.derivePath(HD_WALLET_PATH).getWallet();

        let result = {};

        result.address = localWallet.getAddressString();
        result.mnemonic = mnemonic;
        result.fileName = localWallet.getV3Filename();
        result.jsonFile = localWallet.toV3(password);

        return result;
    }

    static recoverFromMnemonic(mnemonic, password, address) {
        validatePassword(password);
        validateAddress(address, ERROR.INVALID_RECOVERED_ADDRESS);
        this.validateMnemonic(mnemonic);

        const hdWallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
        const wallet = hdWallet.derivePath(HD_WALLET_PATH).getWallet();

        let result = {};
        result.address = wallet.getAddressString();

        if (result.address !== address) {
            throw ERROR.INVALID_RECOVERED_ADDRESS;
        }

        result.mnemonic = mnemonic;
        result.fileName = wallet.getV3Filename();
        result.jsonFile = wallet.toV3(password);

        return result;
    }

    static validateMnemonic(mnemonic) {
        if (!bip39.validateMnemonic(mnemonic)) {
            throw ERROR.INVALID_MNEMONIC;
        }

        return true;
    }
}

export {
    Wallet
};