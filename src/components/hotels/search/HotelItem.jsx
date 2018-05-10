import { Link, withRouter } from 'react-router-dom';

import ListingItemPictureCarousel from '../../common/listing/ListingItemPictureCarousel';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Config } from '../../../config.js';
import { ROOMS_XML_CURRENCY } from '../../../constants/currencies.js';

function HotelItem(props) {

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

  const { locRate, rates } = props;
  const { currencySign } = props.paymentInfo;
  const { id, name, description, photos, price, stars } = props.listing;

  const locPrice = ((price / locRate) / props.nights).toFixed(2);
  const priceInSelectedCurrency = rates && ((price * (rates[ROOMS_XML_CURRENCY][props.paymentInfo.currency])) / props.nights).toFixed(2);

  const pictures = photos.slice(0, 3).map(url => { return { thumbnail: `${Config.getValue('imgHost')}${url}` }; });

  return (
    <div className="list-hotel">
      <div className="list-image">
        <ListingItemPictureCarousel listingsType={'hotels'} pictures={pictures} id={id} />
      </div>
      <div className="list-content">
        <h2><Link to={`/hotels/listings/${id}${props.location.search}`}>{name}</Link></h2>
        <div className="list-hotel-rating">
          <div className="list-hotel-rating-stars">
            {calculateStars(stars)}
          </div>
        </div>
        <div className="clearfix"></div>
        <div className="list-hotel-text" dangerouslySetInnerHTML={{ __html: description.substr(0, 300) + '...' }}>
        </div>
      </div>
      <div className="list-price">
        <div className="list-hotel-price-bgr">Price for 1 night</div>
        <div className="list-hotel-price-curency">{props.userInfo.isLogged && `${currencySign} ${priceInSelectedCurrency}`}</div>
        <div className="list-hotel-price-loc">(LOC {locPrice})</div>
        <Link to={`/hotels/listings/${id}${props.location.search}`} className="list-hotel-price-button btn btn-primary">Book now</Link>
      </div>
      <div className="clearfix"></div>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(HotelItem));

function mapStateToProps(state) {
  const { paymentInfo, userInfo } = state;
  return {
    paymentInfo,
    userInfo
  };
}

HotelItem.propTypes = {
  listing: PropTypes.object,
  location: PropTypes.object,
  nights: PropTypes.number,
  locRate: PropTypes.number,
  rates: PropTypes.any,

  // start Redux props
  dispatch: PropTypes.func,
  paymentInfo: PropTypes.object,
  userInfo: PropTypes.object
};