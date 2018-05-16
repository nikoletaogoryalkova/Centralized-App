import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoEntriesMessage from '../common/NoEntriesMessage';
import moment from 'moment';

export default function HomeTripsTable(props) {

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
                  <span className="session-nav-user-thumb"><img src={trip.userImage} alt="host-profile" /></span>
                </div>
              </div>
              <div className="col-md-2">
                <div className="bold">{trip.hostName}</div>
                <div>{trip.hostEmail}</div>
                <div>{trip.hostPhone}</div>
                {trip.hostEmail ? <div><span className="send-message-icon"></span><a href={`mailto:${trip.hostEmail}`}>Send Message</a></div> : ''}
              </div>
              <div className="col-md-2">
                <div><Link to={`/homes/listings/${trip.listingId}`}><u>{trip.listingName}</u></Link></div>
              </div>
              <div className="col-md-3">
                <div>{moment(new Date(trip.startDate)).format('DD MMM, YYYY')}<i aria-hidden="true" className="fa fa-long-arrow-right"></i>{moment(new Date(trip.endDate)).format('DD MMM, YYYY')}</div>
              </div>
              <div className="col-md-2">
                {trip.accepted ?
                  <div>Reservation is accepted and can&#39;t be undone</div> :
                  <div><button type="submit" onClick={e => { e.preventDefault(); props.onTripSelect(trip.id); props.onTripCancel(); }}>Cancel Trip</button></div>}
              </div>
              <div className="col-md-2">
                <div className="reservation-status bold">{trip.accepted ? 'Accepted' : 'Pending'}</div>
              </div>
            </div>
            <div className="reservation-box-pending col-md-12">
              {trip.hostLocAddress && !trip.accepted ?
                <div>
                  Please pay {trip.locPrice} LOC to <a href={`https://etherscan.io/address/${trip.hostLocAddress}`} target="_blank">{trip.hostLocAddress.substr(0, 7)}</a>
                  <CopyToClipboard text={trip.hostLocAddress}>
                    <button><i className="fa fa-link" aria-hidden="true" title="Copy LOC Address"></i></button>
                  </CopyToClipboard>
                  Click <a href="https://medium.com/@LockChainCo/how-to-create-a-personal-wallet-with-myetherwallet-com-and-buy-loc-with-eth-for-beginners-c395fd303d1" rel="noopener noreferrer" target="_blank">here</a> for more instructions.
                </div> : ''}
            </div>
          </div>
        );
      })
    );
  };

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

HomeTripsTable.propTypes = {
  currentTripId: PropTypes.number,
  trips: PropTypes.array
};