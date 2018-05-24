import { userInfo } from '../actions/actionTypes';

const initialState = {
  isLogged: false,
  showLogin: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case userInfo.SET_IS_LOGGED:
      return {
        ...state,
        isLogged: action.isLogged,
        firstName: action.isLogged ? state.firstName : undefined,
        lastName: action.isLogged ? state.lastName : undefined,
        phoneNumber: action.isLogged ? state.phoneNumber : undefined,
        email: action.isLogged ? state.email : undefined,
        locAddress: action.isLogged ? state.locAddress : undefined,
        locBalance: action.isLogged ? state.locBalance : undefined,
        ethBalance: action.isLogged ? state.ethBalance : undefined,
      };
    case userInfo.SET_USER_INFO:
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        phoneNumber: action.phoneNumber,
        email: action.email,
        locAddress: action.locAddress,
        locBalance: action.locBalance,
        ethBalance: action.ethBalance,
      };
    default:
      return state;
  }
}