import * as types from './actionTypes';
import reservationApi from '../api/ReservationApi';

export function loadReservationsSuccess(reservations) {
    return {
        type: types.LOAD_RESERVATIONS_SUCCESS,
        reservations
    }
}

export function loadReservations() {
    return function(dispatch) {
        return reservationApi.getAllReservations().then(reservations => {
            console.log(reservations.content);
          dispatch(loadReservationsSuccess(reservations.content));
        }).catch(error => {
            throw(error);
        });
    }
}