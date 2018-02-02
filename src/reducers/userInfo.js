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

        default:
            return state;
    }
}