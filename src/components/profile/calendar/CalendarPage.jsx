import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  editDefaultDailyPrice,
  getCalendarByListingIdAndDateRange,
  getMyReservations,
  getPropertyById,
  publishCalendarSlot
} from '../../../requester';

import Calendar from './Calendar';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      prices: null,
      reservations: null,
      defaultDailyPrice: '',
      // myListings: null,
      selectedDay: '',
      selectedDate: {},
      available: 'true',
      price: null,
      currencySign: '',
      currencyCode: '',
      calendarLoading: false,
      selectedListing: this.props.match.params.id
    };

    this.onCancel = this.onCancel.bind(this);
    this.onSelectSlot = this.onSelectSlot.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.onListingChange = this.onListingChange.bind(this);
    this.updateDailyPrice = this.updateDailyPrice.bind(this);
  }


  componentDidMount() {

    // getAllMyListings().then((data) => {
    //     this.setState({ myListings: data.content });
    // });

    getPropertyById(this.props.match.params.id).then((data) => {
      let currencyCode = data.currencyCode;
      let currencySign = '';

      switch (currencyCode) {
        case 'USD': currencySign = '$';
          break;
        case 'GBP': currencySign = '£';
          break;
        case 'EUR': currencySign = '€';
          break;
        default: currencySign = 'null';
      }

      this.setState({
        currencySign: currencySign,
        currencyCode: currencyCode,
        listing: data.content,
        defaultDailyPrice: data.defaultDailyPrice
      }, () => {
        this.updateCalendar();
      });
    });
  }

  updateCalendar() {
    let now = new Date();
    let end = new Date();
    const DAY_INTERVAL = 90;
    end.setUTCHours(now.getUTCHours() + 24 * DAY_INTERVAL);
    const { currencyCode, currencySign } = this.state;
    getCalendarByListingIdAndDateRange(this.props.match.params.id, now, end, currencyCode, 0, DAY_INTERVAL).then(res => {
      let prices = [];
      for (let dateInfo of res.content) {
        let availableStyle = dateInfo.available ? 1 : 0.5;
        let price = {
          'title': <span className="calendar-price bold" style={{ opacity: availableStyle }}>{currencySign}{Math.round(dateInfo.price)}</span>,
          'start': moment(dateInfo.date, 'DD/MM/YYYY'),
          'end': moment(dateInfo.date, 'DD/MM/YYYY'),
          'allDay': true,
          'price': Math.round(dateInfo.price),
          'available': dateInfo.available
        };
        prices.push(price);
      }

      this.setState({ prices: prices });
    });

    getMyReservations()
      .then(res => {
        let reservations = res.content.filter(r => r.listingId === this.props.match.params.id);
        let events = [];
        for (let reservation of reservations) {
          let event = {
            'title': <span className="calendar-reservation-event">{reservation.guestName}</span>,
            'start': new Date(reservation.startDate),
            'end': new Date(reservation.endDate),
            'isReservation': true,
            'price': reservation.price,
            'guests': reservation.guests
          };
          events.push(event);
        }

        this.setState({
          reservations: events
        });
      });
  }

  mergeEvents(prices, reservations) {
    let myArray = prices;
    for (let i = 0; i <= reservations.length - 1; i++) {
      let reservation = reservations[i];

      let reservationStartDate = new Date(reservation['start']);
      let reservationEndDate = new Date(reservation['end']);

      for (let d = reservationStartDate; d < reservationEndDate; d.setDate(d.getDate() + 1)) {
        for (let i = myArray.length - 1; i >= 0; i--) {
          if (new Date(myArray[i].start).getTime() === new Date(d).getTime()) {
            myArray.splice(i, 1);
          }
        }
      }
    }
  }

  onCancel() {
    this.setState({ selectedDay: null, date: null, price: null, available: 'true' });
  }

  onSelectSlot(e) {
    let date = e.start;
    let day = moment(e.start).format('DD');

    let selectedPriceEvent = this.state.prices.find(function (obj) { return new Date(obj.start).getTime() === new Date(date).getTime(); });
    if (selectedPriceEvent) {
      this.setState({ selectedDay: day, selectedDate: date, price: selectedPriceEvent.price, available: `${selectedPriceEvent.available}` });
    }
    else {
      this.setState({ selectedDay: day, selectedDate: date, price: null, available: 'true' });
    }
  }

  onSubmit(captchaToken) {
    let listingId = this.props.match.params.id;

    let slotInfo = {
      date: moment(this.state.selectedDate).format('YYYY-MM-DD'),
      price: this.state.price,
      available: this.state.available
    };
    publishCalendarSlot(listingId, slotInfo, captchaToken).then((res) => {
      if (res.success) {
        this.setState({ selectedDay: null, date: null, price: null, available: 'true' });
        this.componentDidMount();
      }
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // onListingChange(e) {
  //     this.setState({
  //         listing: null,
  //         prices: null,
  //         reservations: null,
  //         myListings: null,
  //         selectedDay: '',
  //         selectedDate: {},
  //         available: 'true',
  //         price: null,
  //         currencySign: '',
  //         selectedListing: e.target.value
  //     });
  //     this.props.history.push(`/profile/listings/calendar/${e.target.value}`);
  //     this.componentDidMount();
  // }

  updateDailyPrice(captchaToken) {
    this.setState({ calendarLoading: true });

    const listingId = this.props.match.params.id;
    const priceObj = {
      defaultDailyPrice: this.state.defaultDailyPrice
    };

    editDefaultDailyPrice(listingId, priceObj, captchaToken).then(res => {
      if (res.success) {
        this.updateCalendar();
        this.setState({ calendarLoading: false });
      } else {
        alert('failure');
      }
    });
  }

  render() {
    if (this.state.listing === null || this.state.prices === null || this.state.reservations === null) { //|| this.state.myListings === null
      return <div className="loader"></div>;
    }

    this.mergeEvents(this.state.prices, this.state.reservations);
    let allEvents = this.state.prices.concat(this.state.reservations);

    return (
      <div>
        <div className="col-md-12">
          <div className="container">
            <Calendar
              allEvents={allEvents}
              calendarLoading={this.state.calendarLoading}
              onCancel={this.onCancel}
              onSelectSlot={this.onSelectSlot}
              selectedDay={this.state.selectedDay}
              selectedDate={this.state.selectedDate}
              price={this.state.price}
              defaultDailyPrice={this.state.defaultDailyPrice}
              available={this.state.available}
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              updateDailyPrice={this.updateDailyPrice}
              currencySign={this.state.currencySign}
              // myListings={this.state.myListings}
              selectedListing={this.state.selectedListing} />
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(CalendarPage);

CalendarPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};