import Breadcrumb from '../../Breadcrumb';
import FilterPanel from './filter/FilterPanel';
import Pagination from '../../common/pagination/Pagination';
import HomeItem from './HomeItem';
import PropTypes from 'prop-types';
import React from 'react';
import { getListingsByFilter } from '../../../requester';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import HomesSearchBar from './HomesSearchBar';

class ListingSearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countryId: '',
      startDate: undefined,
      endDate: undefined,
      guests: undefined,
      cities: [],
      citiesToggled: new Set(),
      priceValue: [1, 5000],
      propertyTypes: [],
      propertyTypesToggled: new Set(),
      searchParams: undefined,
      listings: undefined,
      loading: true,
      totalItems: 0,
      currentPage: 1,
    };

    this.updateParamsMap = this.updateParamsMap.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleDatePick = this.handleDatePick.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.setPriceValue = this.setPriceValue.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
  }

  componentDidMount() {
    // getCountries(true).then(data => {
    //     this.setState({ countries: data.content });
    // });

    const searchTerms = this.getSearchTerms(this.state.searchParams);
    getListingsByFilter(searchTerms + `&page=${this.state.currentPage - 1}`).then(data => {
      this.setState({
        listings: data.filteredListings.content,
        totalItems: data.filteredListings.totalElements,
        loading: false,
        cities: data.cities,
        propertyTypes: data.types
      });
    });
  }

  componentWillMount() {
    if (this.props.location.search) {
      const searchParams = this.getSearchParams(this.props.location.search);
      const priceValue = this.getPriceValue(searchParams);
      this.setState({
        searchParams: searchParams,
        countryId: searchParams.get('countryId'),
        startDate: moment(searchParams.get('startDate'), 'DD/MM/YYYY'),
        endDate: moment(searchParams.get('endDate'), 'DD/MM/YYYY'),
        guests: searchParams.get('guests'),
        selectedCities: new Set(),
        selectedPropertyTypes: new Set(),
        priceValue: priceValue,
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      listings: null,
      loading: true,
      currentPage: 1,
      totalItems: 0
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.updateParamsMap) {
      this.updateParamsMap(e.target.name, e.target.value);
    }
  }

  handleSearch(e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({
      listings: null,
      loading: true
    });

    this.clearFilters(e);
    const searchTerms = this.getSearchTerms(this.state.searchParams);
    getListingsByFilter(searchTerms).then(data => {
      this.setState({
        listings: data.filteredListings.content,
        loading: false,
        totalItems: data.filteredListings.totalElements,
        countryId: this.getSearchParams().get('countryId'),
        cities: data.cities,
        propertyTypes: data.types
      });
    });
    const url = `/homes/listings/?${searchTerms}`;
    this.props.history.push(url);
  }

  handleFilter(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    this.setState({
      listings: null,
      loading: true
    });

    let searchTerms = this.getSearchTerms(this.state.searchParams);
    getListingsByFilter(searchTerms).then(data => {
      this.setState({
        listings: data.filteredListings.content,
        loading: false,
        totalItems: data.filteredListings.totalElements,
        countryId: this.getSearchParams().get('countryId'),
      });
    });
    let url = `/homes/listings/?${searchTerms}`;
    this.props.history.push(url);
  }

  clearFilters(e) {
    this.setState({
      priceValue: [1, 5000],
      citiesToggled: new Set(),
      propertyTypesToggled: new Set(),
    });

    this.updateParamsMap('priceMin', '1');
    this.updateParamsMap('priceMax', '5000');
    this.updateParamsMap('cities', '');
    this.updateParamsMap('propertyTypes', '');
    this.handleFilter(e);
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
      currentPage: page,
      loading: true
    });

    const searchTerms = this.getSearchTerms(this.state.searchParams);
    getListingsByFilter(searchTerms + `&page=${page - 1}`).then(data => {
      this.setState({
        listings: data.filteredListings.content,
        loading: false,
        totalItems: data.filteredListings.totalElements
      });
    });
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

    if (!map.has('priceMin')) {
      map.set('priceMin', '1');
    }

    if (!map.has('priceMax')) {
      map.set('priceMax', '5000');
    }

    return map;
  }

  updateParamsMap(key, value) {
    if (!value || value === '') {
      this.state.searchParams.delete(key);
    } else {
      this.state.searchParams.set(key, this.createParam(value));
    }
    if (key === 'countryId') {
      this.state.searchParams.delete('cities');
    }
  }

  parseParam(param) {
    return param.split('%20').join(' ');
  }

  createParam(param) {
    return param.split(' ').join('%20');
  }

  setPriceValue(e) {
    let min = e.target.value[0].toString();
    let max = e.target.value[1].toString();

    this.updateParamsMap('priceMin', min);
    this.updateParamsMap('priceMax', max);
    this.setState({
      priceValue: e.target.value
    });
  }

  getPriceValue(searchParams) {
    let min = Number(searchParams.get('priceMin')) > 1 ? Number(searchParams.get('priceMin')) : 1;
    let max = Number(searchParams.get('priceMax')) < 5000 ? Number(searchParams.get('priceMax')) : 5000;
    return [min, max];
  }

  render() {
    const listings = this.state.listings;
    const hasLoadedListings = listings ? true : false;
    const hasListings = hasLoadedListings && listings.length > 0 && listings[0].hasOwnProperty('defaultDailyPrice');

    let renderListings;

    if (!hasLoadedListings || this.state.loading === true) {
      renderListings = <div className="loader"></div>;
    } else if (!hasListings) {
      renderListings = <div className="text-center"><h3>No results</h3></div>;
    } else {
      renderListings = listings.map((item, i) => {
        return <HomeItem key={i} listing={item} />;
      });
    }

    return (
      <div>
        {/* <ListingTypeNav /> */}
        <div className="container">
          <HomesSearchBar
            countryId={this.state.countryId}
            countries={this.props.countries}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            guests={this.state.guests}
            onChange={this.onChange}
            handleSearch={this.handleSearch}
            handleDatePick={this.handleDatePick} />
        </div>

        <Breadcrumb />
        <section id="hotel-box">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <FilterPanel
                  cities={this.state.cities}
                  citiesToggled={this.state.citiesToggled}
                  propertyTypes={this.state.propertyTypes}
                  propertyTypesToggled={this.state.propertyTypesToggled}
                  priceValue={this.state.priceValue}
                  setPriceValue={this.setPriceValue}
                  countryId={this.state.countryId}
                  handleSearch={this.handleFilter}
                  toggleFilter={this.toggleFilter}
                  clearFilters={this.clearFilters} />
              </div>
              <div className="col-md-9">
                <div className="list-hotel-box" id="list-hotel-box">
                  {renderListings}

                  <Pagination
                    loading={this.state.totalItems === 0}
                    onPageChange={this.onPageChange}
                    currentPage={this.state.currentPage}
                    totalElements={this.state.totalItems}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ListingSearchPage.propTypes = {
  countries: PropTypes.array,
  location: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(ListingSearchPage);