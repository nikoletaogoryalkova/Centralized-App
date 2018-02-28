/* eslint-disable linebreak-style */

import bip39 from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';

import { validateAddress, validatePassword } from './validators/base-validators';
import { NotificationManager } from 'react-notifications';

const { HD_WALLET_PATH } = require('./config/constants.json');
const errors = require('./config/errors.json');


class Wallet {

    static createFromPassword(password) {
        validatePassword(password);

        if (password === '') {
            NotificationManager.error(errors.INVALID_PASSWORD);
            throw new Error(errors.INVALID_PASSWORD);
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

    static recoverFromMnemonic(mnemonic, password, address) {
        validatePassword(password);
        validateAddress(address, errors.INVALID_RECOVERED_ADDRESS);
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

    static validateMnemonic(mnemonic) {
        if (!bip39.validateMnemonic(mnemonic)) {
            throw errors.INVALID_MNEMONIC;
        }

        return true;
    }
}

export { Wallet };