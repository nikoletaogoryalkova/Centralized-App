import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { testBook, getLocRateInUserSelectedCurrency } from '../../../requester';

class HotelBookingConfirmPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loading: true,
            locRate: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const search = this.props.location.search;
        const searchParams = this.getSearchParams(search);
        const booking = JSON.parse(decodeURI(searchParams.get('booking')));
        testBook(booking).then((json) => {
            this.setState({ data: json });

            getLocRateInUserSelectedCurrency(json.currency).then((data) => {
                this.setState({locRate: data[0]['price_' + json.currency.toLowerCase()]});
            });
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
        const currency = this.state.data && this.state.data.currency;
        
        let bookingTotalPrice = null;

        if (booking !== null && currency !== null) {
            for (let i = 0; i < booking.length; i++) {
                bookingTotalPrice += parseFloat(booking[i].totalSellingPrice.amt);
            }
        }

        return (
            <div>
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

                    {!this.state.data && !bookingTotalPrice ?
                        <div className="loader"></div> :
                        <div className="container">
                            <div>
                                <h2>Confirm and Pay</h2>
                                <hr />


                                <div id="room-book-confirm">
                                    <div className="col-md-12 text-center">
                                        <h4>Lockchain</h4>
                                    </div>
                                    <div className="col-md-12 text-center">
                                        {moment(booking[0].creationDate, 'YYYY-MM-DD').format('DD MMM, DDD')} <i className="fa fa-long-arrow-right"></i> {moment(booking[0].arrivalDate, 'YYYY-MM-DD').format('DD MMM, DDD')}
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <p>Name</p>
                                        </div>
                                        <div className="col-md-6 bold">
                                            {this.props.userInfo.firstName} {this.props.userInfo.lastName}
                                        </div>
                                    </div>
                                    <div className="col-md-12 order">
                                        <div className="col-md-6">
                                            <p>Order Total</p>
                                        </div>
                                        <div className="col-md-6 bold">
                                            {currency} {bookingTotalPrice} ({(this.state.locRate * bookingTotalPrice).toFixed(4)} LOC)
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-book" onClick={this.handleSubmit}>Confirm and pay</button>
                        </div>
                    }
                </div>
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