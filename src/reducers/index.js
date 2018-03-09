import { combineReducers } from 'redux';
import userInfo from './userInfo';
import paymentInfo from './paymentInfo';
import modalsInfo from './modalsInfo';

const rootReducer = combineReducers({
    userInfo,
    paymentInfo,
    modalsInfo
});

export default rootReducer;