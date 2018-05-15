import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../../styles/css/components/search-result-component.css';
import { Config } from '../../../config';
import { ROOMS_XML_CURRENCY } from '../../../constants/currencies.js';
import ReactHtmlParser from 'react-html-parser';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../../../styles/css/components/hotels_search/results_holder__hotels.css';

let slider = null;

function Result(props) {
  const calculateStars = (ratingNumber) => {
    let starsElements = [];
    let rating = Math.round(ratingNumber);
    for (let i = 0; i < rating; i++) {
      starsElements.push(<span key={i} className="full-star"></span>);
    }

    return starsElements;
  };

  const leftButton = <button></button>;
  const rightButton = <button></button>;

  let { id, name, description, photos, price, stars } = props.hotel;
  const pictures = photos.slice(0, 3).map(url => { return { thumbnail: `${Config.getValue('imgHost')}${url}` }; });
  const { locRate, rates } = props;
  const { currencySign } = props.paymentInfo;
  const locPrice = ((price / locRate) / props.nights).toFixed(2);
  const priceInSelectedCurrency = rates && ((price * (rates[ROOMS_XML_CURRENCY][props.paymentInfo.currency])) / props.nights).toFixed(2);

  description = description.substr(0, 250);

  if (pictures.length < 1) {
    pictures.push({ thumbnail: `${Config.getValue('imgHost')}/listings/images/default.png` });
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: rightButton,
    prevArrow: leftButton
  };
  {/* <ReactBootstrapCarousel
            animation={true}
            autoplay={false}
            leftIcon={leftButton}
            rightIcon={rightButton}
            indicators={false}
            className="carousel-fade"
            onSelect={() => console.log('click')}>
            {pictures.map((item, i) => {
              return (
                <Link to={`/hotels/listings/${id}${props.location.search}`} key={i}>
                  <div key={i} style={{ backgroundImage: 'url(' + item.thumbnail + ')' }}>
                  </div>
                </Link>
              );
            })}
          </ReactBootstrapCarousel> */}


  return (


    <div className="result" >
      <div className="result-images">
        {pictures &&

          <Slider ref={s => slider = s}
            {...settings}>
            {pictures.map((picture, i) => {
              return (
                <div key={i}>
                  <Link to={`/hotels/listings/${id}${props.location.search}`} key={i}>
                    <div style={{ backgroundImage: 'url(' + picture.thumbnail + ')' }}>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
        }
      </div>
      <div className="result-content">
        <h4><Link to={`/hotels/listings/${id}${props.location.search}`}>{name}</Link></h4>
        <div className="rating">
          <span>Rating: </span>
          <div className="rating-holder">
            {/* <input type="radio" value="5" name="rating1.0" id="star20" />
            <label htmlFor="star20" title="5 stars"><span className="fa"></span></label>
            <input type="radio" value="4" name="rating1.0" id="star19" checked />
            <label htmlFor="star19" title="4 stars"><span className="fa"></span></label>
            <input type="radio" value="3" name="rating1.0" id="star18" />
            <label htmlFor="star18" title="3 stars"><span className="fa"></span></label>
            <input type="radio" value="2" name="rating1.0" id="star17" />
            <label htmlFor="star17" title="2 stars"><span className="fa"></span></label>
            <input type="radio" value="1" name="rating1.0" id="star16" />
            <label htmlFor="star16" title="1 star"><span className="fa"></span></label> */}
            {calculateStars(stars)}
          </div>
          {/* <span>73 Reviews</span> */}
        </div>
        {/* <div className="result-homes-features">
          <ul>
            <li>Entire apartment</li>
            <li>1 bedroom</li>
            <li>1 bed</li>
            <li>1.5 baths</li>
          </ul>
        </div> */}
        <p>{ReactHtmlParser(description + (description.length < 250 ? '' : '...'))}</p>
      </div>
      <div className="result-pricing">
        <div className="price-for">Price for 1 night</div>
        <span className="price">{props.userInfo.isLogged && `${currencySign} ${priceInSelectedCurrency}`}</span>
        <span>(LOC {locPrice})</span>
        <Link className="btn" to={`/hotels/listings/${id}${props.location.search}`}>Book now</Link>
      </div>
    </div >
  );
}

Result.propTypes = {
  hotel: PropTypes.object,
  nights: PropTypes.number,
  locRate: PropTypes.number,
  rates: PropTypes.any,

  // Router props
  location: PropTypes.object,

  // Redux props
  paymentInfo: PropTypes.object,
  userInfo: PropTypes.object
};

function mapStateToProps(state) {
  const { paymentInfo, userInfo } = state;
  return {
    paymentInfo,
    userInfo
  };
}

export default withRouter(connect(mapStateToProps)(Result));