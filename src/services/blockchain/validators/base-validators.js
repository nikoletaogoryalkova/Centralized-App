/* eslint-disable linebreak-style */
import _ from 'lodash';

import {
    validateEtherAddress
} from './ether-validators.js';

const ERROR = require('./../config/errors.json');

export function validateJsonObj(jsonObj) {
    if (_.isEmpty(jsonObj)) {
        throw new Error(ERROR.INVALID_JSON);
    }

    return true;
}

export function validateAddress(address, error) {
    if (!validateEtherAddress(address)) {
        throw new Error(error);
    }

    return true;
}

export function validatePassword(password) {
    if (password === '') {
        throw new Error(ERROR.INVALID_PASSWORD);
    }

    return true;

}