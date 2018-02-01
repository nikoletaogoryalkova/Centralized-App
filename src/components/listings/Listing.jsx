import { Link, withRouter } from 'react-router-dom';

import ListingPictures from '../listings/ListingPictures';
import ListingRating from './ListingRating';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Listing extends React.Component {
    render() {
        const { cityName, countryName, prices, currency_code, defaultDailyPrice, pictures, id, name, reviewsCount, averageRating, description } = this.props.listing;
        const listingPrice = (prices) && this.props.paymentInfo.currency === currency_code ? parseInt(defaultDailyPrice, 10).toFixed() : parseInt(prices[this.props.paymentInfo.currency], 10).toFixed(2);
        const listingPriceEur = currency_code === 'EUR' ? this.props.listing.defaultDailyPrice : prices['EUR'];
        return (
            <div className="list-hotel">
                <div className="list-image">
                    <ListingPictures pictures={pictures} id={id} />
                </div>
                <div className="list-content">
                    <h2><Link to={`/listings/${this.props.listing.id}${this.props.location.search}`}>{name}</Link></h2>
                    <ListingRating rating={averageRating} reviewsCount={reviewsCount} />
                    <div className="clearfix"></div>
                    <p>{cityName}, {countryName}</p>
                    <div className="list-hotel-text">
                        {description.substr(0, 190)}...
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
                    <div className="list-hotel-price-curency">{this.props.paymentInfo.currencySign}{listingPrice}</div>
                    <div className="list-hotel-price-loc">(LOC {(listingPriceEur / this.props.locRate).toFixed(2)})</div>
                    <Link to={`/listings/${id}${this.props.location.search}`} className="list-hotel-price-button btn btn-primary">Book now</Link>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}

Listing.propTypes = {
    listing: PropTypes.object,
    location: PropTypes.object,
    locRate: PropTypes.string,

    // start Redux props
    dispatch: PropTypes.func,
    paymentInfo: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(Listing));

function mapStateToProps(state) {
    const { paymentInfo } = state;
    return {
        paymentInfo
    };
}