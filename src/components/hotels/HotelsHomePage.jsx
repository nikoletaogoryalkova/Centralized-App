import { getListings } from '../../requester';

import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import HotelsSearchBar from './search/HotelsSearchBar';
import PopularListingsCarousel from '../common/listing/PopularListingsCarousel';
import ListingTypeNav from '../common/listingTypeNav/ListingTypeNav';

import { getTestHotels } from '../../requester';
import { testSearch, getCurrencyRates } from '../../requester';
import { connect } from 'react-redux';

import ChildrenModal from './modals/ChildrenModal';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        let startDate = moment().add(1, 'day');
        let endDate = moment().add(2, 'day');

        this.state = {
            startDate: startDate,
            endDate: endDate,
            rooms: [{ adults: 1, children: [] }],
            adults: '2',
            hasChildren: false,
            listings: undefined,
            childrenModal: false,
            // region: { id: undefined, query: undefined },
        };

        this.onChange = this.onChange.bind(this);
        this.handleRoomsChange = this.handleRoomsChange.bind(this);
        this.handleAdultsChange = this.handleAdultsChange.bind(this);
        this.handleChildrenChange = this.handleChildrenChange.bind(this);
        this.handleChildAgeChange = this.handleChildAgeChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);

        this.handleSelectRegion = this.handleSelectRegion.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
        this.handleToggleChildren = this.handleToggleChildren.bind(this);
    }

    componentDidMount() {
        getTestHotels().then((data) => {
            this.setState({ listings: data.content });
        });

        getCurrencyRates('USD').then((json) => {
            console.log(json);
        });
    }

    onChange(e) {
        console.log(e.target.name)
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSelectRegion(value) {
        this.setState({ region: value });
    }
    
    handleSearch(event) {
        if (event) {
            event.preventDefault();
        }

        this.distributeAdults().then(() => {
            if (this.state.hasChildren) {
                this.distributeChildren();
            } else {
                this.redirectToSearchPage(event);
            }
        });
    }

    redirectToSearchPage() {
        let queryString = '?';
        queryString += 'region=' + this.state.region.id;
        queryString += '&currency=' + this.props.paymentInfo.currency;
        queryString += '&startDate=' + this.state.startDate.format('DD/MM/YYYY');
        queryString += '&endDate=' + this.state.endDate.format('DD/MM/YYYY');
        queryString += '&rooms=' + encodeURI(JSON.stringify(this.state.rooms));
        this.props.history.push('/hotels/listings' + queryString);
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

    // getRooms() {
    //     return this.state.rooms.map((room) => {
    //         return {
    //             adults: room.adults,
    //             children: room.children.map((age) => { return { age: age}; })
    //         };
    //     });
    // }
    
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
                children.push({ age: '1' });
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

    handleToggleChildren() {
        const hasChildren = this.state.hasChildren;
        const rooms = this.state.rooms.slice(0);
        if (hasChildren) {
            for (let i = 0; i < rooms.length; i++) {
                rooms[i].children = new Array();
            }
        }

        this.setState({
            hasChildren: !hasChildren,
            rooms: rooms
        });
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
                                region={this.state.region}
                                adults={this.state.adults}
                                hasChildren={this.state.hasChildren}
                                rooms={this.state.rooms}
                                guests={this.state.guests}
                                onChange={this.onChange}
                                handleRoomsChange={this.handleRoomsChange}
                                handleSearch={this.handleSearch}
                                handleDatePick={this.handleDatePick}
                                handleSelectRegion={this.handleSelectRegion}
                                handleToggleChildren={this.handleToggleChildren}
                            />
                        </div>
                    </div>
                </header>

                <section id="popular-hotels-box">
                    <h2>Popular Properties</h2>
                    {!this.state.listings ? <div className="loader"></div> : 
                        this.state.listings && this.state.listings.length > 1 &&
                        <PopularListingsCarousel 
                            listings={this.state.listings} 
                            listingsType="hotels" 
                        />
                    }
                    <div className="clearfix"></div>
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
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(HomePage));

function mapStateToProps(state) {
    const { paymentInfo } = state;
    return {
        paymentInfo
    };
}