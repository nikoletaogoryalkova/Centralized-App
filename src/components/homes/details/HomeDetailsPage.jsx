import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import {
  contactHost,
  getCalendarByListingIdAndDateRange,
  getUserInfo,
  getPropertyById
} from '../../../requester';

import { Config } from '../../../config';
import Lightbox from 'react-images';
import PropTypes from 'prop-types';
import HomeDetailsInfoSection from './HomeDetailsInfoSection';
import React from 'react';
import HomesSearchBar from '../search/HomesSearchBar';
import { connect } from 'react-redux';
import moment from 'moment';
import { parse } from 'query-string';

class HomeDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    let countryId = '';
    let guests = '';
    let startDate = moment();
    let endDate = moment().add(1, 'day');

    if (this.props) {
      let queryParams = parse(this.props.location.search);
      if (queryParams.guests) {
        guests = queryParams.guests;
      }
      if (queryParams.startDate && queryParams.endDate) {
        startDate = moment(queryParams.startDate, 'DD/MM/YYYY');
        endDate = moment(queryParams.endDate, 'DD/MM/YYYY');
      }
      if (queryParams.countryId) {
        countryId = queryParams.countryId;
      }
    }

    let nights = this.calculateNights(startDate, endDate);

    this.state = {
      countryId: countryId,
      searchStartDate: startDate,
      searchEndDate: endDate,
      calendarStartDate: startDate,
      calendarEndDate: endDate,
      nigths: nights,
      guests: guests,
      data: null,
      lightboxIsOpen: false,
      currentImage: 0,
      prices: null,
      oldCurrency: this.props.paymentInfo.currency,
      loaded: false,
      userInfo: null,
      loading: true,
      isShownContactHostModal: false
    };

    this.handleApply = this.handleApply.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDatePick = this.handleDatePick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.initializeCalendar = this.initializeCalendar.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendMessageToHost = this.sendMessageToHost.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true });
    this.getUserInfo();
  }

  componentDidMount() {
    this.initializeCalendar();

    const { searchStartDate, searchEndDate } = this.state;
    if (searchStartDate && searchEndDate) {
      this.calculateNights(searchStartDate, searchEndDate);
    }

    this.getUserInfo();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.updateParamsMap) {
      this.updateParamsMap(e.target.name, e.target.value);
    }
  }

  handleSearch(e) {
    e.preventDefault();

    let queryString = '?';

    queryString += 'countryId=' + this.state.countryId;
    queryString += '&startDate=' + this.state.searchStartDate.format('DD/MM/YYYY');
    queryString += '&endDate=' + this.state.searchEndDate.format('DD/MM/YYYY');
    queryString += '&guests=' + this.state.guests;

    this.props.history.push('/homes/listings' + queryString);
  }

  getUserInfo() {
    if (localStorage.getItem(Config.getValue('domainPrefix') + '.auth.locktrip')) {
      getUserInfo()
        .then(res => {
          this.setState({
            loaded: true,
            userInfo: res,
            loading: false
          });
        });
    }
    else {
      this.setState({ loaded: true, loading: false });
    }
  }

  handleApply(event, picker) {
    const { startDate, endDate } = picker;
    const today = moment();
    const prices = this.state.prices;
    const range = prices.filter(x => x.start >= startDate && x.end < endDate);
    console.log(startDate, today);
    const isInvalidRange = range.filter(x => !x.available).length > 0;
    if (isInvalidRange) {
      NotificationManager.warning('There is a unavailable day in your select range', 'Calendar Operations');
      this.setState({ calendarStartDate: undefined, calendarEndDate: undefined });
    }
    else {
      this.setState({
        calendarStartDate: startDate,
        calendarEndDate: endDate,
      });

      this.calculateNights(startDate, endDate);
    }
  }

  handleDatePick(event, picker) {
    this.setState({
      searchStartDate: picker.startDate,
      searchEndDate: picker.endDate,
    });
  }

  openLightbox(event) {
    event.preventDefault();
    this.setState({
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  gotoImage(index) {
    this.setState({
      currentImage: index,
    });
  }

  handleClickImage() {
    if (this.state.currentImage === this.state.data.pictures.length - 1) return;
    this.gotoNext();
  }

  calculateNights(startDate, endDate) {
    let checkIn = moment(startDate, 'DD/MM/YYYY');
    let checkOut = moment(endDate, 'DD/MM/YYYY');

    let diffDays = checkOut.diff(checkIn, 'days');

    if (checkOut > checkIn) {
      this.setState({ nights: diffDays });
    }
    else {
      this.setState({ nights: 0 });
    }
  }

  sendMessageToHost(id, message, captchaToken) {
    this.setState({ loading: true });
    let contactHostObj = {
      message: message
    };

    contactHost(id, contactHostObj, captchaToken)
      .then(res => {
        this.props.history.push(`/profile/messages/chat/${res.conversation}`);
      });
  }

  initializeCalendar() {
    let now = new Date();
    let end = new Date();
    const DAY_INTERVAL = 90;
    end.setUTCHours(now.getUTCHours() + 24 * DAY_INTERVAL);

    getPropertyById(this.props.match.params.id).then((data) => {

      this.setState({ data: data });

      getCalendarByListingIdAndDateRange(this.props.match.params.id, now, end, this.props.paymentInfo.currency, 0, DAY_INTERVAL).then(res => {
        let prices = [];
        for (let dateInfo of res.content) {
          let price = dateInfo.available ? `${this.props.paymentInfo.currencySign}${Math.round(dateInfo.price)}` : '';
          prices.push(
            {
              'title': <span className="calendar-price bold">{price}</span>,
              'start': moment(dateInfo.date, 'DD/MM/YYYY'),
              'end': moment(dateInfo.date, 'DD/MM/YYYY'),
              'allDay': true,
              'price': dateInfo.price,
              'available': dateInfo.available
            }
          );
        }

        this.setState({ prices: prices, calendar: res.content, oldCurrency: this.props.paymentInfo.currency });
      });
    });
  }

  openModal() {
    this.setState({ isShownContactHostModal: true });
  }

  closeModal() {
    this.setState({ isShownContactHostModal: false });
  }

  render() {
    let loading, allEvents, images;
    if (this.state.data === null ||
      this.state.prices === null ||
      this.state.reservations === null ||
      this.state.loaded === false) {
      loading = true;
    } else {
      allEvents = this.state.prices;
      images = null;
      if (this.state.data.pictures !== undefined) {
        images = this.state.data.pictures.map(x => {
          return { src: Config.getValue('imgHost') + x.original };
        });
      }

      if (this.state.oldCurrency !== this.props.paymentInfo.currency) {
        this.initializeCalendar();
      }
    }

    return (
      <div>
        <div>
          {/* <ListingTypeNav /> */}
          <div className="container">
            <HomesSearchBar
              countryId={this.state.countryId}
              countries={this.props.countries}
              startDate={this.state.searchStartDate}
              endDate={this.state.searchEndDate}
              guests={this.state.guests}
              onChange={this.onChange}
              handleSearch={this.handleSearch}
              handleDatePick={this.handleDatePick} />
          </div>
        </div>

        {loading ?
          <div className="loader"></div> :
          <div>
            <section className="hotel-gallery">
              <div className="hotel-gallery-bgr" style={(this.state.data.pictures !== undefined && this.state.data.pictures.length > 0) ? { 'backgroundImage': 'url("' + Config.getValue('imgHost') + this.state.data.pictures[0].original + '")' } : { backgroundColor: '#AAA' }}>
                <div className="container">
                  <a onClick={(e => this.openLightbox(e))} className="btn btn-primary btn-gallery">Open Gallery</a>
                  {images !== null && <Lightbox
                    currentImage={this.state.currentImage}
                    images={images}
                    isOpen={this.state.lightboxIsOpen}
                    onClickImage={this.handleClickImage}
                    onClickNext={this.gotoNext}
                    onClickPrev={this.gotoPrevious}
                    onClickThumbnail={this.gotoImage}
                    onClose={this.closeLightbox}
                  />}
                </div>
              </div>
            </section>
            <nav id="hotel-nav">
              <div className="container">
                <ul className="nav navbar-nav">
                  <li>
                    <a href="#overview">Overview</a>
                  </li>
                  <li>
                    <a href="#facilities">Facilities</a>
                  </li>
                  {this.state.data.descriptionsAccessInfo &&
                    <li>
                      <a href="#reviews">Access Info</a>
                    </li>
                  }
                  {this.state.data.reviews && this.state.data.reviews.lenght > 0 &&
                    <li>
                      <a href="#reviews">Reviews</a>
                    </li>
                  }
                  <li>
                    <a href="#map">Location</a>
                  </li>
                </ul>
              </div>
            </nav>

            <HomeDetailsInfoSection
              allEvents={allEvents}
              calendar={this.state.calendar}
              nights={this.state.nights}
              onApply={this.handleApply}
              startDate={this.state.calendarStartDate}
              endDate={this.state.calendarEndDate}
              data={this.state.data}
              prices={this.state.prices}
              isLogged={this.props.userInfo.isLogged}
              loading={this.state.loading}
              openModal={this.openModal}
              closeModal={this.closeModal}
              isShownContactHostModal={this.state.isShownContactHostModal}
              sendMessageToHost={this.sendMessageToHost} />
          </div>
        }
      </div>
    );
  }
}

HomeDetailsPage.propTypes = {
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

export default withRouter(connect(mapStateToProps)(HomeDetailsPage));

function mapStateToProps(state) {
  const { userInfo, paymentInfo } = state;
  return {
    userInfo,
    paymentInfo
  };
}