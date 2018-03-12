import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function HomeTripsTable(props) {
    
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
            {props.trips.map(trip => {
                return (
                    <div key={trip.id} style={trip.id === props.currentTripId ? { backgroundColor: '#e1e1e1' } : {}} className="row reservation-box">
                        <div className="col-md-12">
                            <div className="col-md-1">
                                <div className="reservation-image-box">
                                    <span className="session-nav-user-thumb"><img src={`http://roomsxml.com${JSON.parse(trip.hotel_photo).original}`} alt="host-profile" /></span>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="bold">{trip.hotel_name}</div>
                                <div>{trip.hostEmail}</div>
                                <div>{trip.hostPhone}</div>
                                {trip.hostEmail ? <div><span className="send-message-icon"></span><a href={`mailto:${trip.hostEmail}`}>Send Message</a></div> : ''}
                            </div>
                            <div className="col-md-2">
                                <div><Link to={`/hotels/listings/${trip.hotel_id}`}><u>{trip.hotel_name}</u></Link></div>
                            </div>
                            <div className="col-md-3">
                                <div>{moment(new Date(trip.arrival_date)).format('DD MMM, YYYY')}<i aria-hidden="true" className="fa fa-long-arrow-right"></i>{moment(new Date(trip.arrival_date)).add(trip.nights, 'days').format('DD MMM, YYYY')}</div>
                            </div>
                            <div className="col-md-2" >
                                {trip.accepted ? 
                                    <div  style={{ display: 'none' }} >Reservation is accepted and can&#39;t be undone</div> : 
                                    <div  style={{ display: 'none' }} ><button type="submit" onClick={e => { e.preventDefault(); props.onTripSelect(trip.id); props.onTripCancel(); }}>Cancel Trip</button></div>}
                            </div>
                            <div className="col-md-2">
                                <div className="reservation-status bold">{capitalize(trip.status.toLowerCase())}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

HomeTripsTable.propTypes = {
    currentTripId: PropTypes.number,
    trips: PropTypes.array
};