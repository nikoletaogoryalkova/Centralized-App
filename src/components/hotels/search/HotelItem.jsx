import { Link, withRouter } from 'react-router-dom';

import ListingItemPictureCarousel from '../../common/listing/ListingItemPictureCarousel';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Config } from '../../../config.js';

function HotelItem(props) {
    const locRate = props.locRate;
    const { currency, currencySign } = props.paymentInfo;
    const { currency_code, userCurrencyPrice, locCurrencyPrice, id, name, description, photos, price} = props.listing;
    const locPrice = (price / locRate).toFixed(2);
    const pictures = photos.map(url => { return {thumbnail: `${Config.getValue('imgHost')}${url}` }; });
    return (
        <div className="list-hotel">
            <div className="list-image">
                <ListingItemPictureCarousel listingsType={'hotels'} pictures={pictures} id={id} />
            </div>
            <div className="list-content">
                <h2><Link to={`/hotels/listings/${id}${props.location.search}`}>{name}</Link></h2>
                <div className="clearfix"></div>
                <div className="list-hotel-text">
                    {description.substr(0, 300)}...
                </div>
            </div>
            <div className="list-price">
                <div className="list-hotel-price-bgr">Price for 1 night</div>
                {props.userInfo.isLogged && <div className="list-hotel-price-curency">{currencySign} {price}</div>}
                <div className="list-hotel-price-loc">(LOC {locPrice})</div>
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
    const { paymentInfo, userInfo } = state;
    return {
        paymentInfo,
        userInfo
    };
}