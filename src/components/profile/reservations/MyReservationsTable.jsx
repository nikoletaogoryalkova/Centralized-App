import React from 'react';

export default class MyReservationsTable extends React.Component {

    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead>
                        <tr> 
                            <th></th>
                            <th>Guests</th>
                            <th>Dates &amp; Location</th>
                            <th>Price</th>
                            <th>Actions</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.reservations.map(reservation => {
                                return <tr>
                                    <td></td>
                                    <td>
                                        <div>{reservation.guestName}</div>
                                        <div>{reservation.guestPhone}</div>
                                        <div><span>-icon-</span>Send Message</div>
                                    </td>
                                    <td>
                                        <div>{reservation.startDate}->{reservation.endDate}</div>
                                        <div>{reservation.listingName}</div>
                                    </td>
                                    <td>
                                        <div>{reservation.currencyCode} {reservation.price} total</div>
                                    </td>
                                    <td>
                                        <div>Change or Cancel</div>
                                        <div>Report a problem</div>
                                        <div>Print Confirmation</div>
                                    </td>
                                    <td>
                                        <div>{reservation.accepted ? "Accepted" : "Pending"}</div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}