import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { Config } from '../../../../config.js';

class MarkerInfoWindow extends Component {

  calculateStars(ratingNumber) {
    let starsElements = [];
    let rating = Math.round(ratingNumber);
    for (let i = 0; i < rating; i++) {
      starsElements.push(<span key={i} className="full-star"></span>);
    }

    return starsElements;
  }

  render() {
    const photoURL = `${Config.getValue('imgHost')}${this.props.hotel.photos[0]}`;
    const { id, name, stars } = this.props.hotel;
    const { isLogged, currencySign, fiatPrice, locPrice } = this.props;
    return (
      <div>
        <BrowserRouter>
          <Link to={`/hotels/listings/${id}${this.props.search}`}>
            <div className={'marker-hotel'}>
              <div className={'marker-hotel-thumbnail'} style={{ backgroundImage: 'url(' + photoURL + ')' }}></div>
              <div className={'marker-hotel-title'}>{name}</div>
              <div className="marker-hotel-price">
                {isLogged
                  ? `${currencySign} ${fiatPrice} (LOC ${locPrice}) / Night`
                  : `LOC ${locPrice} / Night`
                }
              </div>
              <div className="marker-hotel-rating">
                <div className="marker-hotel-rating-stars">
                  {this.calculateStars(stars)}
                </div>
              </div>
              <div className="marker-hotel-price-loc"></div>
            </div>
          </Link>
        </BrowserRouter>
      </div>
    );
  }
}

export default MarkerInfoWindow;