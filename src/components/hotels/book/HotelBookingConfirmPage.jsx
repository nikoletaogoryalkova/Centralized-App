import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import CredentialsModal from './modals/CredentialsModal';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { TokenTransactions } from '../../../services/blockchain/tokenTransactions.js';

import { testBook, getLocRateInUserSelectedCurrency, getCurrentlyLoggedUserJsonFile, confirmBooking, getCurrencyRates } from '../../../requester';

class HotelBookingConfirmPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            showRoomCanxDetails: [],
            loading: true,
            locRate: null,
            showCredentialsModal: false,
            walletPassword: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleCanxDetails = this.toggleCanxDetails.bind(this);
    }

    componentDidMount() {
        const search = this.props.location.search;
        const searchParams = this.getSearchParams(search);
        const booking = JSON.parse(decodeURI(searchParams.get('booking')));
        testBook(booking).then((json) => {
            this.setState({ data: json });
            console.log(json);

            getLocRateInUserSelectedCurrency(json.currency).then((data) => {
                this.setState({ locRate: data[0]['price_' + json.currency.toLowerCase()] });
            });

            getCurrencyRates().then((json) => {
                this.setState({ rates: json });
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

    handleSubmit(password) {
        const preparedBookingId = this.state.data.preparedBookingId;
        const recipient = '0xa032235b81ceb313f57877acee273ea5ae8e776b';
        const amount = this.state.data.locPrice * Math.pow(10, 18);
        // const amount = 1 * Math.pow(10, 18);
        NotificationManager.info('We are processing your transaction through the ethereum network. It might freeze your screen for several seconds...', 'Transactions');
        getCurrentlyLoggedUserJsonFile().then((json) => {
            setTimeout(() => {
                TokenTransactions.sendTokens(json.jsonFile, password, recipient, amount).then((transactionHash) => {
                    const bookingConfirmObj = {
                        bookingId: preparedBookingId,
                        transactionHash: transactionHash.transactionHash
                    };
                    
                    console.log(bookingConfirmObj);
                    confirmBooking(bookingConfirmObj).then(() => {
                        NotificationManager.success('You will receive a confirmation message');
                        setTimeout(() => {
                            this.props.history.push('/profile/messages');
                        }, 2000);
                    });
                }).catch(error => {
                    if (error.hasOwnProperty('message')) {
                        NotificationManager.warning(error.message, 'Send Tokens');
                    } else if (error.hasOwnProperty('err') && error.err.hasOwnProperty('message')) {
                        NotificationManager.warning(error.err.message, 'Send Tokens');
                    } else if (typeof x === 'string') {
                        NotificationManager.warning(error, 'Send Tokens');
                    } else {
                        NotificationManager.warning(error);
                    }

                    this.closeModal('showCredentialsModal');
                });
            }, 1000);
        });
    }

    openModal(modal, e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            [modal]: true,
        }, () => {console.log(this.state)});
    }

    closeModal(modal, e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            [modal]: false
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleCanxDetails(index) {
        const showRoomCanxDetails = this.state.showRoomCanxDetails.slice(0);
        showRoomCanxDetails[index] = !showRoomCanxDetails[index];
        this.setState({ showRoomCanxDetails: showRoomCanxDetails });
    }

    getRoomRows(booking) {
        const currency = this.state.data.currency;
        const rows = [];
        if (booking) {
            booking.forEach((booking, index) => {
                rows.push(
                    <tr key={index} className="booking-room">
                        <td>{booking.room.roomType.text}</td>
                        <td><span className="booking-price">{this.state.data.currency} {this.state.rates && (booking.room.totalSellingPrice.amt * this.state.rates['USD'][this.props.paymentInfo.currency]).toFixed(2)} ({(booking.room.totalSellingPrice.locPrice).toFixed(4)} LOC)</span></td>
                        <td><button onClick={() => this.toggleCanxDetails(index)}>{this.state.showRoomCanxDetails[index] ? 'Hide' : 'Show'}</button></td>
                    </tr>
                );

                const fees = booking.room.canxFees;
                if (fees.length === 0) {
                    rows.push(
                        <tr className={`booking-room-canx-fee ${this.state.showRoomCanxDetails[index] ? '' : 'room-cancellation-hidden'}`}>
                            <td>No cancellation fees</td>
                            <td>No fee</td>
                            <td></td>
                        </tr>
                    );
                } else if (fees.length === 1) {
                    rows.push(
                        <tr className={`booking-room-canx-fee ${this.state.showRoomCanxDetails[index] ? '' : 'room-cancellation-hidden'}`}>
                            <td>Cancellation fee</td>
                            <td><span className="booking-price">{currency} {this.state.rates && (fees[0].amount.amt * this.state.rates['USD'][this.props.paymentInfo.currency]).toFixed(2)} ({(fees[0].locPrice).toFixed(4)} LOC)</span></td>
                            <td></td>
                        </tr>
                    );
                } else {
                    fees.forEach((fee, feeIndex) => {
                        rows.push(
                            <tr className={`booking-room-canx-fee ${this.state.showRoomCanxDetails[index] ? '' : 'room-cancellation-hidden'}`}>
                                <td key={feeIndex}>{`Cancel up to ${moment(fee.from).format('DD MM YYYY')}`}</td>
                                <td><span className="booking-price">{currency} {this.state.rates && (fee.amount.amt * this.state.rates['USD'][this.props.paymentInfo.currency]).toFixed(2)} ({(fee.locPrice).toFixed(4)} LOC)</span></td>
                                <td></td>
                            </tr>
                        );
                    });

                    rows.push(
                        <tr className={`booking-room-canx-fee ${this.state.showRoomCanxDetails[index] ? '' : 'room-cancellation-hidden'}`}>
                            <td key={fees.length}>{`Cancel on or after ${moment(this.getLastDate(fees).from).format('DD MM YYYY')}`}</td>
                            <td><span className="booking-price">{this.state.rates && (fees[0].amount.amt * this.state.rates['USD'][this.props.paymentInfo.currency]).toFixed(2)} ({(fees[0].locPrice).toFixed(4)} LOC)</span></td>
                            <td></td>
                        </tr>
                    );
                }
            });
        }

        return rows;
    }

    getLastDate(fees) {
        return fees.sort((x, y) => x.from < y.from ? 1 : -1)[0];
    }

    render() {
        const booking = this.state.data && this.state.data.booking.hotelBooking;
        const currency = this.state.data && this.state.data.currency;
        const fiatPrice = this.state.data && this.state.data.fiatPrice;
        const locPrice = this.state.data && this.state.data.locPrice;

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

                    {!this.state.data ?
                        <div className="loader"></div> :
                        <div id="room-book-confirm">
                            <div className="container">
                                <div className="booking-details">
                                    <h2>Confirm and Pay</h2>
                                    <hr />
                                    <div className="row text-center">
                                        {moment(booking[0].arrivalDate, 'YYYY-MM-DD').format('DD MMM, YYYY')} <i className="fa fa-long-arrow-right"></i> {moment(booking[0].arrivalDate, 'YYYY-MM-DD').add(booking[0].nights, 'days').format('DD MMM, YYYY')}
                                    </div>
                                    <div className="row">
                                        <table>
                                            <thead>
                                                <th>Room Type</th>
                                                <th>Price</th>
                                                <th>Cancellation Fees</th>
                                            </thead>
                                            <tbody>
                                                {this.getRoomRows(booking)}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <hr/>
                                    <div className="row order-name">
                                        <p>Name: <span className="booking-for">{this.props.userInfo.firstName} {this.props.userInfo.lastName}</span></p>    
                                    </div>
                                    <div className="row order-total">
                                        <p>Order Total: <span className="booking-price">{currency} {this.state.rates && (fiatPrice* this.state.rates['USD'][this.props.paymentInfo.currency]).toFixed(2)} ({(locPrice).toFixed(4)} LOC)</span></p>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-book" onClick={() => this.openModal('showCredentialsModal')}>Confirm and Pay</button>
                            </div>
                            <CredentialsModal modalId={'showCredentialsModal'} handleSubmit={this.handleSubmit} closeModal={this.closeModal} isActive={this.state.showCredentialsModal} />
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