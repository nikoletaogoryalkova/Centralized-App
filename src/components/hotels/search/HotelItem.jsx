import { Link, withRouter } from 'react-router-dom';

import ListingItemPictureCarousel from '../../common/listing/ListingItemPictureCarousel';
import ListingItemRatingBox from '../../common/listing/ListingItemRatingBox';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function HotelItem(props) {
    const { currency, currencySign, locRate } = props.paymentInfo;
    const { currency_code, userCurrencyPrice, locCurrencyPrice, id, name, descriptions, pictures} = props.listing;

    return (
        <div className="list-hotel">
            <div className="list-image">
                Pictures
                <ListingItemPictureCarousel pictures={pictures} id={id} />
            </div>
            <div className="list-content">
                <h2><Link to={`/hotels/listings/${id}${props.location.search}`}>{name}</Link></h2>
                {/* <ListingItemRatingBox rating={averageRating} reviewsCount={reviewsCount} /> */}
                <div className="clearfix"></div>
                {/* <p>{cityName}, {countryName}</p> */}
                <div className="list-hotel-text">
                    {descriptions.general.substr(0, 190)}...
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
                <div className="list-hotel-price-curency">{currencySign}{userCurrencyPrice}</div>
                <div className="list-hotel-price-loc">(LOC {locCurrencyPrice})</div>
                <Link to={`/hotels/listings/${id}${props.location.search}`} className="list-hotel-price-button btn btn-primary">Book now</Link>
            </div>
            <div className="clearfix"></div>
        </div>
    );
}

HotelItem.propTypes = {
    listing: PropTypes.object,
    location: PropTypes.object,

    // start Redux props
    dispatch: PropTypes.func,
    paymentInfo: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(HotelItem));

function mapStateToProps(state) {
    const { paymentInfo } = state;
    return {
        paymentInfo
    };
}