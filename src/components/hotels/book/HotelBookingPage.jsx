import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getTestHotelById, testBook } from '../../../requester';

class HotelBookingPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // rooms: [{ adults: [{ title: '', firstName: '', lastName: '' }], children: [] }],
            data: null,
            loading: true,
        };

        this.handleAdultChange = this.handleAdultChange.bind(this);
        this.handleChildAgeChange = this.handleChildAgeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const search = this.props.location.search;
        const quoteId = localStorage.getItem('quoteId');
        const searchParams = this.getSearchParams(this.props.location.search);
        const rooms = this.getRooms(searchParams);
        const nights = this.getNights(searchParams);
        getTestHotelById(id, search).then((data) => {
            const roomResults = data.rooms.filter(x => x.quoteId === quoteId)[0].roomsResults;
            const totalPrice = this.getTotalPrice(roomResults);
            this.setState({
                hotel: data,
                nights: nights,
                roomResults: roomResults,
                totalPrice: totalPrice,
                rooms: rooms, 
                pictures: data.hotelPhotos, 
                loading: false, 
                quoteId: quoteId });
        });
    }

    getRooms(searchParams) {
        const searchRooms = JSON.parse(decodeURI(searchParams.get('rooms')));
        const result = [];
        for (let i = 0; i < searchRooms.length; i++) {
            const searchRoom = searchRooms[i];
            const adults = [];
            for (let j = 0; j < searchRoom.adults; j++) {
                const adult = {
                    title: 'Mr',
                    firstName: '',
                    lastName: '',
                };

                adults.push(adult);
            }

            const children = searchRoom.children;
            const room = {
                adults: adults,
                children: children
            };

            result.push(room);
        }

        return result;
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
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if (this.updateParamsMap) {
            this.updateParamsMap(e.target.name, e.target.value);
        }
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

    parseParam(param) {
        return param.split('%20').join(' ');
    }

    handleAdultChange(event, roomIndex, adultIndex) {
        const name = event.target.name;
        const value = event.target.value;
        const rooms = this.state.rooms.slice();
        rooms[roomIndex].adults[adultIndex][name] = value;
        this.setState({ rooms: rooms });
    }

    handleChildAgeChange(event, roomIndex, childIndex) {
        const name = event.target.name;
        const value = event.target.value;
        const rooms = this.state.rooms.slice();
        rooms[roomIndex].children[childIndex][name] = value;
        this.setState({ rooms: rooms });
    }

    handleSubmit() {
        const quoteId = this.state.quoteId;
        const rooms = this.state.rooms;
        const currency = this.props.paymentInfo.currency;
        const booking = {
            quoteId: quoteId,
            rooms: rooms,
            currency: currency
        };

        const encodedBooking = encodeURI(JSON.stringify(booking));
        const id = this.props.match.params.id;
        const query = `?booking=${encodedBooking}`;
        window.location.href = `/hotels/listings/book/confirm/${id}${query}`;
    }

    render() {
        const hotelName = this.state.hotel && this.state.hotel.name;
        const hotelMainAddress = this.state.hotel && this.state.hotel.additionalInfo.mainAddress;
        const hotelCityName = this.state.hotel && this.state.hotel.city.name;
        const rooms = this.state.rooms;
        const hotelPicUrl = this.state.pictures && this.state.pictures[0].externalUrl;
        const totalPrice = this.state.roomResults && this.state.roomResults.reduce((x, y) => x.price + y.price);
        return (
            <div>
                <div>
                    <NotificationContainer />
                </div>

                <div className="booking-steps">
                    <div className="container">
                        <p>1. Provide Guest Information</p>
                        <p>2. Review Room Details</p>
                        <p>3. Confirm and Pay</p>
                    </div>
                </div>
                
                {!this.state.hotel ? 
                    <div className="loader"></div> :
                    <div>
                        <section id="room-book">
                            <div className="container">
                                <div className="col-md-5">
                                    <div className="hotel-info">
                                        <div className="hotel-picture">
                                            <img src={`http://roomsxml.com${hotelPicUrl}`} alt="Hotel Picture"/>
                                        </div>
                                        <h2>{hotelName}</h2>
                                        <h3>{hotelMainAddress}, {hotelCityName}</h3>
                                        <hr/>
                                        {this.state.roomResults && this.state.roomResults.map((room, index) => {
                                            return (<h3 key={index}>{room.name}, {this.state.nights} nights: {this.props.paymentInfo.currencySign}{room.price}</h3>)
                                        })}
                                        <hr/>
                                        <h2 className="total-price">Total: {this.props.paymentInfo.currencySign}{this.state.totalPrice}</h2>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    {rooms && rooms.map((room, roomIndex) => {
                                        return (
                                            <div className="form-group" key={roomIndex}>
                                                <h2>Room</h2>
                                                <hr/>
                                                {room && room.adults.map((adult, adultIndex) => {
                                                    return (
                                                        <div className="form-row" key={adultIndex}>
                                                            <label htmlFor="title">Guest</label>
                                                            <select className="title-select" name="title" onChange={(e) => {this.handleAdultChange(e, roomIndex, adultIndex); }} >
                                                                <option value="Mr">Mr</option>
                                                                <option value="Mrs">Mrs</option>
                                                            </select>

                                                            <input className="guest-name" type="text" placeholder="First Name" name="firstName" onChange={(e) => {this.handleAdultChange(e, roomIndex, adultIndex); }} />
                                                            <input className="guest-name" type="text" placeholder="Last Name" name="lastName" onChange={(e) => {this.handleAdultChange(e, roomIndex, adultIndex); }} />
                                                        </div>
                                                    );
                                                })}

                                                {room && room.children.map((child, childIndex) => {
                                                    return (
                                                        <div className="form-row" key={childIndex}>
                                                            <label htmlFor="age">Child (age)</label>
                                                            <input className="child-age" type="number" value={this.state.rooms[roomIndex].children[childIndex].age} placeholder="Age" name="age" onChange={(e) => {this.handleChildAgeChange(e, roomIndex, childIndex); }} />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="col col-md-12">
                                    <button className="btn btn-primary btn-book" onClick={this.handleSubmit}>Proceed</button>
                                </div>
                            </div>
                        </section>
                    </div>
                }
            </div>
        );
    }
}

HotelBookingPage.propTypes = {
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

export default withRouter(connect(mapStateToProps)(HotelBookingPage));

function mapStateToProps(state) {
    const { userInfo, paymentInfo } = state;
    return {
        userInfo,
        paymentInfo
    };
}