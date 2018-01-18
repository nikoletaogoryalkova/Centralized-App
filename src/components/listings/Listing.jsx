import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import ListingPictures from '../listings/ListingPictures';
import ListingRating from './ListingRating';

class Listing extends React.Component {
    render() {
        const { street, city, country } = this.props.listing;
        const listingPrice = (this.props.listing.prices) && this.props.currency === this.props.listing.currencyCode ? parseInt(this.props.listing.defaultDailyPrice, 10).toFixed() : parseInt(this.props.listing.prices[this.props.currency], 10).toFixed(2);        
        const listingPriceEur = this.props.listing.currencyCode === "EUR" ? this.props.defaultDailyPrice : this.props.listing.prices["EUR"];
        return (
            <div className="list-hotel">
                <div className="list-image">
                    <ListingPictures pictures={this.props.listing.pictures} id={this.props.listing.id} />
                </div>
                <div className="list-content">
                    <h2><Link to={`/listings/${this.props.listing.id}${this.props.location.search}`}>{this.props.listing.name}</Link></h2>
                    <ListingRating rating={this.props.listing.averageRating} reviewsCount={this.props.listing.reviewsCount} />
                    <div className="clearfix"></div>
                    <p>{city.name}, {country.name}</p>
                    <div className="list-hotel-text">
                        {this.props.listing.description.substr(0, 190)}...
                    </div>
                    <div className="list-hotel-comfort">
                        <div className="icon-hotel-4"></div>
                        <div className="icon-hotel-3"></div>
                        <div className="icon-hotel-2"></div>
                        <div className="icon-hotel-1"></div>
                    </div>
                </div>
                <div className="list-price">
                    <div className="list-hotel-price-bgr">Price for 1 night</div>
                    <div className="list-hotel-price-curency">{this.props.currencySign}{listingPrice}</div>
                    <div className="list-hotel-price-loc">(LOC {(listingPriceEur / this.props.locRate).toFixed(2)})</div>
                    <Link to={`/listings/${this.props.listing.id}${this.props.location.search}`} className="list-hotel-price-button btn btn-primary">Book now</Link>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default withRouter(Listing);