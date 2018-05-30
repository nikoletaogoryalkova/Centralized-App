import Breadcrumb from '../../Breadcrumb';
// import FilterPanel from './filter/FilterPanel';
import Pagination, { DEFAULT_PAGE_SIZE } from '../../common/pagination/Pagination';
import ResultsHolder from './ResultsHolder';
import HotelItem from './HotelItem';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import { ROOMS_XML_CURRENCY } from '../../../constants/currencies.js';

import MultiMarkerGoogleMap from './google-map/MultiMarkerGoogleMap';
import HotelsSearchBar from './HotelsSearchBar';
import FilterPanel from './filter/FilterPanel';
import ChildrenModal from '../modals/ChildrenModal';
import SockJsClient from 'react-stomp';
import uuid from 'uuid';


import { Config } from '../../../config.js';

import { getRegionNameById, getCurrencyRates, getLocRateInUserSelectedCurrency } from '../../../requester';

class HotelsSearchPage extends React.Component {
  constructor(props) {
    super(props);

    let startDate = moment().add(1, 'day');
    let endDate = moment().add(2, 'day');

    this.state = {
      allElements: false,
      startDate: startDate,
      endDate: endDate,
      adults: '2',
      children: '0',
      rooms: [{ adults: 1, children: [] }],
      priceRange: [0, 5000],
      orderBy: '',
      stars: [false, false, false, false, false],
      city: '',
      state: '',
      searchParams: null,
      listings: [],
      filteredListings: null,
      isFiltered: false,
      loading: true,
      currentPage: 0,
      showMap: false,
    };

    this.updateParamsMap = this.updateParamsMap.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleRoomsChange = this.handleRoomsChange.bind(this);
    this.handleAdultsChange = this.handleAdultsChange.bind(this);
    this.handleChildrenChange = this.handleChildrenChange.bind(this);
    this.handleChildAgeChange = this.handleChildAgeChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDatePick = this.handleDatePick.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);

