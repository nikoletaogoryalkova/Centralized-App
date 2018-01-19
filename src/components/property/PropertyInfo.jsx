import React from 'react';
import { withRouter } from 'react-router-dom';

import ListingRating from '../listings/ListingRating';
import PropertyAmenityColumn from './PropertyAmenityColumn';
import PropertyReview from './PropertyReview';
import PropertyReservation from './PropertyReservation';

import PropertyCalendar from "./PropertyCalendar";

class PropertyInfo extends React.Component {
    getAmenities(amenities) {
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
    }

    render() {
        const allAmenities = this.props.data.amenities;
        const calendar = this.props.calendar;
        const mostPopularFacilities = allAmenities.slice(0, 5);
        const amenities = this.getAmenities(allAmenities.slice(5));
        const { street, city, country } = this.props.data;
        if (calendar === null) {
            return <div>Loading...</div>
        }
        return (
            <section id="hotel-info">
                <div className="container">
                    <div className="hotel-content" id="overview">

                        <PropertyCalendar allEvents={this.props.allEvents} prices={this.props.prices} />
                        <h1> {this.props.data.name} </h1>
                        <ListingRating rating={this.props.data.averageRating} reviewsCount={this.props.data.reviews.length} />
                        
                        <div className="clearfix" />
                        <p>{street}, {city.name}, {country.name}</p>
                        <div className="list-hotel-description">
                            {this.props.descriptionText}
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
                                )
                            })}
                            <div className="clearfix" />
                        </div>
                        <div className="clearfix" />

                        <div className="hotel-extras">
                            <div className="row">
                                <PropertyAmenityColumn amenities={amenities[0]} />
                                <PropertyAmenityColumn amenities={amenities[1]} />
                                <PropertyAmenityColumn amenities={amenities[2]} />
                            </div>
                            <div className="clearfix" />

                            {this.props.descriptionsAccessInfo &&
                                <div id="hotel-rules">
                                    <h2>Access info</h2>
                                    <p>{this.props.data.descriptionsAccessInfo}</p>
                                    <hr />
                                </div>
                            }
                            <div className="clearfix" />

                            {this.props.data.reviews && this.props.data.reviews.length > 0 &&
                                <div id="reviews">
                                    <h2>User Rating &amp; Reviews</h2>
                                    {this.props.data.reviews.map((item, i) => {
                                        return <PropertyReview key={i} rating={item.average} reviewText={item.comments} />
                                    })}
                                    <hr />
                                </div>
                            }
                            <div className="clearfix" />

                            <div id="map">
                                <h2>Location</h2>
                                <iframe title="location" src={`https://maps.google.com/maps?q=${this.props.data.longitude},${this.props.data.latitude}&z=15&output=embed`}
                                    width="100%" height="400" frameBorder="0" style={{ border: 0 }} />
                                <hr />
                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>
                    <PropertyReservation locRate={this.props.locRate}
                                         showLoginModal={this.props.showLoginModal}
                                         isLogged={this.props.isLogged}
                                         userInfo={this.props.userInfo}
                                         calendar={calendar}
                                         nights={this.props.nights}
                                         onApply={this.props.onApply}
                                         startDate={this.props.startDate}
                                         endDate={this.props.endDate}
                                         listing={this.props.data}
                                         currency={this.props.currency}
                                         currencySign={this.props.currencySign} />
                    <div className="clearfix"></div>
                </div>
            </section>
        )
    }
}

export default withRouter(PropertyInfo);