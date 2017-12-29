import React from 'react';
import moment from "moment";

export default class DashboardPending extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section id="profile-dashboard-pending">
                <div className="container">
                    <h2>Pending Requests ({this.props.totalReservations})</h2>
                    <hr className="profile-line"/>
                    <ul className="profile-pending-list profile-pending-header bold">
                        <li><span>&nbsp;</span></li>
                        <li><span>Booker</span></li>
                        <li><span>Trip Dates</span></li>
                        <li><span>Nights</span></li>
                        <li><span>Status</span></li>
                        <li><span>Price</span></li>
                    </ul>
                    {this.props.reservations.map(reservation => {
                        return (
                            <ul className="profile-pending-list profile-pending-item">
                                <li></li>
                                <li>
                            <span className="cnt block">
                                <span className="block bold">{reservation.guestName}</span>
                                <span className="where block">{reservation.listingName}</span>
                            </span>
                                </li>
                                <li>
                                        <span className="cnt block">{moment(new Date(reservation.startDate)).format("DD MMM, YYYY")}<i aria-hidden="true" className="fa fa-long-arrow-right"></i>{moment(new Date(reservation.endDate)).format("DD MMM, YYYY")}</span>
                                </li>
                                <li>
                                    <span className="cnt block">{parseInt((new Date(reservation.endDate) - new Date(reservation.startDate)) / (1000 * 60 * 60 * 24))} nights &bull; {reservation.guests} guests</span>
                                </li>
                                <li>
                            <span className="cnt block">
                                <span className="bold">Reservation Request</span>
                            <span> - </span>
                            <span>{reservation.currencyCode} {reservation.price}</span>
                            </span>
                                </li>
                                {/*<li>*/}
                                    {/*<span className="cnt block">17 oct</span>*/}
                                {/*</li>*/}
                            </ul>
                        )
                    })}

                </div>
            </section>
        )
    }
}