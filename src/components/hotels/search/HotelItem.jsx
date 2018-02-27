import { Link, withRouter } from 'react-router-dom';

import ListingItemPictureCarousel from '../../common/listing/ListingItemPictureCarousel';
import ListingItemRatingBox from '../../common/listing/ListingItemRatingBox';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function HotelItem(props) {
    const { /*currency, */currencySign, locRate } = props.paymentInfo;
    const { /*cityName, countryName, prices, currency_code, defaultDailyPrice, */pictures, id, name, reviewsCount, averageRating, descriptions } = props.listing;
    const listingPrice = props.listing.userCurrencyPrice/*(prices) && currency === currency_code ? parseInt(defaultDailyPrice, 10).toFixed() : parseInt(prices[currency], 10).toFixed(2)*/;

    return (
        <div className="list-hotel">
            <div className="list-image">
              { pictures.length > 0 ? <ListingItemPictureCarousel pictures={JSON.stringify(pictures)} id={id} /> : <div className='loader'></div>}
            </div>
            <div className="list-content">
                <h2><Link to={`/hotels/listings/${id}${props.location.search}`}>{name}</Link></h2>
                <ListingItemRatingBox rating={averageRating} reviewsCount={reviewsCount} />
                <div className="clearfix"></div>
                {/*<p>{cityName}, {countryName}</p>*/}
                <div className="list-hotel-text">
                    {descriptions && descriptions.general.length > 0 ? descriptions.general.substr(0, 190) + '...' : ''}
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
                <div className="list-hotel-price-curency">{currencySign}{listingPrice}</div>
                <div className="list-hotel-price-loc">(LOC {(listingPrice / locRate).toFixed(2)})</div>
                <Link to={`/hotels/listings/${id}${props.location.search}`} className="list-hotel-price-button btn btn-primary">Book now</Link>
            </div>
            <div className="clearfix"></div>
        </div>
    );
}

HotelItem.propTypes = {
    listing: PropTypes.object.isRequired,
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