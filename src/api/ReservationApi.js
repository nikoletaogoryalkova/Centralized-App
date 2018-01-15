import {sendRequest, host, RequestMethod} from '../requester';


class ReservationApi {
    static getAllReservations() {
        let size = 20;
        return sendRequest(`${host}users/me/reservations?sort=id,desc&size=${size}`, RequestMethod.GET).then(res => {
            return res.response.json();
        });
    }
  }
  
  export default ReservationApi;