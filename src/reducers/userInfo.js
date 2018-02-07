import { userInfo } from '../actions/actionTypes';

const initialState = {
    isLogged: false
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case userInfo.SET_IS_LOGGED:
            return {
                ...state,
                isLogged: action.isLogged
            };

        case userInfo.SET_FIRST_NAME:
            return {
                ...state,
                firstName: action.firstName
            };

        case userInfo.SET_LAST_NAME:
            return {
                ...state,
                lastName: action.lastName
            };
            
        case userInfo.SET_PHONE_NUMBER:
            return {
                ...state,
                phoneNumber: action.phoneNumber
            };

        default:
            return state;
    }
}