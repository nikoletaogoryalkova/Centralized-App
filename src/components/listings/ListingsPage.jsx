import Breadcrumb from '../Breadcrumb';
import Filters from './Filters';
import LPagination from '../common/LPagination';
import Listing from './Listing';
import PropTypes from 'prop-types';
import React from 'react';
import { getListingsByFilter, getCountries } from '../../requester';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import ListingTypeNav from './ListingTypeNav';

import SearchBar from '../common/searchbar/SearchBar';

class ListingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchParams: undefined,
            listings: undefined,
            listingLoading: true,
            currentPage: 1,
            totalItems: 0,
            countries: undefined,
            countryId: '',
            cities: [],
            propertyTypes: []
        };

        this.updateParamsMap = this.updateParamsMap.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    componentDidMount() {
        getCountries(true).then(data => {
            this.setState({ countries: data.content });
        });
        
        let searchTerms = this.getSearchTerms();
        getListingsByFilter(searchTerms + `&page=${this.state.currentPage - 1}`).then(data => {
            this.setState({
                listings: data.filteredListings.content,
                totalItems: data.filteredListings.totalElements,
                listingLoading: false,
                cities: data.cities,
                propertyTypes: data.types
            });
        });
    }

    componentWillMount() {
        if (this.props.location.search) {
            const searchParams = this.getSearchParams(this.props.location.search);
            this.setState({
                searchParams: searchParams,
                countryId: searchParams.get('countryId'),
                startDate: moment(searchParams.get('startDate'), 'DD/MM/YYYY'),
                endDate: moment(searchParams.get('endDate'), 'DD/MM/YYYY'),
                guests: searchParams.get('guests'),
            });
        }
    }

    handleSearch(e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            listings: null,
            listingLoading: true
        });
        
        let searchTerms = this.getSearchTerms();
        getListingsByFilter(searchTerms).then(data => {
            this.setState({
                listings: data.filteredListings.content,
                listingLoading: false,
                totalItems: data.filteredListings.totalElements,
                countryId: this.getSearchParams().get('countryId'),
                // cities: data.cities,
                // propertyTypes: data.types
            });

            if (!this.getSearchParams().get('cities') && !this.getSearchParams().get('propertyTypes')) {
                this.setState({
                    cities: data.cities,
                    propertyTypes: data.types
                });
            }

            let oldSearchTerms = queryString.parse(this.props.location.search);
            let newSearchTerms = this.getSearchParams();
            if (oldSearchTerms.countryId !== newSearchTerms.get('countryId') ||
                oldSearchTerms.startDate !== newSearchTerms.get('startDate') ||
                oldSearchTerms.endDate !== newSearchTerms.get('endDate') ||
                oldSearchTerms.guests !== newSearchTerms.get('guests')) {
                this.setState({
                    cities: data.cities,
                    propertyTypes: data.types
                });
            }
        });

        let url = `/listings/?${searchTerms}`;
        this.props.history.push(url);
    }

    handleDatePick(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate,
        });

        this.updateParamsMap('startDate', picker.startDate.format('DD/MM/YYYY'));
        this.updateParamsMap('endDate', picker.endDate.format('DD/MM/YYYY'));
    }

    getSearchTerms() {
        let keys = Array.from(this.state.searchParams.keys());
        let pairs = [];
        for (let i = 0; i < keys.length; i++) {
            pairs.push(keys[i] + '=' + this.createParam(this.state.searchParams.get(keys[i])));
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

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if (this.updateParamsMap) {
            this.updateParamsMap(e.target.name, e.target.value);
        }
    }

    onPageChange(page) {
        window.scrollTo(0, 0);
        this.setState({
            currentPage: page,
            listingLoading: true
        });

        let searchTerms = this.getSearchTerms();
        getListingsByFilter(searchTerms + `&page=${page - 1}`).then(data => {
            this.setState({
                listings: data.filteredListings.content,
                listingLoading: false,
                totalItems: data.filteredListings.totalElements
            });
        });
    }

    componentWillUnmount() {
        this.setState({
            listings: null,
            listingLoading: true,
            currentPage: 1,
            totalItems: 0
        });
    }

    render() {
        const listings = this.state.listings;
        const hasLoadedListings = listings ? true : false;
        const hasListings = hasLoadedListings && listings.length > 0 && listings[0].hasOwnProperty('defaultDailyPrice');

        let renderListings;

        if (!hasLoadedListings || this.state.listingLoading === true) {
            renderListings = <div className="loader"></div>;
        } else if (!hasListings) {
            renderListings = <div className="text-center"><h3>No results</h3></div>;
        } else {
            renderListings = listings.map((item, i) => {
                return <Listing key={i} listing={item} />;
            });
        }

        return (
            <div>
                {/* <Header paramsMap={this.paramsMap} updateParamsMap={this.updateParamsMap} handleSearch={this.handleSearch} /> */}
                <ListingTypeNav />
                <SearchBar
                    countryId={this.state.countryId} 
                    countries={this.state.countries}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    guests={this.state.guests}
                    onChange={this.onChange}
                    handleSearch={this.handleSearch}
                    handleDatePick={this.handleDatePick} />
                
                <Breadcrumb />
                <section id="hotel-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <Filters cities={this.state.cities} propertyTypes={this.state.propertyTypes} key={this.state.countryId} countryId={this.state.countryId} paramsMap={this.state.searchParams} updateParamsMap={this.updateParamsMap} handleSearch={this.handleSearch} />
                            </div>
                            <div className="col-md-9">
                                <div className="list-hotel-box" id="list-hotel-box">
                                    {renderListings}

                                    <LPagination
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

ListingsPage.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object
};

export default withRouter(ListingsPage);