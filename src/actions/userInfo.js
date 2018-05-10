import { userInfo } from './actionTypes';

export function setIsLogged(isLogged) {
  return {
    type: userInfo.SET_IS_LOGGED,
    isLogged
  };
}

export function setUserInfo(firstName, lastName, phoneNumber, email, locAddress, ethBalance, locBalance) {
  return {
    type: userInfo.SET_USER_INFO,
    firstName,
    lastName,
    phoneNumber,
    email,
    locAddress,
    ethBalance,
    locBalance
  };
}