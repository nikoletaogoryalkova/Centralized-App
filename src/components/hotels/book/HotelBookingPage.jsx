import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getTestHotelById } from '../../../requester';

class HotelBookingPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // rooms: [{ adults: [{ title: '', firstName: '', lastName: '' }], children: [] }],
            data: null,
            loading: true,
        };

        this.onChange = this.onChange.bind(this);
        this.handleRoomsChange = this.handleRoomsChange.bind(this);
        this.handleAdultsChange = this.handleAdultsChange.bind(this);
        this.handleChildrenChange = this.handleChildrenChange.bind(this);
        this.handleChildAgeChange = this.handleChildAgeChange.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const search = this.props.location.search;
        const quoteId = localStorage.getItem("quoteId");
        getTestHotelById(id, search).then((data) => {
            this.setState({ data: data, loading: false, quoteId: quoteId });
            const results = data.rooms.filter(x => x.quoteId === quoteId);
            const rooms = results.map((room) => {
                return {
                    adults: [{ title: '', firstName: '', lastName: '' }],
                    children: []
                };
            });

            this.setState({ rooms: rooms });
        });
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if (this.updateParamsMap) {
            this.updateParamsMap(e.target.name, e.target.value);
        }
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
        const rooms = this.state.data && this.state.data.rooms.filter(x => x.quoteId === this.state.quoteId);
        return (
            <div>
                <div>
                    <NotificationContainer />
                </div>
                
                {!this.state.data ? 
                    <div className="loader"></div> :
                    <div>
                        <section id="room-book">
                            <div className="container">
                                {rooms && rooms.map((results, resultIndex) => {
                                    return (
                                        <div key={resultIndex}>
                                            {results.roomsResults && results.roomsResults.map((room, roomIndex) => {
                                                return (
                                                    <div key={roomIndex}>
                                                        <h2>{room.name}</h2>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
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