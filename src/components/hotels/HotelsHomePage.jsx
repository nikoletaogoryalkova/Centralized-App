import { getListings } from '../../requester';

import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import HotelsSearchBar from './search/HotelsSearchBar';
import PopularListingsCarousel from '../common/listing/PopularListingsCarousel';
import ListingTypeNav from '../common/listingTypeNav/ListingTypeNav';

import { getTestHotels } from '../../requester';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        let startDate = moment();
        let endDate = moment().add(1, 'day');

        this.state = {
            startDate: startDate,
            endDate: endDate,
            rooms: [{ adults: 1, children: [] }],
            listings: undefined,
            country: '',
            city: '',
            state: '',
            countryCode: '',
        };

        this.onChange = this.onChange.bind(this);
        this.handleRoomsChange = this.handleRoomsChange.bind(this);
        this.handleAdultsChange = this.handleAdultsChange.bind(this);
        this.handleChildrenChange = this.handleChildrenChange.bind(this);
        this.handleChildAgeChange = this.handleChildAgeChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
    }

    componentDidMount() {
        getTestHotels().then((data) => {
            console.log(data);
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    handleSearch(e) {
        e.preventDefault();
        
        let queryString = '?';

        queryString += 'country=' + this.state.country;
        queryString += '&city=' + this.state.city;
        queryString += '&state=' + this.state.state;
        queryString += '&countryCode=' + this.state.countryCode;
        queryString += '&startDate=' + this.state.startDate.format('DD/MM/YYYY');
        queryString += '&endDate=' + this.state.endDate.format('DD/MM/YYYY');
        queryString += '&rooms=' + this.state.rooms.length;

        // TODO: concatenate individual rooms' adults and children

        this.props.history.push('hotels/listings' + queryString);
    }    
    
    handleDatePick(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate,
        });
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
    
    render() {
        return (
            <div>
                <header id='main-nav' className="navbar home_page">
                    <div className="container">
                        <h1 className="home_title">Discover your next experience</h1>
                        <h2 className="home_title">Browse for homes &amp; hotels worldwide</h2>
                        <div className="container absolute_box">
                            <ListingTypeNav />
                            <HotelsSearchBar
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                rooms={this.state.rooms}
                                guests={this.state.guests}
                                childrenCount={this.state.childrenCount}
                                childrenAges={this.state.childrenAges}
                                onChange={this.onChange}
                                handleAdultsChange={this.handleAdultsChange}
                                handleRoomsChange={this.handleRoomsChange}
                                handleChildrenChange={this.handleChildrenChange}
                                handleChildAgeChange={this.handleChildAgeChange}
                                handleSearch={this.handleSearch}
                                handleDatePick={this.handleDatePick} 
                            />
                        </div>
                    </div>
                </header>

                <section id="popular-hotels-box">
                    <h2>Popular Properties</h2>
                    {!this.state.listings ? <div>Not implemented</div> : 
                        this.state.listings && this.state.listings.length > 1 &&
                        <PopularListingsCarousel 
                            listings={this.state.listings} 
                            listingType="hotels" 
                        />
                    }
                    <div className="clearfix"></div>
                </section>
            </div>
        );
    }
}

export default withRouter(HomePage);