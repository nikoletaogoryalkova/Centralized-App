import {withRouter} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import PasswordModal from '../../common/modals/PasswordModal';
import {Config} from '../../../config';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {ROOMS_XML_CURRENCY} from '../../../constants/currencies.js';
import {PASSWORD_PROMPT} from '../../../constants/modals.js';
import {openModal, closeModal} from '../../../actions/modalsInfo.js';
import {PROCESSING_TRANSACTION} from '../../../constants/infoMessages.js';
import ReCAPTCHA from 'react-google-recaptcha';

import {
  testBook,
  getLocRateInUserSelectedCurrency,
  getCurrentlyLoggedUserJsonFile,
  confirmBooking,
  getCurrencyRates,
  getCancellationFees
} from '../../../requester';

import {HotelReservation} from '../../../services/blockchain/hotelReservation';

class HotelBookingConfirmPage extends React.Component {
  constructor(props) {
    super(props);

    this.captcha = null;

    this.state = {
      data: null,
      showRoomCanxDetails: [],
      loading: true,
      locRate: null,
      password: ''
    };

    this.timeout = null;

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleCanxDetails = this.toggleCanxDetails.bind(this);
    // this.getCancellationFees = this.getCancellationFees.bind(this);
  }

  componentDidMount() {
    const search = this.props.location.search;
    const searchParams = this.getSearchParams(search);
    const booking = JSON.parse(decodeURI(searchParams.get('booking')));
    console.log(booking);
    testBook(booking).then((res) => {
      if (res.ok) {
        res.json().then((json) => {
          console.log(json);
          this.setState({data: json, booking: booking});

          getLocRateInUserSelectedCurrency(json.currency).then((data) => {
            this.setState({locRate: data[0]['price_' + json.currency.toLowerCase()]});
          });

          getCurrencyRates().then((json) => {
            this.setState({rates: json});
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

    this.timeout = setTimeout(() => {
      NotificationManager.info('Your search has expired.', '', 600000);
      this.props.history.push('/hotels');
    }, 600000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
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

 // getCancellationFees() {

    // const totalPrice = this.state.data.locPrice;
    // const hotelBooking = this.state.data.booking.hotelBooking;
    // const feeTable = []; // jagged array for storing all rooms fees
    // const cancellationFees = {};
    // let maxDaysBefore = 0;
    //
    // for (let i = 0; i < hotelBooking.length; i++) {
    //   const earliestToLatestRoomCancellationFees = hotelBooking[i].room.canxFees.sort((x, y) => {
    //     return x.from >= y.from ? 1 : -1; // sort ascending by 'from date'
    //   });
    //
    //   const arrivalDate = moment(hotelBooking[i].arrivalDate, 'YYYY-MM-DD');
    //   // console.log(arrivalDate.format())
    //   const earliestDate = moment(earliestToLatestRoomCancellationFees[0].from);
    //   // console.log(earliestDate.format())
    //
    //   const roomMaxDaysBefore = Math.abs(moment(arrivalDate).diff(earliestDate, 'days'));
    //   if (roomMaxDaysBefore > maxDaysBefore) {
    //     maxDaysBefore = roomMaxDaysBefore;
    //   }
    //   // console.log(roomMaxDaysBefore)
    //
    //   const roomFeesByDaysBefore = Array(roomMaxDaysBefore + 1).fill(0);
    //   // console.log(roomFeesByDaysBefore)
    //
    //   // roomCancellationFees.forEach(x => {
    //   //   console.log(moment(x.from).format())
    //   // });
    //
    //   for (let j = 0; j < earliestToLatestRoomCancellationFees.length; j++) {
    //     const cancellation = earliestToLatestRoomCancellationFees[j];
    //     const fromDate = moment(cancellation.from);
    //     const daysBefore = moment(arrivalDate).diff(fromDate, 'days');
    //     // console.log(daysBefore)
    //
    //     const locPrice = cancellation.locPrice;
    //
    //     roomFeesByDaysBefore.fill(locPrice, 0, daysBefore + 1);
    //   }
    //
    //   feeTable.push(roomFeesByDaysBefore);
    // }
    //
    // // console.log(feeTable);
    //
    // for (let i = 0; i < maxDaysBefore + 1; i++) {
    //   let fee = 0;
    //   for (let j = 0; j < feeTable.length; j++) {
    //     if (feeTable[j][i]) {
    //       fee += feeTable[j][i];
    //     }
    //   }
    //
    //   // console.log('fee: ', fee);
    //   // console.log('total price: ', totalPrice)
    //
    //   const percentageRefund = (parseInt(Math.abs((totalPrice - fee) / totalPrice) * 100)).toString();
    //   // console.log('percentage refund: ', percentageRefund)
    //   cancellationFees[i] = percentageRefund;
    // }
    //
    // // console.log(feeTable)
    // // console.log(cancellationFees)

 // }

  tokensToWei(tokens) {
    let index = tokens.indexOf('.');
    let trailingZeroes = 0;
    let wei = '';
    if (index === -1) {
      trailingZeroes = 18;
    } else {
      trailingZeroes = 18 - (tokens.length - 1 - index);
    }

    wei = tokens.replace(/[.,]/g, '');
    if (trailingZeroes >= 0) {
      wei = wei + '0'.repeat(trailingZeroes);
    } else {
      wei = wei.substring(0, index + 18);
    }

    return wei;
  }

  handleSubmit(token) {
    getCancellationFees(this.state.data.preparedBookingId).then((json) => {
      const password = this.state.password;
      const preparedBookingId = this.state.data.preparedBookingId;
      // console.log(preparedBookingId);
      const wei = (this.tokensToWei(this.state.data.locPrice.toString()));
      // console.log(wei);
      const booking = this.state.data.booking.hotelBooking;
      const startDate = moment(booking[0].arrivalDate, 'YYYY-MM-DD');
      const endDate = moment(booking[0].arrivalDate, 'YYYY-MM-DD').add(booking[0].nights, 'days');
      // const daysBeforeStartOfRefund = ['0'];
      // const refundPercentages = ['100'];
      const hotelId = this.props.match.params.id;
      const roomId = this.state.booking.quoteId;
      const numberOfTravelers = this.getNumberOfTravelers();
      console.log(json);
      const cancellationFees = json;
      console.log(cancellationFees);
      const daysBeforeStartOfRefund = [];
      const refundPercentages = [];
      for (let key in cancellationFees) {
        daysBeforeStartOfRefund.unshift(key.toString());
        refundPercentages.unshift(cancellationFees[key].toString());
      }

      console.log(daysBeforeStartOfRefund)
      console.log(refundPercentages)

      NotificationManager.info(PROCESSING_TRANSACTION, 'Transactions', 20000);
      this.closeModal(PASSWORD_PROMPT);

      getCurrentlyLoggedUserJsonFile().then((json) => {
        // console.log(json);
        setTimeout(() => {
          HotelReservation.createReservation(
            json.jsonFile,
            password,
            preparedBookingId.toString(),
            wei,
            startDate.unix().toString(),
            endDate.unix().toString(),
            daysBeforeStartOfRefund,
            refundPercentages,
            hotelId,
            roomId,
            numberOfTravelers.toString()
          ).then(transaction => {
            const bookingConfirmObj = {
              bookingId: preparedBookingId,
              transactionHash: transaction.hash
            };

            console.log(bookingConfirmObj);
            confirmBooking(bookingConfirmObj).then(() => {
              NotificationManager.success('LOC Payment has been initiated. We will send you a confirmation message once it has been processed by the Blockchain.');
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

            this.closeModal(PASSWORD_PROMPT);
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
      //         NotificationManager.success('LOC Payment has been initiated. We will send you a confirmation message once it has been processed by the Blockchain.');
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

    });
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
    this.setState({[e.target.name]: e.target.value});
  }

  toggleCanxDetails(index) {
    const showRoomCanxDetails = this.state.showRoomCanxDetails.slice(0);
    showRoomCanxDetails[index] = !showRoomCanxDetails[index];
    this.setState({showRoomCanxDetails: showRoomCanxDetails});
  }

  getRoomRows(booking) {
    const rows = [];
    if (booking) {
      booking.forEach((booking, index) => {
        rows.push(
          <tr key={(1 + index) * 1000} className="booking-room">
            <td>{booking.room.roomType.text}</td>
            <td><span
              className="booking-price">{this.props.paymentInfo.currency} {this.state.rates && (booking.room.totalSellingPrice.amt * this.state.rates[ROOMS_XML_CURRENCY][this.props.paymentInfo.currency]).toFixed(2)} ({(booking.room.totalSellingPrice.locPrice).toFixed(4)} LOC)</span>
            </td>
            <td>
              <button
                onClick={() => this.toggleCanxDetails(index)}>{this.state.showRoomCanxDetails[index] ? 'Hide' : 'Show'}</button>
            </td>
          </tr>
        );

        const fees = booking.room.canxFees;
        if (fees.length === 0) {
          rows.push(
            <tr key={(2 + index) * 1000}
                className={`booking-room-canx-fee ${this.state.showRoomCanxDetails[index] ? '' : 'room-cancellation-hidden'}`}>
              <td>No cancellation fees</td>
              <td>No fee</td>
              <td></td>
            </tr>
          );
        } else if (fees.length === 1) {
          rows.push(
            <tr key={(3 + index) * 1000}
                className={`booking-room-canx-fee ${this.state.showRoomCanxDetails[index] ? '' : 'room-cancellation-hidden'}`}>
              <td>Cancellation fee</td>
              <td><span
                className="booking-price">{this.props.paymentInfo.currency} {this.state.rates && (fees[0].amount.amt * this.state.rates[ROOMS_XML_CURRENCY][this.props.paymentInfo.currency]).toFixed(2)} ({(fees[0].locPrice).toFixed(4)} LOC)</span>
              </td>
              <td></td>
            </tr>
          );
        } else {
          fees.forEach((fee, feeIndex) => {
            rows.push(
              <tr key={(3 + index) * 1000 + feeIndex + 1}
                  className={`booking-room-canx-fee ${this.state.showRoomCanxDetails[index] ? '' : 'room-cancellation-hidden'}`}>
                <td>{`Cancel up to ${moment(fee.from).format('DD MM YYYY')}`}</td>
                <td><span
                  className="booking-price">{this.props.paymentInfo.currency} {this.state.rates && (fee.amount.amt * this.state.rates[ROOMS_XML_CURRENCY][this.props.paymentInfo.currency]).toFixed(2)} ({(fee.locPrice).toFixed(4)} LOC)</span>
                </td>
                <td></td>
              </tr>
            );
          });

          rows.push(
            <tr key={(4 + index) * 1000}
                className={`booking-room-canx-fee ${this.state.showRoomCanxDetails[index] ? '' : 'room-cancellation-hidden'}`}>
              <td
                key={fees.length}>{`Cancel on or after ${moment(this.getLastDate(fees).from).format('DD MM YYYY')}`}</td>
              <td><span
                className="booking-price">{this.props.paymentInfo.currency} {this.state.rates && (fees[0].amount.amt * this.state.rates[ROOMS_XML_CURRENCY][this.props.paymentInfo.currency]).toFixed(2)} ({(fees[0].locPrice).toFixed(4)} LOC)</span>
              </td>
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
                  <hr/>
                  <div className="row text-center">
                    {moment(booking[0].arrivalDate, 'YYYY-MM-DD').format('DD MMM, YYYY')} <i
                    className="fa fa-long-arrow-right"></i> {moment(booking[0].arrivalDate, 'YYYY-MM-DD').add(booking[0].nights, 'days').format('DD MMM, YYYY')}
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

                  <hr/>
                  <div className="row order-name">
                    <p>Name: <span
                      className="booking-for">{this.props.userInfo.firstName} {this.props.userInfo.lastName}</span></p>
                  </div>
                  <div className="row order-total">
                    <p>Order Total: <span
                      className="booking-price">{this.props.paymentInfo.currency} {this.state.rates && (fiatPrice * this.state.rates[ROOMS_XML_CURRENCY][this.props.paymentInfo.currency]).toFixed(2)} ({(locPrice).toFixed(4)} LOC)</span>
                    </p>
                  </div>
                </div>
                <button className="btn btn-primary btn-book" onClick={(e) => this.openModal(PASSWORD_PROMPT, e)}>Confirm
                  and Pay
                </button>
                {/* <button className="btn btn-primary btn-book" onClick={() => this.getCancellationFees()}>Log Fees</button> */}
              </div>
              <PasswordModal
                isActive={this.props.modalsInfo.modals.get(PASSWORD_PROMPT)}
                text={'Enter your wallet password'}
                placeholder={'Wallet password'}
                handleSubmit={() => this.captcha.execute()}
                closeModal={this.closeModal}
                password={this.state.password}
                onChange={this.onChange}
              />

              <ReCAPTCHA
                ref={el => this.captcha = el}
                size="invisible"
                sitekey={Config.getValue('recaptchaKey')}
                onChange={(token) => {
                  this.handleSubmit(token);
                  this.captcha.reset();
                }}
              />
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
  const {userInfo, paymentInfo, modalsInfo} = state;
  return {
    userInfo,
    paymentInfo,
    modalsInfo,
  };
}
