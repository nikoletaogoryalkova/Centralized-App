import { paymentInfo } from '../actions/actionTypes';

const initialState = {
    currency: localStorage['currency'] ? localStorage['currency']: 'USD',
    currencySign: localStorage['currencySign'] ? localStorage['currencySign'] : '$',
    locRate: null
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
    case paymentInfo.SET_CURRENCY:
        localStorage['currency'] =  action.currency;
        localStorage['currencySign'] = getCurrencySign(action.currency);
        return {
            ...state,
            currency: action.currency,
            currencySign: getCurrencySign(action.currency)
        };

    case paymentInfo.SET_LOC_RATE:
        return {
            ...state,
            locRate: action.locRate
        };

    default:
        return state;
    }
}

function getCurrencySign(currency) {
    let currencySign = '$';
    if (currency === 'GBP') currencySign = '£';
    if (currency === 'EUR') currencySign = '€';
    return currencySign;
}