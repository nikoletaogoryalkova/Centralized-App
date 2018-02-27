import Breadcrumb from '../../Breadcrumb';
// import FilterPanel from './filter/FilterPanel';
import LPagination from '../../common/LPagination';
import HotelItem from './HotelItem';
import PropTypes from 'prop-types';
import React from 'react';
import { getListingsByFilter } from '../../../requester';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import HotelsSearchBar from './HotelsSearchBar';
import RoomInfoModal from './modals/RoomInfoModal';
import ListingTypeNav from '../../common/listingTypeNav/ListingTypeNav';

import { testSearch, getTestHotels, getLocRateInUserSelectedCurrency } from '../../../requester';

class HotelsSearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: undefined,
            endDate: undefined,
            rooms: [{ adults: 1, children: [] }],
            country: '',
            city: '',
            state: '',
            countryCode: '',
            searchParams: undefined,
            listings: undefined,
            loading: true,
            totalElements: 0,
            currentPage: 1,
        };

        this.updateParamsMap = this.updateParamsMap.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleRoomsChange = this.handleRoomsChange.bind(this);
        this.handleAdultsChange = this.handleAdultsChange.bind(this);
        this.handleChildrenChange = this.handleChildrenChange.bind(this);
        this.handleChildAgeChange = this.handleChildAgeChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.clearFilters = this.clearFilters.bind(this);

        this.handleSelectRegion = this.handleSelectRegion.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getLocRate = this.getLocRate.bind(this);
    }

    componentDidMount() {
        testSearch(this.props.location.search).then((json) => {
            console.log(json);
            this.setState({
                listings: json, 
                loading: false 
            });
        });

        this.getLocRate();
    }

    componentWillMount() {
        if (this.props.location.search) {
            const searchParams = this.getSearchParams(this.props.location.search);
            this.setState({
                searchParams: searchParams,
                startDate: moment(searchParams.get('startDate'), 'DD/MM/YYYY'),
                endDate: moment(searchParams.get('endDate'), 'DD/MM/YYYY'),
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            listings: null,
            loading: true,
            currentPage: 1,
            totalElements: 0
        });
    }

    getLocRate() {
        const currency = this.props.paymentInfo.currency;
        console.log(currency);
        getLocRateInUserSelectedCurrency(currency).then((json) => {
            console.log(json);
            this.setState({ locRate: Number(json[0][`price_${currency.toLowerCase()}`]) });
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

        let queryString = '?';

        queryString += 'region=' + this.state.region.id;
        queryString += '&currency=' + this.props.paymentInfo.currency;
        queryString += '&startDate=' + this.state.startDate.format('DD/MM/YYYY');
        queryString += '&endDate=' + this.state.endDate.format('DD/MM/YYYY');
        queryString += '&rooms=' + encodeURI(JSON.stringify(this.getRooms()));

        window.location.href = '/hotels/listings' + queryString;

        // this.setState({ loading: true}, () => {
        //     testSearch(queryString).then((json) => {
        //         console.log(json);
        //         this.setState({ 
        //             listings: json, 
        //             loading: false 
        //         });
        //     });
        // });
    }

    getRooms() {
        return this.state.rooms.map((room) => {
            return {
                adults: room.adults,
                children: room.children.map((age) => { return { age: age}; })
            };
        });
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
            this.setState({listings: data.filteredListings.content,
                loading: false,
                totalElements: data.filteredListings.totalElements,
                countryId: this.getSearchParams().get('countryId'),
            });
        });
        let url = `/hotels/listings/?${searchTerms}`;
        this.props.history.push(url);
    }

    clearFilters(e) {
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

    handleSelectRegion(value) {
        this.setState({ region: value });
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
        testSearch(searchTerms + `&page=${page - 1}`).then(data => {
            // this.setState({
            //     listings: data.content,
            //     loading: false,
            //     totalElements: data.totalElements
            // });
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
        if (value < 1) {
            value = 1;
        } else if (value > 5) {
            value = 5;
        }
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
                children.push('');
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
        rooms[roomIndex].children[childIndex] = value;
        this.setState({ rooms: rooms });
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

    render() {
        const listings = this.state.listings;

        let renderListings;

        if (!listings || this.state.loading === true) {
            renderListings = <div className="loader"></div>;
        } else if (listings.length === 0) {
            renderListings = <div className="text-center"><h3>No results</h3></div>;
        } else {
            renderListings = listings.map((item, i) => {
                return <HotelItem key={i} listing={item} locRate={this.state.locRate} />;
            });
        }

        return (
            <div>
                <ListingTypeNav />
                <HotelsSearchBar
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    region={this.state.region}
                    rooms={this.state.rooms}
                    guests={this.state.guests}
                    onChange={this.onChange}
                    handleRoomsChange={this.handleRoomsChange}
                    handleSearch={(e) => this.openModal(`roomInfo${0}`, e)}
                    handleDatePick={this.handleDatePick}
                    handleSelectRegion={this.handleSelectRegion}
                />

                <Breadcrumb />
                <section id="hotel-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                {/* <FilterPanel 
                                    cities={this.state.cities}
                                    citiesToggled={this.state.citiesToggled}
                                    priceValue={this.state.priceValue}
                                    setPriceValue={this.setPriceValue}
                                    countryId={this.state.countryId}
                                    handleSearch={this.handleFilter} 
                                    toggleFilter={this.toggleFilter}
                                    clearFilters={this.clearFilters} /> */}
                            </div>
                            <div className="col-md-9">
                                <div className="list-hotel-box" id="list-hotel-box">
                                    {renderListings}

                                    <LPagination
                                        loading={this.state.totalElements === 0}
                                        onPageChange={this.onPageChange}
                                        currentPage={this.state.currentPage}
                                        totalElements={this.state.totalElements}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {this.state.rooms && this.state.rooms.map((room, i) => {
                    return (
                        <RoomInfoModal
                            key={i}
                            roomId={i}
                            modalId={`roomInfo${i}`}
                            room={room}
                            rooms={this.state.rooms}
                            handleAdultsChange={this.handleAdultsChange}
                            handleChildrenChange={this.handleChildrenChange}
                            handleChildAgeChange={this.handleChildAgeChange}
                            isActive={this.state[`roomInfo${i}`]}
                            openModal={this.openModal}
                            closeModal={this.closeModal}
                            handleSearch={this.handleSearch}
                        />
                    );
                })}
            </div>
        );
    }
}

HotelsSearchPage.propTypes = {
    countries: PropTypes.array,
    location: PropTypes.object,
    history: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(HotelsSearchPage));

function mapStateToProps(state) {
    const { paymentInfo } = state;
    return {
        paymentInfo
    };
}