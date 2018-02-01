import { getListingsByFilter, getLocRate } from '../../requester';

import Breadcrumb from '../Breadcrumb';
import Filters from './Filters';
import Header from '../Header';
import Listing from './Listing';
import Pagination from 'rc-pagination';
import PropTypes from 'prop-types';
import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

class ListingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listings: null,
            listingLoading: true,
            currentPage: 1,
            totalItems: 0,
            locRate: null,
            countryId: '',
            cities: [],
            propertyTypes: []
        };

        this.updateParamsMap = this.updateParamsMap.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    componentDidMount() {
        if (this.props.location.search) {
            let searchTerms = this.getSearchTerms();
            getListingsByFilter(searchTerms + `&page=${this.state.currentPage - 1}`).then(data => {
                getLocRate().then((loc) => {
                    this.setState({
                        listings: data.filteredListings.content,
                        totalItems: data.filteredListings.totalElements,
                        locRate: loc[0].price_eur,
                        listingLoading: false,
                        cities: data.cities,
                        propertyTypes: data.types
                    });
                });
            });


        }
        else {
            this.props.history.push('/');
        }
    }

    componentWillMount() {
        if (this.props.location.search) {
            this.paramsMap = this.getParamsMap();
            this.setState({ countryId: this.getParamsMap().get('countryId') });
        }
    }

    handleSearch(e) {
        e.preventDefault();
        this.setState({
            listings: null,
            listingLoading: true
        });

        let oldSearchTerms = queryString.parse(this.props.location.search);
        let newSearchTerms = this.getParamsMap();
        let searchTerms = this.getSearchTerms();



        getListingsByFilter(searchTerms).then(data => {
            this.setState({
                listings: data.filteredListings.content,
                listingLoading: false,
                totalItems: data.filteredListings.totalElements,
                countryId: this.getParamsMap().get('countryId'),
            });

            if (!this.getParamsMap().get('cities') && !this.getParamsMap().get('propertyTypes')) {
                this.setState({
                    cities: data.cities,
                    propertyTypes: data.types
                });
            }

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

    getSearchTerms() {
        let keys = Array.from(this.paramsMap.keys());
        let pairs = [];
        for (let i = 0; i < keys.length; i++) {
            pairs.push(keys[i] + '=' + this.createParam(this.paramsMap.get(keys[i])));
        }

        return pairs.join('&');
    }

    getParamsMap() {
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
            this.paramsMap.delete(key);
        } else {
            this.paramsMap.set(key, this.createParam(value));
        }
        if (key === 'countryId') {
            this.paramsMap.delete('cities');
        }
    }

    parseParam(param) {
        return param.split('%20').join(' ');
    }

    createParam(param) {
        return param.split(' ').join('%20');
    }

    onPageChange(page) {
        this.setState({
            currentPage: page,
            listingLoading: true
        });

        let searchTerms = this.getSearchTerms();
        getListingsByFilter(searchTerms + `&page=${page - 1}`).then(data => {
            getLocRate().then((loc) => {
                this.setState({
                    listings: data.filteredListings.content,
                    listingLoading: false,
                    totalItems: data.filteredListings.totalElements,
                    locRate: loc[0].price_eur
                });
            });
        });
    }

    componentWillUnmount() {
        this.setState({
            listings: null,
            listingLoading: true,
            currentPage: 1,
            totalItems: 0,
            locRate: null
        });
    }

    render() {
        const listings = this.state.listings;
        const hasLoadedListings = listings ? true : false;
        const hasListings = hasLoadedListings && listings.length > 0 && listings[0].hasOwnProperty('defaultDailyPrice');

        let renderListings;
        let renderPagination;
        if (!hasLoadedListings || this.state.listingLoading === true) {
            window.scrollTo(0, 0);
            renderListings = <div className="loader"></div>;
        } else if (!hasListings) {
            renderListings = <div className="text-center"><h3>No results</h3></div>;
        } else {
            renderListings = listings.map((item, i) => {
                return <Listing locRate={this.state.locRate} key={i} listing={item} currency={this.props.currency} currencySign={this.props.currencySign} />;
            });

            renderPagination = <div className="pagination-box">{this.state.totalItems !== 0 && <Pagination className="pagination" defaultPageSize={20} onChange={this.onPageChange} current={this.state.currentPage} total={this.state.totalItems} />} </div>;
        }

        return (
            <div>
                <Header paramsMap={this.paramsMap} updateParamsMap={this.updateParamsMap} handleSearch={this.handleSearch} />
                <Breadcrumb />
                <section id="hotel-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <Filters cities={this.state.cities} propertyTypes={this.state.propertyTypes} key={this.state.countryId} countryId={this.state.countryId} paramsMap={this.paramsMap} updateParamsMap={this.updateParamsMap} handleSearch={this.handleSearch} />
                            </div>
                            <div className="col-md-9">
                                <div className="list-hotel-box" id="list-hotel-box">
                                    {renderListings}
                                    {renderPagination}
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
    history: PropTypes.object,
    currency: PropTypes.string,
    currencySign: PropTypes.string
};

export default withRouter(ListingsPage);