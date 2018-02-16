/* eslint-disable linebreak-style */
import _ from 'lodash';

import {
    NotificationManager
} from 'react-notifications';
const ERROR = require('./../utils/errors.json');

export function validateEtherAddress(address) {
    if (address === '0x0000000000000000000000000000000000000000') return false;
    else if (address.substring(0, 2) !== '0x') return false;
    else if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) return false;
    else if (/^(0x)?[0-9a-f]{40}$/.test(address) ||
        /^(0x)?[0-9A-F]{40}$/.test(address)) return true;
    else
        return true;
}

export function validatePassword(password) {
    if (password === '') {
        NotificationManager.error(ERROR.INVALID_PASSWORD);
        throw new Error(ERROR.INVALID_PASSWORD);
    }

    return true;
}

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

function validateEtherAddress(address) {
    if (address === '0x0000000000000000000000000000000000000000') return false;
    else if (address.substring(0, 2) !== '0x') return false;
    else if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) return false;
    else if (/^(0x)?[0-9a-f]{40}$/.test(address) ||
        /^(0x)?[0-9A-F]{40}$/.test(address)) return true;
    else
        return true;
}

export function validatePassword(password) {
    if (password === '') {
        NotificationManager.error(ERROR.INVALID_PASSWORD);
        throw new Error(ERROR.INVALID_PASSWORD);
    }

    return true;

}