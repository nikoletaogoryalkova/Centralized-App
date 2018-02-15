/* eslint-disable linebreak-style */
import _ from 'lodash';
const ERROR = require('./../utils/errors.json');

exports.validateBody = (body) => {
    if (_.isEmpty(body)) {
        throw ERROR.EMPTY_REQ_BODY;
    }

    _.forEach(body, function(value, key) {
        if (value === undefined) {
            throw ERROR.INVALID_REQ_BODY + key;
        }
    });
};