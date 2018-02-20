/* eslint-disable linebreak-style */
import _ from 'lodash';

import {
    NotificationManager
} from 'react-notifications';
import {
    web3
} from '../config/contracts-config.js';
import {
    LOCTokenContract,
    LOCExchangeContract
} from '../config/contracts-config.js'
import {
    BigNumber
} from 'bignumber.js';

const ERROR = require('./../utils/errors.json');
const gasConfig = require('./../config/gas-config.json');
const {
    TIMES_GAS_AMOUNT
} = require('../config/constants.json');


export function validateEtherAddress(address) {
    if (address === '0x0000000000000000000000000000000000000000') return false;
    else if (address.substring(0, 2) !== '0x') return false;
    else if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) return false;
    else if (/^(0x)?[0-9a-f]{40}$/.test(address) ||
        /^(0x)?[0-9A-F]{40}$/.test(address)) return true;
    else
        return true;
}

export async function gasToLoc(gasAmount) {
    const gasCost = await web3.eth.getGasPrice() * gasAmount;
    return await LOCExchangeContract.methods.weiToLocWei(gasCost).call();
};

export function validateHexString(str) {
    if (str === '') return true;
    let strLoc = str.substring(0, 2) === '0x' ?
        str.substring(2).toUpperCase() :
        str.toUpperCase();
    let re = /^[0-9A-F]+$/g;
    return re.test(strLoc);
};

export async function validateLocBalance(account, locAmount, actionGas = 0) {
    const totalGas = new BigNumber(gasConfig.approve + actionGas);
    const totalGasLoc = new BigNumber(await gasToLoc(totalGas));
    const locAmountToValidate = (totalGasLoc
            .times(TIMES_GAS_AMOUNT))
        .plus(locAmount);
    let balance = await LOCTokenContract.methods.balanceOf(account).call();
    if (locAmountToValidate.gt(balance)) {
        throw ERROR.INSUFFICIENT_AMOUNT_LOC;
    }
};

export function isTxDataValid(txData) {
    if (txData.to !== '0xCONTRACT' && !validateEtherAddress(txData.to)) {
        throw ERROR.INVALID_ADDRESS;
    }
    if (parseFloat(txData.gasLimit) <= 0) {
        throw ERROR.INVALID_GAS_LIMIT;
    }
    if (!validateHexString(txData.data)) {
        throw ERROR.INVALID_DATA;
    }
};



export function validateJsonObj(jsonObj) {
    if (_.isEmpty(jsonObj)) {
        NotificationManager.error(ERROR.INVALID_JSON);
        throw new Error(ERROR.INVALID_JSON);
    }

    return true;
}

export function validateAddress(address, error) {
    if (!validateEtherAddress(address)) {
        NotificationManager.error(error);
        throw new Error(error);
    }

    return true;
}

export function validatePassword(password) {
    if (password === '') {
        NotificationManager.error(ERROR.INVALID_PASSWORD);
        throw new Error(ERROR.INVALID_PASSWORD);
    }

    return true;

}