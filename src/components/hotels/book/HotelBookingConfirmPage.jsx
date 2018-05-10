import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import CredentialsModal from './modals/CredentialsModal';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ROOMS_XML_CURRENCY } from '../../../constants/currencies.js';
import { ENTER_WALLET_PASSWORD } from '../../../constants/modals.js';
import { openModal, closeModal } from '../../../actions/modalsInfo.js';
import { PROCESSING_TRANSACTION } from '../../../constants/infoMessages.js';

import { TokenTransactions } from '../../../services/blockchain/tokenTransactions.js';

import { testBook, getLocRateInUserSelectedCurrency, getCurrentlyLoggedUserJsonFile, confirmBooking, getCurrencyRates } from '../../../requester';

import { HotelReservation } from '../../../services/blockchain/hotelReservation';

class HotelBookingConfirmPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      showRoomCanxDetails: [],
      loading: true,
      locRate: null,
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
    console.log(booking);
    testBook(booking).then((res) => {
      if (res.ok) {
        res.json().then((json) => {
          this.setState({ data: json, booking: booking });

          getLocRateInUserSelectedCurrency(json.currency).then((data) => {
            this.setState({ locRate: data[0]['price_' + json.currency.toLowerCase()] });
          });

          getCurrencyRates().then((json) => {
            this.setState({ rates: json });
          });
        });
      } else {
        res.then((res) => {
          const errors = res.errors;
          for (let key in errors) {
            if (typeof errors[key] !== 'function') {
              NotificationManager.warning(errors[key].message);
            }
          }
        });
      }
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

  getNumberOfTravelers() {
    const rooms = this.state.booking.rooms;
    let numberOfTravelers = 0;
    for (let i = 0; i < rooms.length; i++) {
      numberOfTravelers += rooms[i].adults.length;
      numberOfTravelers += rooms[i].children.length;
    }

    return numberOfTravelers;
  }

  handleSubmit(token) {
    const password = this.state.walletPassword;
    const preparedBookingId = this.state.data.preparedBookingId;
    // const recipient = '0xa99c523BfC2E1374ac528FE39e4dD7c35F6C1d46';
    const recipient = '0xbba5666645ce005aec830d935043cc6d6b27b060';
    const amount = (this.state.data.locPrice * Math.pow(10, 18)).toString().replace(/[.,]/g, '');
    console.log(amount, typeof(amount));
    // const amount = this.state.data.locPrice;
    const booking = this.state.data.booking.hotelBooking;
    const startDate = moment(booking[0].arrivalDate, 'YYYY-MM-DD');
    const endDate = moment(booking[0].arrivalDate, 'YYYY-MM-DD').add(booking[0].nights, 'days');
    const daysBeforeStartOfRefund = ['1'];
    const refundPercentages = ['100'];
    const hotelId = this.props.match.params.id;
    const roomId = this.state.booking.quoteId;
    const numberOfTravelers = this.getNumberOfTravelers();

    NotificationManager.info(PROCESSING_TRANSACTION, 'Transactions');

    getCurrentlyLoggedUserJsonFile().then((json) => {
      console.log(json);
      setTimeout(() => {
        HotelReservation.createReservation(
          json.jsonFile, 
          password,
          preparedBookingId.toString(),
          amount.toString(),
          startDate.valueOf().toString(),
          endDate.valueOf().toString(),
          daysBeforeStartOfRefund,
          refundPercentages,
          hotelId,
          roomId,
          numberOfTravelers.toString()
        ).then(transaction => {
          console.log(transaction)
          const bookingConfirmObj = {
            bookingId: preparedBookingId,
            transactionHash: transaction.hash
          };

          console.log(bookingConfirmObj);
          confirmBooking(bookingConfirmObj).then(() => {
            NotificationManager.success('You will receive a confirmation message');
            setTimeout(() => {
              this.props.history.push('/profile/trips/hotels');
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

          this.closeModal(ENTER_WALLET_PASSWORD);
        });
      }, 1000);
    });

    //     TokenTransactions.sendTokens(json.jsonFile, password, recipient, amount.toString()).then((transactionHash) => {
    //       const bookingConfirmObj = {
    //         bookingId: preparedBookingId,
    //         transactionHash: transactionHash.transactionHash
    //       };

    //       console.log(bookingConfirmObj);
    //       confirmBooking(bookingConfirmObj).then(() => {
    //         NotificationManager.success('You will receive a confirmation message');
    //         setTimeout(() => {
    //           this.props.history.push('/profile/trips/hotels');
    //         }, 2000);
    //       });
    //     }).catch(error => {
    //       if (error.hasOwnProperty('message')) {
    //         NotificationManager.warning(error.message, 'Send Tokens');
    //       } else if (error.hasOwnProperty('err') && error.err.hasOwnProperty('message')) {
    //         NotificationManager.warning(error.err.message, 'Send Tokens');
    //       } else if (typeof x === 'string') {
    //         NotificationManager.warning(error, 'Send Tokens');
    //       } else {
    //         NotificationManager.warning(error);
    //       }

    //       this.closeModal(ENTER_WALLET_PASSWORD);
    //     });
    //   }, 1000);
    // });
  }

  openModal(modal, e) {
    if (e) {
      e.preventDefault();
    }

    this.props.dispatch(openModal(modal));
  }

  closeModal(modal, e) {
    if (e) {
      e.preventDefault();
    }

    this.props.dispatch(closeModal(modal));
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
    const rows = [];
    if (booking) {
      booking.forEach((booking, index) => {
        rows.push(
          <tr key={index} className="booking-room">
            <td>{booking.room.roomType.text}</td>
            <td><span className="booking-price">{this.props.paymentInfo.currency} {this.state.rates && (booking.room.totalSellingPrice.amt * this.state.rates[ROOMS_XML_CURRENCY][this.props.paymentInfo.currency]).toFixed(2)} ({(booking.room.totalSellingPrice.locPrice).toFixed(4)} LOC)</span></td>
            <td><button onClick={() => this.toggleCanxDetails(index)}>{this.state.showRoomCanxDetails[index] ? 'Hide' : 'Show'}</button></td>
          </tr>
        );

        const fees = booking.room.canxFees;
        if (fees.length === 0) {
          rows.push(
            <tr key={(1 + index) * 1000} className={`booking-room-canx-fee ${this.state.showRoomCanxDetails[index] ? '' : 'room-cancellation-hidden'}`}>
              <td>No cancellation fees</td>
              <td>No fee</td>
              <td></td>
            </tr>
          );
        } else if (fees.length === 1) {
          rows.push(
            <tr key={(1 + index) * 1000} className={`booking-room-canx-fee ${this.state.showRoomCanxDetails[index] ? '' : 'room-cancellation-hidden'}`}>
              <td>Cancellation fee</td>
              <td><span className="booking-price">{this.props.paymentInfo.currency} {this.state.rates && (fees[0].amount.amt * this.state.rates[ROOMS_XML_CURRENCY][this.props.paymentInfo.currency]).toFixed(2)} ({(fees[0].locPrice).toFixed(4)} LOC)</span></td>
              <td></td>
            </tr>
          );
        } else {
          fees.forEach((fee, feeIndex) => {
            rows.push(
              <tr key={feeIndex} className={`booking-room-canx-fee ${this.state.showRoomCanxDetails[index] ? '' : 'room-cancellation-hidden'}`}>
                <td>{`Cancel up to ${moment(fee.from).format('DD MM YYYY')}`}</td>
                <td><span className="booking-price">{this.props.paymentInfo.currency} {this.state.rates && (fee.amount.amt * this.state.rates[ROOMS_XML_CURRENCY][this.props.paymentInfo.currency]).toFixed(2)} ({(fee.locPrice).toFixed(4)} LOC)</span></td>
                <td></td>
              </tr>
            );
          });

          rows.push(
            <tr key={(1 + index) * 1000} className={`booking-room-canx-fee ${this.state.showRoomCanxDetails[index] ? '' : 'room-cancellation-hidden'}`}>
              <td key={fees.length}>{`Cancel on or after ${moment(this.getLastDate(fees).from).format('DD MM YYYY')}`}</td>
              <td><span className="booking-price">{this.props.paymentInfo.currency} {this.state.rates && (fees[0].amount.amt * this.state.rates[ROOMS_XML_CURRENCY][this.props.paymentInfo.currency]).toFixed(2)} ({(fees[0].locPrice).toFixed(4)} LOC)</span></td>
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
    const fiatPrice = this.state.data && this.state.data.fiatPrice;
    const locPrice = this.state.data && this.state.data.locPrice;

    return (
      <div>
        <div>
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
                        <tr>
                          <th>Room Type</th>
                          <th>Price</th>
                          <th>Cancellation Fees</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.getRoomRows(booking)}
                      </tbody>
                    </table>
                  </div>

                  <hr />
                  <div className="row order-name">
                    <p>Name: <span className="booking-for">{this.props.userInfo.firstName} {this.props.userInfo.lastName}</span></p>
                  </div>
                  <div className="row order-total">
                    <p>Order Total: <span className="booking-price">{this.props.paymentInfo.currency} {this.state.rates && (fiatPrice * this.state.rates[ROOMS_XML_CURRENCY][this.props.paymentInfo.currency]).toFixed(2)} ({(locPrice).toFixed(4)} LOC)</span></p>
                  </div>
                </div>
                <button className="btn btn-primary btn-book" onClick={() => this.openModal(ENTER_WALLET_PASSWORD)}>Confirm and Pay</button>
                <button className="btn btn-primary btn-book" onClick={() => this.handleSubmit()}>Check</button>
              </div>
              <CredentialsModal isActive={this.props.modalsInfo.modals.get(ENTER_WALLET_PASSWORD)} handleSubmit={this.handleSubmit} closeModal={this.closeModal} walletPassword={this.state.walletPassword} onChange={this.onChange} />
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
  paymentInfo: PropTypes.object,
  modalsInfo: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(HotelBookingConfirmPage));

function mapStateToProps(state) {
  const { userInfo, paymentInfo, modalsInfo } = state;
  return {
    userInfo,
    paymentInfo,
    modalsInfo,
  };
}
