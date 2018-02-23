/* eslint-disable linebreak-style */

import bip39 from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';

import { NotificationManager } from 'react-notifications';
const { HD_WALLET_PATH } = require('./config/constants.json');
const { INVALID_PASSWORD } = require('./utils/errors.json');


class Wallet {
    static async createFromPassword(password) {
        if (password === '') {
            NotificationManager.error(INVALID_PASSWORD);
            throw new Error(INVALID_PASSWORD);
        }

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
}

export { Wallet };