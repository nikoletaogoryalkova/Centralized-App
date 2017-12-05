import React from 'react';
import { withRouter } from 'react-router-dom';
import ListingRating from '../listings/ListingRating';
import PropertyReservation from './PropertyReservation';
import AmenityColumn from './AmenityColumn';

class HotelInfo extends React.Component {
    getAmenities(amenities) {
        const result = new Array(3);
        for (let i = 0; i < 3; i++) {
            result[i] = new Array(0);
        }

        for (let i = 0; i < amenities.length; i++){
            if (i % 3 === 0) {
                result[0].push(amenities[i]);
            } else if (i % 3 === 1) {
                result[1].push(amenities[i]);
            }else if (i % 3 === 2) {
                result[2].push(amenities[i]);
            }
        }

        return result;
    }

    render() {

        const allAmenities = this.props.data.amenities;
        const mostPopularFacilities = allAmenities.slice(0, 5);
        const amenities = this.getAmenities(allAmenities.slice(5));

        return (
            <section id="hotel-info">
                <div className="container">
                    <div className="hotel-content">
                        <h1> { this.props.data.name } </h1>
                        <ListingRating rating={this.props.data.averageRating} reviewsCount={this.props.data.reviews.length}/>
                        <div className="clearfix" />
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
                                        <span className="icon-image" style={{textAlign: 'center',display: 'flex', justifyContent: 'center', alignItems: 'center'}}><b>{item.name}</b></span>
                                    </div>
                                )
                            })}
                            <div className="clearfix" />
                        </div>
                        <div className="clearfix" />

                        <div className="hotel-extras">
                            <div className="row">
                                <AmenityColumn amenities={amenities[0]} />
                                <AmenityColumn amenities={amenities[1]} />
                                <AmenityColumn amenities={amenities[2]} />
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

                            <div id="reviews">
                                <h2>User Rating &amp; Reviews</h2>
                                <p>there are reviews from old version jquery. for now use royal algorithm</p>
                                <hr />
                            </div>
                            <div className="clearfix" />

                            <div id="location">
                                <h2>Location</h2>
                                <iframe title="location" src={`https://maps.google.com/maps?q=${this.props.data.longitude},${this.props.data.latitude}&z=15&output=embed`}
                                        width="100%" height="400" frameBorder="0" style={{border:0}} />
                                <hr />
                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>
                    <PropertyReservation />
                    <div className="clearfix"></div>
                </div>
            </section>
        )
    }
}

export default withRouter(HotelInfo);