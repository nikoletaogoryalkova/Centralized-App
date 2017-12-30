import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment'

export default class MyTripsTable extends React.Component {

    render() {
        return (
            <div className="container">
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
                {this.props.trips.map(trip => {
                    return (
                        <div className="row reservation-box">
                            <div className="col-md-1">
                                <div className="reservation-image-box">
                                    <span className="session-nav-user-thumb"></span>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="bold">{trip.hostName}</div>
                                <div>{trip.hostPhone}</div>
                                <div><span className="send-message-icon"></span>Send Message</div>
                            </div>
                            <div className="col-md-2">
                                <div>{trip.listingName}</div>
                            </div>
                            <div className="col-md-3">
                            <div>{moment(new Date(trip.startDate)).format("DD MMM, YYYY")}<i aria-hidden="true" className="fa fa-long-arrow-right"></i>{moment(new Date(trip.endDate)).format("DD MMM, YYYY")}</div>
                            </div>
                            <div className="col-md-2">
                                <div>Coming soon</div>
                                {/* <div><Link to="#">Change or Cancel</Link></div>
                                <div><Link to="#">Report a problem</Link></div>
                                <div><Link to="#">Print Confirmation</Link></div> */}
                            </div>
                            <div className="col-md-2">
                                <div className="reservation-status bold">{trip.accepted ? "Accepted" : "Pending"}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}