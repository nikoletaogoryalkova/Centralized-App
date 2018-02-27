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
        console.log(rooms);
        getTestHotelById(id, search).then((data) => {
            console.log(data);
            const roomResults = data.rooms.filter(x => x.quoteId === quoteId);
            this.setState({ roomResults: roomResults, rooms: rooms, loading: false, quoteId: quoteId });
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
                    title: '',
                    firstName: '',
                    lastName: '',
                };

                adults.push(adult);
            }

            const children = searchRoom.children.map((c) => { return {age: c}; });
            const room = {
                adults: adults,
                children: children
            };

            result.push(room);
        }

        return result;
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
        const submitObj = {
            quoteId: quoteId,
            rooms: rooms,
            currency: currency
        };
        testBook(submitObj);
    }

    render() {
        const rooms = this.state && this.state.rooms;
        return (
            <div>
                <div>
                    <NotificationContainer />
                </div>
                
                {!this.state.roomResults ? 
                    <div className="loader"></div> :
                    <div>
                        <section id="room-book">
                            <div className="container">
                                {rooms && rooms.map((room, roomIndex) => {
                                    return (
                                        <div key={roomIndex}>
                                            <h2>Room {roomIndex + 1}</h2>
                                            {room && room.adults.map((adult, adultIndex) => {
                                                return (
                                                    <div key={adultIndex}>
                                                        <h3>Adult {adultIndex + 1}</h3>
                                                        <input type="text" placeholder="Title" name="title" onChange={(e) => {this.handleAdultChange(e, roomIndex, adultIndex); }} />
                                                        <input type="text" placeholder="First Name" name="firstName" onChange={(e) => {this.handleAdultChange(e, roomIndex, adultIndex); }} />
                                                        <input type="text" placeholder="Last Name" name="lastName" onChange={(e) => {this.handleAdultChange(e, roomIndex, adultIndex); }} />
                                                    </div>
                                                );
                                            })}

                                            {room && room.children.map((child, childIndex) => {
                                                return (
                                                    <div key={childIndex}>
                                                        <h3>Child {childIndex + 1}</h3>
                                                        <input type="text" placeholder="Age" name="age" onChange={(e) => {this.handleChildAgeChange(e, roomIndex, childIndex); }} />
                                                    </div>
                                                );
                                            })}
                                            <hr/>
                                        </div>
                                    );
                                })}
                                <button className="btn btn-primary" onClick={this.handleSubmit}>Book</button>
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