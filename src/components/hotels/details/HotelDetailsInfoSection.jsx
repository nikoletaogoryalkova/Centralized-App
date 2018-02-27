// import ContactHostModal from '../../common/modals/ContactHostModal';
import PropTypes from 'prop-types';
// import HotelDetailsAmenityColumn from './HotelDetailsAmenityColumn';
// import HotelDetailsCalendar from './HotelDetailsCalendar';
import HotelReservationPanel from './HotelReservationPanel';
// import HotelDetailsReviewBox from './HotelDetailsReviewBox';
import React from 'react';
import { withRouter } from 'react-router-dom';

function HotelDetailsInfoSection(props) {
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
    const calendar = props.calendar;
    const mostPopularFacilities = allAmenities.slice(0, 5);
    console.log('mostPopularFacilities:',mostPopularFacilities);
    // const amenities = getAmenities(allAmenities.slice(5));
    const { street, city, country } = props.data;
    if (calendar === null) {
        return <div>Loading...</div>;
    }
    return (
        <section id="hotel-info">
            <div className="container">
                <div className="hotel-content" id="overview">
                    {/*<ContactHostModal id={props.match.params.id} isActive={props.isShownContactHostModal} closeModal={props.closeModal} sendMessageToHost={props.sendMessageToHost} />*/}

                    <h1> {props.data.name} </h1>
                    <div className="clearfix" />
                    <p>{street}, {city.name}, {country.name}</p>
                    {/*<button className="btn btn-primary" onClick={props.openModal}>Contact Host</button>*/}

                    {/*<HotelDetailsCalendar*/}
                        {/*onApply={props.onApply}*/}
                        {/*startDate={props.startDate}*/}
                        {/*endDate={props.endDate}*/}
                        {/*allEvents={props.allEvents}*/}
                        {/*prices={props.prices} />*/}

                    <div className="list-hotel-description">
                        <h2>Description</h2>
                        <hr />
                        {props.data.descriptionText}
                    </div>

                    <div id="facilities">
                        <h2>Facilities</h2>
                        <hr />
                        <h3>Most Popular Facilities</h3>
                        {mostPopularFacilities.map((item, i) => {
                            return (
                                <div key={i} className="icon-facilities">
                                    <span className="icon-image" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><b>{item.name}</b></span>
                                </div>
                            );
                        })}
                        <div className="clearfix" />
                    </div>
                    <div className="clearfix" />

                    <div className="hotel-extras">
                        <div className="row">
                            {/*<HotelDetailsAmenityColumn amenities={amenities[0]} />*/}
                            {/*<HotelDetailsAmenityColumn amenities={amenities[1]} />*/}
                            {/*<HotelDetailsAmenityColumn amenities={amenities[2]} />*/}
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
                                {/*{props.data.reviews.map((item, i) => {*/}
                                    {/*return (*/}
                                        {/*<HotelDetailsReviewBox */}
                                            {/*key={i} */}
                                            {/*rating={item.average} */}
                                            {/*reviewText={item.comments} */}
                                        {/*/>*/}
                                    {/*);*/}
                                {/*})}*/}
                                <hr />
                            </div>
                        }
                        <div className="clearfix" />

                        <div id="map">
                            <h2>Location</h2>
                            <iframe title="location" src={`https://maps.google.com/maps?q=${props.data.longitude},${props.data.latitude}&z=15&output=embed`}
                                width="100%" height="400" frameBorder="0" style={{ border: 0 }} />
                            <hr />
                        </div>
                        <div className="clearfix" />
                    </div>
                </div>
                <HotelReservationPanel
                    locRate={props.locRate}
                    showLoginModal={props.showLoginModal}
                    isLogged={props.isLogged}
                    calendar={calendar}
                    nights={props.nights}
                    onApply={props.onApply}
                    startDate={props.startDate}
                    endDate={props.endDate}
                    listing={props.data}
                    loading={props.loading} />
                <div className="clearfix"></div>
            </div>
        </section>
    );
}

HotelDetailsInfoSection.propTypes = {
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
    calendar: PropTypes.array,
    descriptionText: PropTypes.string
};

export default withRouter(HotelDetailsInfoSection);