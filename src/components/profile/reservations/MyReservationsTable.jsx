import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment'
import {NotificationContainer} from 'react-notifications';

export default class MyReservationsTable extends React.Component {

    render() {
        return (
            <div className="container">
                <NotificationContainer />
                <div className="table-header bold">
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-2">
                        <span>Guests</span>
                    </div>
                    <div className="col-md-3">
                        <span>Dates &amp; Location</span>
                    </div>
                    <div className="col-md-2">
                        <span>Price</span>
                    </div>
                    <div className="col-md-2">
                        <span>Actions</span>
                    </div>
                    <div className="col-md-2">
                        <span>Status</span>
                    </div>
                </div>
                {this.props.reservations.map(reservation => {
                    return (
                        <div className="row reservation-box">
                            <div className="col-md-1">
                                <div className="reservation-image-box">
                                    <span className="session-nav-user-thumb"></span>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="bold">{reservation.guestName}</div>
                                <div>{reservation.guestPhone}</div>
                                <div><span className="send-message-icon"></span>Send Message</div>
                            </div>
                            <div className="col-md-3">
                                <div>{moment(new Date(reservation.startDate)).format("DD MMM, YYYY")}<i aria-hidden="true" className="fa fa-long-arrow-right"></i>{moment(new Date(reservation.endDate)).format("DD MMM, YYYY")}</div>
                                <div>{reservation.listingName}</div>
                            </div>
                            <div className="col-md-2">
                                <div>{reservation.currencyCode} {reservation.price} total</div>
                            </div>
                            <div className="col-md-2">
                                {reservation.accepted ? <div><Link to="#" onClick={() => this.props.onReservationCancel(reservation.id)}>Cancel</Link></div> : <div><Link to="#" onClick={() => this.props.onReservationAccept(reservation.id)}>Accept</Link></div>}
                                <div><Link to="#">Report a problem</Link></div>
                                <div><Link to="#">Print Confirmation</Link></div>
                            </div>
                            <div className="col-md-2">
                                <div className="reservation-status bold">{reservation.accepted ? "Accepted" : "Pending"}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}