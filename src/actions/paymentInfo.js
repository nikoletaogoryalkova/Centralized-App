import { paymentInfo } from '../actions/actionTypes';

export function setCurrency(currency) {
    return {
        type: paymentInfo.SET_CURRENCY,
        currency
    };
}