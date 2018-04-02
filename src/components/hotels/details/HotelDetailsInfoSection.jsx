import PropTypes from 'prop-types';
import HotelDetailsAmenityColumn from './HotelDetailsAmenityColumn';
import HotelDetailsReviewBox from './HotelDetailsReviewBox';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LOGIN } from '../../../constants/modals.js';
import { ROOMS_XML_CURRENCY } from '../../../constants/currencies.js';
import { openModal } from '../../../actions/modalsInfo.js';

function HomeDetailsInfoSection(props) {
    const getAmenities = (amenities) => {
        const result = new Array(3);
        for (let i = 0; i < 3; i++) {
            result[i] = new Array(0);
        }

        for (let i = 0; i < amenities.length; i++) {
            if (i % 3 === 0) {
                result[0].push(amenities[i]);
            } else if (i % 3 === 1) {
                result[1].push(amenities[i]);
            } else if (i % 3 === 2) {
                result[2].push(amenities[i]);
            }
        }

        return result;
    };

    const getTotalPrice = (room) => {
        let total = 0;
        for (let i = 0; i < room.length; i++) {
            total += room[i].price;
        }

        return total;
    };
    
    const calculateStars = (ratingNumber) => {
        let starsElements = [];
        let rating = Math.round(ratingNumber);
        for (let i = 0; i < rating; i++) {
            starsElements.push(<span key={i} className="full-star"></span>);
        }
        
        // for (let i = 0; i < 5 - rating; i++) {
        //     starsElements.push(<span key={100 - i} className="empty-star"></span>);
        // }

        return starsElements;
    };

    const getButton = (resultIndex) => {
        if (!props.userInfo.isLogged) {
            return <button className="btn btn-primary" onClick={(e) => props.dispatch(openModal(LOGIN, e))}>Login</button>;
        } else {
            return <button className="btn btn-primary" onClick={() => props.handleBookRoom(roomsResults.slice(resultIndex))}>Book Now</button>;
        }
    };

    const allAmenities = props.data.amenities;
    const mostPopularFacilities = allAmenities.slice(0, 5);
    const amenities = getAmenities(allAmenities.slice(5));
    const street = props.data.additionalInfo.mainAddress;
    const city = props.data.city.name;
    const country = props.data.region.country.name;
    const rooms = props.data.rooms;
    const usedRoomsByTypeAndMeal = {};
    for (let room of rooms) {
        let key = '';
        let price = 0;
        for (let result of room.roomsResults) {
            key += result.name + '|' + result.mealType + '%';
            price += result.price;
        }
        if (!usedRoomsByTypeAndMeal.hasOwnProperty(key)) {
            usedRoomsByTypeAndMeal[key] = [];
        }
        usedRoomsByTypeAndMeal[key].push({
            totalPrice: price,
            quoteId: room.quoteId,
            roomsResults: room.roomsResults,
            key: key
        });
    }
    let roomsResults = [];
    for (let key in usedRoomsByTypeAndMeal) {
        roomsResults.push(usedRoomsByTypeAndMeal[key].sort((x, y) => x.totalPrice > y.totalPrice ? 1 : -1)); 
    }
    roomsResults = roomsResults.sort((x, y) => getTotalPrice(x[0].roomsResults) > getTotalPrice(y[0].roomsResults) ? 1 : -1);

    return (
        <div className="hotel-content" id="hotel-section">
            <h1> {props.data.name} </h1>
            <div className="list-hotel-rating">
                <div className="list-hotel-rating-stars">
                    {calculateStars(props.data.star)}
                </div>
            </div>
            <div className="clearfix" />
            <p>{street}, {city}, {country}</p>
            <div className="list-hotel-description">
                <h2>Description</h2>            
                <span dangerouslySetInnerHTML={{__html: props.data.descriptions.filter(x => x.type === 'PropertyInformation')[0] ? props.data.descriptions.filter(x => x.type === 'PropertyInformation')[0].text : (props.data.descriptions.filter(x => x.type === 'General')[0] ? props.data.descriptions.filter(x => x.type === 'General')[0].text : '')}}></span>
            </div>

            <div id="facilities">
                <h2>Facilities</h2>
                <hr />
                <h3>Most Popular Facilities</h3>
                {mostPopularFacilities.map((item, i) => {
                    return (
                        <div key={i} className="icon-facilities">
                            <span className="icon-image" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><b>{item.text}</b></span>
                        </div>
                    );
                })}
                <div className="clearfix" />
            </div>
            <div className="clearfix" />

            <div className="hotel-extras">
                <div className="row">
                    <HotelDetailsAmenityColumn amenities={amenities[0]} />
                    <HotelDetailsAmenityColumn amenities={amenities[1]} />
                    <HotelDetailsAmenityColumn amenities={amenities[2]} />
                </div>
                <div className="clearfix" />

                {props.descriptionsAccessInfo &&
                    <div id="hotel-rules">
                        <h2>Access info</h2>
                        <p>{props.data.descriptionsAccessInfo}</p>
                        <hr />
                    </div>
                }
                <div className="clearfix" />

                {props.data.reviews && props.data.reviews.length > 0 &&
                    <div id="reviews">
                        <h2>User Rating &amp; Reviews</h2>
                        {props.data.reviews.map((item, i) => {
                            return (
                                <HotelDetailsReviewBox 
                                    key={i} 
                                    rating={item.average} 
                                    reviewText={item.comments} 
                                />
                            );
                        })}
                        <hr />
                    </div>
                }
                <div className="clearfix" />

                {props.roomLoader ? 
                    <div id="rooms"><h2>Available Rooms</h2><div className="loader"></div></div> :
                    <div id="rooms">
                        <h2>Available Rooms</h2>
                        {roomsResults && roomsResults.map((results, resultIndex) => {
                            return (
                                <div key={resultIndex} className="row room-group">
                                    <div className="col col-md-6 parent vertical-block-center">
                                        <div className="room-titles">
                                            {results[0].roomsResults && results[0].roomsResults.map((room, roomIndex) => {
                                                return (
                                                    <div key={roomIndex} className="room">
                                                        <span><b>{room.name}</b> ({room.mealType}) - </span>
                                                        {props.userInfo.isLogged && 
                                                            <span>{props.currencySign}{props.rates && Number((room.price * props.rates[ROOMS_XML_CURRENCY][props.paymentInfo.currency]) / props.nights).toFixed(2)} </span>
                                                        }
                                                        <span>
                                                            {props.userInfo.isLogged && '('}
                                                            <b>{Number((room.price / props.nights) / props.locRate).toFixed(2)} LOC</b>
                                                            {props.userInfo.isLogged && ')'} / night
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="col col-md-3">
                                        <div className="book-details vertical-block-center">
                                            <span className="price-details">
                                                <span><b>{props.nights} {props.nights === 1 ? 'night: ' : 'nights: '}</b></span>
                                                {props.userInfo.isLogged && 
                                                    <span>{props.currencySign}{props.rates && Number(getTotalPrice(results[0].roomsResults) * props.rates[ROOMS_XML_CURRENCY][props.paymentInfo.currency]).toFixed(2) } (</span>
                                                }
                                                <span><b>{ Number(getTotalPrice(results[0].roomsResults) / props.locRate).toFixed(2) } LOC{props.userInfo.isLogged ? ')' : ''}</b></span>
                                            </span>
                                            
                                        </div>
                                    </div>
                                    <div className="col col-md-3 content-center">
                                        { getButton(resultIndex) }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }
                <div className="clearfix" />

                <div id="map">
                    <h2>Location</h2>
                    <iframe title="location" src={`https://maps.google.com/maps?q=${props.data.latitude},${props.data.longitude}&z=15&output=embed`}
                        width="100%" height="400" frameBorder="0" style={{ border: 0 }} />
                    <hr />
                </div>
                <div className="clearfix" />
            </div>
            <div className="clearfix"></div>
        </div>
    );
}

HomeDetailsInfoSection.propTypes = {
    data: PropTypes.object,
    locRate: PropTypes.number,
    showLoginModal: PropTypes.bool,
    isLogged: PropTypes.bool,
    userInfo: PropTypes.object,
    nights: PropTypes.number,
    onApply: PropTypes.func,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    loading: PropTypes.bool,
    descriptionsAccessInfo: PropTypes.string,
    match: PropTypes.object,
    isShownContactHostModal: PropTypes.bool,
    closeModal: PropTypes.func,
    sendMessageToHost: PropTypes.func,
    allEvents: PropTypes.array,
    prices: PropTypes.array,
    openModal: PropTypes.func,
    descriptionText: PropTypes.string
};

export default withRouter(connect(mapStateToProps)(HomeDetailsInfoSection));

function mapStateToProps(state) {
    const { userInfo, paymentInfo } = state;
    return {
        userInfo,
        paymentInfo
    };
}