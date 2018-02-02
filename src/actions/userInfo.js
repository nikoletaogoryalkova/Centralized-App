import { userInfo } from './actionTypes';

export function setIsLogged(isLogged) {
    return {
        type: userInfo.SET_IS_LOGGED,
        isLogged
    };
}