/* eslint-disable linebreak-style */
import _ from 'lodash';

import {
    NotificationManager
} from 'react-notifications';

import {
    validateEtherAddress
} from './ether-validators.js';

const ERROR = require('./../config/errors.json');

export function validateHexString(str) {
    if (str === '') return true;
    let strLoc = str.substring(0, 2) === '0x' ?
        str.substring(2).toUpperCase() :
        str.toUpperCase();
    let re = /^[0-9A-F]+$/g;
    return re.test(strLoc);
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