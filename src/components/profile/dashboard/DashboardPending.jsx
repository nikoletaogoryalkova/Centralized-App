import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { Config } from '../../../config';
import NoEntriesMessage from '../common/NoEntriesMessage';

export default function DashboardPending(props) {

  const renderReservations = () => {
    if (!props.reservations) {
      return;
    }

    if (props.reservations.length === 0) {
      return (
        <NoEntriesMessage text="There are no reservation requests. If someone requests to book your property, it will appear here." />
      );
    }

    return (
      props.reservations.map(reservation => {
        return (
          <ul key={reservation.id} className="profile-pending-list profile-pending-item">
            <li>
              <span className="session-nav-user-thumb"><img src={`${Config.getValue('imgHost')}${reservation.userImage}`} alt="user-profile" /></span>
            </li>
            <li>
              <span className="cnt block">
                <span className="block bold">{reservation.guestName}</span>
                <span className="where block">{reservation.listingName}</span>
              </span>
            </li>
            <li>
              <span className="cnt block">{moment(new Date(reservation.startDate)).format('DD MMM, YYYY')}<i aria-hidden="true" className="fa fa-long-arrow-right"></i>{moment(new Date(reservation.endDate)).format('DD MMM, YYYY')}</span>
            </li>
            <li>
              <span className="cnt block">{parseInt((new Date(reservation.endDate) - new Date(reservation.startDate)) / (1000 * 60 * 60 * 24), 10)} nights &bull; {reservation.guests} guests</span>
            </li>
            <li>
              <span className="cnt block">
                <span className="bold">{reservation.accepted ? 'Accepted' : 'Pending'}</span>
                <span> - </span>
                <span>{reservation.currencyCode} {reservation.price}</span>
              </span>
            </li>
          </ul>
        );
      })
    );
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
      props.trips.map(trip => {
        return (
          <ul key={trip.id} className="profile-pending-list profile-pending-item">
            <li>
              <span className="session-nav-user-thumb"><img src={`${Config.getValue('imgHost')}${trip.userImage}`} alt="user-profile" /></span>
            </li>
            <li>
              <span className="cnt block">
                <span className="block bold">{trip.hostName}</span>
                <span className="where block">{trip.listingName}</span>
              </span>
            </li>
            <li>
              <span className="cnt block">{moment(new Date(trip.startDate)).format('DD MMM, YYYY')}<i aria-hidden="true" className="fa fa-long-arrow-right"></i>{moment(new Date(trip.endDate)).format('DD MMM, YYYY')}</span>
            </li>
            <li>
              <span className="cnt block">
                <span className="bold">{trip.accepted ? 'Accepted' : 'Pending'}</span>
                <span> - </span>
                <span>{trip.currencyCode} {trip.price}</span>
              </span>
            </li>
          </ul>
        );
      })
    );
  };

  return (
    <section id="profile-dashboard-pending">
      <div className="container">
        <h2>Latest Reservation Requests</h2>
        <hr className="profile-line" />
        <ul className="profile-pending-list profile-pending-header bold">
          <li><span>&nbsp;</span></li>
          <li><span>Booker</span></li>
          <li><span>Trip Dates</span></li>
          <li><span>Nights</span></li>
          <li><span>Status</span></li>
          <li><span>Price</span></li>
        </ul>

        {renderReservations()}

      </div>

      <div className="container">
        <h2>Latest Trips</h2>
        <hr className="profile-line" />
        <ul className="profile-pending-list profile-pending-header bold">
          <li><span>&nbsp;</span></li>
          <li><span>Host</span></li>
          <li><span>Trip Dates</span></li>
          <li><span>Status - Price</span></li>
          <li><span></span></li>
        </ul>

        {renderTrips()}

      </div>
    </section>
  );
}

DashboardPending.propTypes = {
  reservations: PropTypes.array,
  trips: PropTypes.array
};