    this.handleSelectRegion = this.handleSelectRegion.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getLocRate = this.getLocRate.bind(this);
    this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
    this.handleToggleChildren = this.handleToggleChildren.bind(this);
    this.getLocRate = this.getLocRate.bind(this);
    this.handleReceiveSingleHotel = this.handleReceiveSingleHotel.bind(this);
    this.sendInitialWebsocketRequest = this.sendInitialWebsocketRequest.bind(this);
    this.handlePriceRangeSelect = this.handlePriceRangeSelect.bind(this);
    this.handleOrderBy = this.handleOrderBy.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.handleToggleStar = this.handleToggleStar.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
    this.handleOpenSelect = this.handleOpenSelect.bind(this);
    this.handleCloseSelect = this.handleCloseSelect.bind(this);
  }

  componentDidMount() {
    this.getLocRate();
    getCurrencyRates().then((json) => {
      this.setState({ rates: json });
    });

    if (!localStorage.getItem('uuid')) {
      localStorage.setItem('uuid', `${uuid()}`);
    }
  }

  componentWillMount() {
    if (this.props.location.search) {
      const searchParams = this.getSearchParams(this.props.location.search);
      const rooms = JSON.parse(decodeURI(searchParams.get('rooms')));
      const adults = this.getAdults(rooms);
      const hasChildren = this.getHasChildren(rooms);
      const startDate = moment(searchParams.get('startDate'), 'DD/MM/YYYY');
      const endDate = moment(searchParams.get('endDate'), 'DD/MM/YYYY');
      const nights = this.calculateNights(startDate, endDate);
      const regionId = searchParams.get('region');
      const page = searchParams.get('page');
      this.setState({
        searchParams: searchParams,
        startDate: startDate,
        endDate: endDate,
        nights: nights,
        rooms: rooms,
        adults: adults,
        hasChildren: hasChildren,
        region: { id: regionId },
        currentPage: page ? Number(page) : 0,
      });

      this.geocoder = new window.google.maps.Geocoder();
      getRegionNameById(regionId).then((json) => {
        this.setState({ region: json });
        const address = json.query;

        this.geocoder.geocode({ 'address': address }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            this.setState({
              lat: results[0].geometry.location.lat(),
              lon: results[0].geometry.location.lng(),
            });
          }
        });
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      listings: null,
      filteredListings: null,
      loading: true,
      currentPage: 0,
    });

    if (this.clientRef) {
      this.clientRef.disconnect();
    }
  }

  getAdults(rooms) {
    let adults = 0;
    for (let i = 0; i < rooms.length; i++) {
      adults += Number(rooms[i].adults);
    }
    return adults;
  }

  getHasChildren(rooms) {
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].children.length !== 0) {
        return true;
      }
    }
    return false;
  }

  getLocRate() {
    getLocRateInUserSelectedCurrency(ROOMS_XML_CURRENCY).then((json) => {
      this.setState({ locRate: Number(json[0][`price_${ROOMS_XML_CURRENCY.toLowerCase()}`]) });
    });
  }

  calculateNights(startDate, endDate) {
    const checkIn = moment(startDate, 'DD/MM/YYYY');
    const checkOut = moment(endDate, 'DD/MM/YYYY');
    return (checkOut > checkIn) ? checkOut.diff(checkIn, 'days') : 0;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.updateParamsMap) {
      this.updateParamsMap(e.target.name, e.target.value);
    }
  }

  openModal(modal, e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({
      [modal]: true
    });
  }

  closeModal(modal, e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({
      [modal]: false
    });
  }

  handleToggleChildren() {
    const hasChildren = this.state.hasChildren;
    const rooms = this.state.rooms.slice(0);
    if (hasChildren) {
      for (let i = 0; i < rooms.length; i++) {
        rooms[i].children = [];
      }
    }

    this.setState({
      hasChildren: !hasChildren,
      rooms: rooms
    });
  }

  handleSearch(event) {
    if (event) {
      event.preventDefault();
    }

    const address = this.state.region.query;
    this.geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        this.setState({
          lat: results[0].geometry.location.lat(),
          lon: results[0].geometry.location.lng(),
        });
      }
    });

    this.distributeAdults().then(() => {
      if (this.state.hasChildren) {
        this.distributeChildren();
      } else {
        this.redirectToSearchPage(event);
      }
    });
  }

  redirectToSearchPage() {
    if (this.clientRef) {
      this.clientRef.disconnect();
    }

    let queryString = '?';
    queryString += 'region=' + this.state.region.id;
    queryString += '&currency=' + this.props.paymentInfo.currency;
    queryString += '&startDate=' + this.state.startDate.format('DD/MM/YYYY');
    queryString += '&endDate=' + this.state.endDate.format('DD/MM/YYYY');
    queryString += '&rooms=' + encodeURI(JSON.stringify(this.state.rooms));


    const nights = this.calculateNights(this.state.startDate, this.state.endDate);
    this.props.history.push('/hotels/listings' + queryString);

    // this.clearFilters();
    this.setState({
      loading: true,
      childrenModal: false,
      currentPage: 0,
      listings: [],
      filteredListings: null,
      isFiltered: false,
      allElements: false,
      nights: nights,
      stars: [false, false, false, false, false]
    }, () => {
      if (this.clientRef) {
        this.clientRef.connect();
      }
    });
  }

  async distributeAdults() {
    let adults = Number(this.state.adults);
    let rooms = this.state.rooms.slice(0);
    if (adults < rooms.length) {
      rooms = rooms.slice(0, adults);
    }

    let index = 0;
    while (adults > 0) {
      // console.log(`${adults} / ${rooms.length - index} = ${Math.ceil(adults / (rooms.length - index))}`)
      const quotient = Math.ceil(adults / (rooms.length - index));
      rooms[index].adults = quotient;
      adults -= quotient;
      index++;
    }

    await this.setState({ rooms: rooms });
  }

  distributeChildren() {
    this.openModal('childrenModal');
  }

  toggleFilter(key, value) {
    const stateKey = key + 'Toggled';
    const set = new Set(this.state[stateKey]);
    if (set.has(value)) {
      set.delete(value);
    } else {
      set.add(value);
    }

    this.setState({ [stateKey]: set });
    this.updateParamsMap(key, Array.from(set).join(','));
  }

  handleSelectRegion(value) {
    this.setState({ region: value });
  }

  handleOpenSelect() {
    if (!this.state.region) {
      this.setState({ region: { query: '' } });
    }
  }

  handleCloseSelect() {
    if (this.state.region && this.state.region.query === '') {
      this.setState({ region: null });
    }
  }

  handleDatePick(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });

    this.updateParamsMap('startDate', picker.startDate.format('DD/MM/YYYY'));
    this.updateParamsMap('endDate', picker.endDate.format('DD/MM/YYYY'));
  }

  onPageChange(page) {
    window.scrollTo(0, 0);
    this.setState({
      currentPage: page - 1,
      // loading: true
    });

    // let searchTerms = this.props.location.search;

    // const index = this.props.location.search.indexOf('&page=');
    // if (index != -1) {
    //     searchTerms = `${this.props.location.search.substr(0, index)}&page=${page - 1}`;
    // } else {
    //     searchTerms = `${this.props.location.search}&page=${page - 1}`;
    // }

    // testSearch(searchTerms, page - 1, localStorage.getItem('uuid')).then(json => {
    //     this.setState({
    //         listings: json.content,
    //         loading: false
    //     });
    // });

    // this.props.history.push(`/hotels/listings/${searchTerms}`);
  }

  getSearchTerms(searchParams) {
    let keys = Array.from(searchParams.keys());
    let pairs = [];
    for (let i = 0; i < keys.length; i++) {
      pairs.push(keys[i] + '=' + this.createParam(searchParams.get(keys[i])));
    }

    return pairs.join('&');
  }

  getSearchParams() {
    const map = new Map();
    const pairs = this.props.location.search.substr(1).split('&');
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split('=');
      map.set(pair[0], this.parseParam(pair[1]));
    }

    return map;
  }

  updateParamsMap(key, value) {
    if (!value || value === '') {
      this.state.searchParams.delete(key);
    } else {
      this.state.searchParams.set(key, this.createParam(value));
    }
  }

  parseParam(param) {
    return param.split('%20').join(' ');
  }

  createParam(param) {
    return param.split(' ').join('%20');
  }

  handleRoomsChange(event) {
    let value = event.target.value;
    let rooms = this.state.rooms.slice();
    if (rooms.length < value) {
      while (rooms.length < value) {
        rooms.push({ adults: 1, children: [] });
      }
    } else if (rooms.length > value) {
      rooms = rooms.slice(0, value);
    }

    this.setState({ rooms: rooms });
  }

  handleAdultsChange(event, roomIndex) {
    let value = event.target.value;
    let rooms = this.state.rooms.slice();
    rooms[roomIndex].adults = value;
    this.setState({ rooms: rooms });
  }

  handleChildrenChange(event, roomIndex) {
    let value = event.target.value;
    if (value > 10) {
      value = 10;
    }
    let rooms = this.state.rooms.slice();
    let children = rooms[roomIndex].children;
    if (children.length < value) {
      while (children.length < value) {
        children.push({ age: '' });
      }
    } else if (children.length > value) {
      children = children.slice(0, value);
    }

    rooms[roomIndex].children = children;
    this.setState({ rooms: rooms });
  }

  handleChildAgeChange(event, roomIndex, childIndex) {
    const value = event.target.value;
    const rooms = this.state.rooms.slice();
    rooms[roomIndex].children[childIndex].age = value;
    this.setState({ rooms: rooms });
  }

  handleReceiveSingleHotel(response) {
    if (response.hasOwnProperty('allElements')) {
      this.setState({ allElements: response.allElements, loading: !response.allElements });
      if (response.allElements && this.clientRef) {
        this.clientRef.disconnect();
      }
    } else {
      this.setState(prevState => ({
        listings: [...prevState.listings, response]
      }));
    }
  }

  sendInitialWebsocketRequest() {
    let query = '';
    query += 'region=' + this.state.region.id;
    query += '&currency=' + this.props.paymentInfo.currency;
    query += '&startDate=' + this.state.startDate.format('DD/MM/YYYY');
    query += '&endDate=' + this.state.endDate.format('DD/MM/YYYY');
    query += '&rooms=' + encodeURI(JSON.stringify(this.state.rooms));

    const msg = {
      query: query,
      uuid: localStorage.getItem('uuid')
    };

    const searchParams = this.getSearchParams(query);
    function addElement(value, key) {
      msg[key] = value;
    }

    searchParams.forEach(addElement);
    if (this.clientRef) {
      this.clientRef.sendMessage(`/app/all/${localStorage.getItem('uuid')}${window.btoa(this.props.location.search)}`, JSON.stringify(msg));
    }
  }

  // handleStopSearch() {
  //     this.setState({ allElements: true });
  //     this.clientRef.disconnect();
  // }

  handleOrderBy(event) {
    const orderBy = event.target.value;
    this.setState({ orderBy }, () => {
      this.applyFilters();
    });
  }

  handlePriceRangeSelect(event) {
    const priceRange = event.target.value;
    this.setState({ priceRange }, () => {
      this.applyFilters();
    });
  }

  handleToggleStar(star) {
    const stars = this.state.stars;
    stars[star] = !stars[star];
    this.setState({ stars }, () => {
      this.applyFilters();
    });
  }

  applyFilters() {
    const currentPage = 0;
    const { priceRange, orderBy } = this.state;
    const userCurrencyRate = this.state.rates[ROOMS_XML_CURRENCY][this.props.paymentInfo.currency];
    const stars = this.state.stars.filter(x => x).length > 0 ? this.state.stars.slice(0) : [true, true, true, true, true];
    const filteredListings = this.state.listings
      .slice(0)
      .filter(x => (priceRange[0] <= x.price * userCurrencyRate && x.price * userCurrencyRate <= priceRange[1]) && stars[x.stars - 1]);

    if (orderBy === 'asc') {
      filteredListings.sort((x, y) => x.price > y.price ? 1 : -1);
    } else if (orderBy === 'desc') {
      filteredListings.sort((x, y) => x.price > y.price ? -1 : 1);
    }

    this.setState({ filteredListings, currentPage, isFiltered: true });
  }

  clearFilters() {
    const defaultPriceRange = { target: { value: [0, 5000] } };
    const defaultOrderBy = { target: { value: '' } };
    this.handlePriceRangeSelect(defaultPriceRange);
    this.handleOrderBy(defaultOrderBy);
    this.setState({ stars: [false, false, false, false, false], isFiltered: false });
  }

  toggleMap() {
    this.setState(prev => {
      return { showMap: !prev.showMap };
    });
  }

  render() {
    let listings = this.state.isFiltered ? this.state.filteredListings : this.state.listings;

    const totalElements = listings.length;
    const startElement = this.state.currentPage * DEFAULT_PAGE_SIZE;

    return (
      <div>
        <div className="container">
          <HotelsSearchBar
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            region={this.state.region}
            rooms={this.state.rooms}
            adults={this.state.adults}
            hasChildren={this.state.hasChildren}
            guests={this.state.guests}
            onChange={this.onChange}
            handleRoomsChange={this.handleRoomsChange}
            handleSearch={this.handleSearch}
            handleDatePick={this.handleDatePick}
            handleSelectRegion={this.handleSelectRegion}
            handleToggleChildren={this.handleToggleChildren}
            handleOpenSelect={this.handleOpenSelect}
            handleCloseSelect={this.handleCloseSelect}
          />
        </div>

        <section id="hotel-box">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <FilterPanel
                  stars={this.state.stars}
                  orderBy={this.state.orderBy}
                  isSearchReady={this.state.allElements}
                  priceRange={this.state.priceRange}
                  handlePriceRangeSelect={this.handlePriceRangeSelect}
                  clearFilters={this.clearFilters}
                  handleStopSearch={this.handleStopSearch}
                  handleOrderBy={this.handleOrderBy}
                  handleToggleStar={this.handleToggleStar}
                />
                {this.state.showMap
                  ? <button onClick={this.toggleMap} className="btn btn-primary" style={{ width: '100%', marginBottom: '20px' }}>Show list</button>
                  : <button onClick={this.toggleMap} className="btn btn-primary" style={{ width: '100%', marginBottom: '20px' }}>Show on map</button>
                }

                {this.state.loading && !this.state.allElements &&
                  <div className="loader" style={{ marginBottom: '40px' }}></div>
                }
              </div>
              <div className="col-md-9">
                <div className="list-hotel-box" id="list-hotel-box">
                  {this.state.showMap
                    ? <div>
                      <MultiMarkerGoogleMap
                        lat={this.state.lat}
                        lon={this.state.lon}
                        hotels={listings}
                        isFiltered={this.state.isFiltered}
                        locRate={this.state.locRate}
                        rates={this.state.rates}
                        paymentInfo={this.props.paymentInfo}
                        isLogged={this.props.userInfo.isLogged}
                        nights={this.state.nights}
                      />
                    </div>
                    : <div>
                      <ResultsHolder
                        hotels={listings.slice(startElement, startElement + DEFAULT_PAGE_SIZE)}
                        locRate={this.state.locRate} rates={this.state.rates}
                        nights={this.state.nights}
                        loading={this.state.loading}
                      />

                      <Pagination
                        loading={this.state.loading}
                        onPageChange={this.onPageChange}
                        currentPage={this.state.currentPage + 1}
                        totalElements={totalElements}
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        <ChildrenModal
          modalId="childrenModal"
          rooms={this.state.rooms}
          handleChildrenChange={this.handleChildrenChange}
          handleChildAgeChange={this.handleChildAgeChange}
          isActive={this.state.childrenModal}
          closeModal={this.closeModal}
          handleSubmit={this.redirectToSearchPage}
        />

        <SockJsClient url={Config.getValue('apiHost') + 'handler'} topics={[`/topic/all/${localStorage.getItem('uuid')}${window.btoa(this.props.location.search)}`]}
          onMessage={this.handleReceiveSingleHotel} ref={(client) => { this.clientRef = client; }}
          onConnect={this.sendInitialWebsocketRequest}
          getRetryInterval={() => { return 3000; }}
          debug={false} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(HotelsSearchPage));

function mapStateToProps(state) {
  const { paymentInfo, userInfo } = state;
  return {
    paymentInfo,
    userInfo
  };
}

HotelsSearchPage.propTypes = {
  countries: PropTypes.array,

  // start Router props
  location: PropTypes.object,
  history: PropTypes.object,

  // start Redux props
  paymentInfo: PropTypes.object,
  userInfo: PropTypes.object
};