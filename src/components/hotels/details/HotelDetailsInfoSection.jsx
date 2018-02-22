import PropTypes from 'prop-types';
import HotelDetailsAmenityColumn from './HotelDetailsAmenityColumn';
import HotelDetailsReviewBox from './HotelDetailsReviewBox';
import React from 'react';
import { withRouter } from 'react-router-dom';

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

    const allAmenities = props.data.amenities;
    const mostPopularFacilities = allAmenities.slice(0, 5);
    const amenities = getAmenities(allAmenities.slice(5));
    const street = props.data.additionalInfo.mainAddress;
    const city = props.data.city.name;
    const country = props.data.region.country.name;
    
    return (
        <div className="hotel-content" id="overview">
            <h1> {props.data.name} </h1>
            <div className="clearfix" />
            <p>{street}, {city}, {country}</p>
            <div className="list-hotel-description">
                <h2>Description</h2>
                <hr />
                {props.data.descriptions.filter(x => x.type === 'PropertyInformation')[0].text}
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
    locRate: PropTypes.string,
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

export default withRouter(HomeDetailsInfoSection);