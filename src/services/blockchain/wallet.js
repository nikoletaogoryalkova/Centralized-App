/* eslint-disable linebreak-style */

import bip39 from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';

import { NotificationManager } from 'react-notifications';
import { validateEtherAddress, validatePassword } from './validators/base-validators';

const { HD_WALLET_PATH } = require('./config/constants.json');
const errors = require('./utils/errors.json');


class Wallet {
    static createFromPassword(password) {
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
        this.validateAddress(address);
        this.validateMnemonic(mnemonic);

        const hdWallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
        const wallet = hdWallet.derivePath(HD_WALLET_PATH).getWallet();

        let result = {};
        result.address = wallet.getAddressString();

        if (result.address !== address) {
            throw errors.INVALID_RECOVERED_ADDRESS;
        }

        result.mnemonic = mnemonic;
        result.fileName = wallet.getV3Filename();
        result.jsonFile = wallet.toV3(password);

        return result;
    }

    static validateAddress(address) {
        if (!validateEtherAddress(address)) {
            NotificationManager.error(errors.INVALID_RECOVERED_ADDRESS);
            throw new Error(errors.INVALID_RECOVERED_ADDRESS);
        }

        return true;
    }

    static validateMnemonic(mnemonic) {
        if (!bip39.validateMnemonic(mnemonic)) {
            throw errors.INVALID_MNEMONIC;
        }

        return true;
    }
}

export { Wallet };