import { userInfo } from './actionTypes';

export function setIsLogged(isLogged) {
    return {
        type: userInfo.SET_IS_LOGGED,
        isLogged
    };
}

export function setFirstName(firstName) {
    return {
        type: userInfo.SET_FIRST_NAME,
        firstName
    };
}

export function setLastName(lastName) {
    return {
        type: userInfo.SET_LAST_NAME,
        lastName
    };
}

export function setPhoneNumber(phoneNumber) {
    return {
        type: userInfo.SET_PHONE_NUMBER,
        phoneNumber
    };
}