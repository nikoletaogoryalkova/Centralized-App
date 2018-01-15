import * as types from '../actions/actionTypes';

export default function reservationReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_RESERVATIONS_SUCCESS:
            return action.reservations;

        default:
            return state;
    }
}