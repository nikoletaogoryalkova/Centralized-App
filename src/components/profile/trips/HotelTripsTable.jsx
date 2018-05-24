import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Config } from '../../../config.js';
import NoEntriesMessage from '../common/NoEntriesMessage';

import moment from 'moment';

function HotelTripsTable(props) {

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderTrips = () => {
    if (!props.trips) {
      return;
    }

    if (props.trips.length === 0) {
      return (
        <NoEntriesMessage text="There are no upcoming trips. If you book any property, it will appear here." />
      );
    }

    return (
      props.trips.map((trip, i) => {
        return (
          <div key={i} style={trip.id === props.currentTripId ? { backgroundColor: '#e1e1e1' } : {}} className="row reservation-box">
            <div className="col-md-12">
              <div className="col-md-1">
                <div className="reservation-image-box">
                  {trip.hotel_photo &&
                    <span className="session-nav-user-thumb">
                      <img src={`${Config.getValue('imgHost')}${JSON.parse(trip.hotel_photo).original}`} alt="host-profile" />
                    </span>
                  }
                </div>
              </div>
              <div className="col-md-2">
                <div className="bold">{trip.hotel_name}</div>
                <div>{trip.hostEmail}</div>
                <div>{trip.hostPhone}</div>
                {trip.hostEmail ? <div><span className="send-message-icon"></span><a href={`mailto:${trip.hostEmail}`}>Send Message</a></div> : ''}
              </div>
              <div className="col-md-2">
                <div><Link to={`/hotels/listings/${trip.hotel_id}?currency=GBP&startDate=${moment(tomorrow).format('DD/MM/YYYY')}&endDate=${moment(afterTomorrow).format('DD/MM/YYYY')}&rooms=%5B%7B"adults":2,"children":%5B%5D%7D%5D`}><u>{trip.hotel_name}</u></Link></div>
              </div>
              <div className="col-md-3">
                <div>{moment(new Date(trip.arrival_date)).format('DD MMM, YYYY')}<i aria-hidden="true" className="fa fa-long-arrow-right"></i>{moment(new Date(trip.arrival_date)).add(trip.nights, 'days').format('DD MMM, YYYY')}</div>
              </div>
              <div className="col-md-2" >
                {/* {trip.accepted ? */}
                {/* <div style={{ display: 'none' }} >Reservation is accepted and can&#39;t be undone</div> : */}
                {trip.status && trip.status.toUpperCase() === 'DONE' &&
                  <div><button type="submit" onClick={e => { e.preventDefault(); props.onTripSelect(trip.id); props.handleCancelReservation(); }}>Cancel Trip</button></div>
                }
                {/* } */}
              </div>
              <div className="col-md-2">
                <div className="reservation-status bold">{capitalize(trip.status != null && trip.status.length > 0 ? trip.status : 'PENDING')}</div>
                {trip.status && trip.status.toUpperCase() === 'DONE' &&
                  <span>Reference No.: {trip.booking_id}</span>
                }
              </div>
            </div>
          </div>
        );
      })
    );
  };

  let tomorrow = new Date();
  tomorrow.setHours(24);
  let afterTomorrow = new Date();
  afterTomorrow.setHours(48);

  return (
    <div>
      <div className="table-header bold">
        <div className="col-md-1">
        </div>
        <div className="col-md-2">
          <span>Host</span>
        </div>
        <div className="col-md-2">
          <span>Property</span>
        </div>
        <div className="col-md-3">
          <span>Dates</span>
        </div>
        <div className="col-md-2">
          <span>Actions</span>
        </div>
        <div className="col-md-2">
          <span>Status</span>
        </div>
      </div>
      {renderTrips()}
    </div>
  );
}

HotelTripsTable.propTypes = {
  currentTripId: PropTypes.number,
  trips: PropTypes.array
};

export default HotelTripsTable;