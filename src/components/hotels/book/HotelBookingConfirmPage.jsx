import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getTestHotelById, testBook } from '../../../requester';

class HotelBookingConfirmPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: null,
            loading: true,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const search = this.props.location.search;
        const searchParams = this.getSearchParams(search);
        const booking = JSON.parse(decodeURI(searchParams.get('booking')));
        testBook(booking).then((json) => {
            this.setState({ data: json });
        });
    }

    getSearchParams() {
        const map = new Map();
        const pairs = this.props.location.search.substr(1).split('&');
        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i].split('=');
            map.set(pair[0], pair[1]);
        }

        return map;
    }

    getTotalPrice(roomResults) {
        let total = 0;
        for (let i = 0; i < roomResults.length; i++) {
            total += roomResults[i].price;
        }

        return total;
    }

    getNights(searchParams) {
        const start = moment(searchParams.get('startDate'), 'DD/MM/YYYY');
        const end = moment(searchParams.get('endDate'), 'DD/MM/YYYY');
        return end.diff(start, 'days');
    }

    handleSubmit() {
        const quoteId = this.state.quoteId;
        const rooms = this.state.rooms;
        const currency = this.props.paymentInfo.currency;
        const booking = {
            quoteId: quoteId,
            rooms: rooms,
            currency: currency
        };

        const encodedBooking = encodeURI(JSON.stringify(booking));
        const id = this.props.match.params.id;
        const query = `?booking${encodedBooking}`;
        window.location.href = `/hotels/listings/book/confirm/${id}${query}`;
    }

    render() {
        const booking = this.state.data && this.state.data.booking.hotelBooking;
        console.log(booking)
        return (
            <div>
                {this.state.data && 
                    <div>
                        <div>
                            <NotificationContainer />
                        </div>
        
                        <div className="booking-steps">
                            <div className="container">
                                <p>1. Provide Guest Information</p>
                                <p>2. Review Room Details</p>
                                <p>3. Confirm and Pay</p>
                            </div>
                        </div>
                        
                        {!this.state.data ? 
                            <div className="loader"></div> :
                            <div>
                                <section id="room-book-confirm">
                                    <div className="container">
                                        <div>Name: {this.props.userInfo.firstName} {this.props.userInfo.lastName}</div>
                                        <div>Booking Date: {booking.creationDate}</div>
                                        <div>Arrival Date: {booking.creationDate}</div>
                                        <div>Nights: {booking.nights}</div>
                                        {/* {booking.room.messages.map((message, index) => {
                                            return (
                                                <div key={index}>{message.type}: {message.text}</div>
                                            );
                                        })} */}
                                        {/* <div>Total price: {booking.totalSellingPrice.amt}</div> */}
                                    </div>
                                </section>
                                <button className="btn btn-primary btn-book" onClick={this.handleSubmit}>Confirm</button>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

HotelBookingConfirmPage.propTypes = {
    countries: PropTypes.array,
    match: PropTypes.object,

    // start Router props
    history: PropTypes.object,
    location: PropTypes.object,

    // start Redux props
    dispatch: PropTypes.func,
    userInfo: PropTypes.object,
    paymentInfo: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(HotelBookingConfirmPage));

function mapStateToProps(state) {
    const { userInfo, paymentInfo } = state;
    return {
        userInfo,
        paymentInfo
    };
}