import { Config } from '../../../config.js';
import { Link } from 'react-router-dom';
import ListingItemPictureCarousel from './ListingItemPictureCarousel';
import ListingItemRatingBox from './ListingItemRatingBox';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class PopularListingItem extends React.Component {
  render() {
    const { listingsType } = this.props;
    let listingPrice;
    let pictures;
    let rating;
    if (listingsType === 'homes') {
      listingPrice = (this.props.listing.prices) && this.props.paymentInfo.currency === this.props.listing.currencyCode ? parseInt(this.props.listing.defaultDailyPrice, 10).toFixed(2) : parseInt(this.props.listing.prices[this.props.paymentInfo.currency], 10).toFixed(2);
      pictures = this.props.listing.pictures;

      if (typeof pictures === 'string') {
        pictures = JSON.parse(pictures);
      }

      pictures = pictures.map(x => { return { thumbnail: Config.getValue('imgHost') + x.thumbnail }; });
      rating = this.props.listing.averageRating;
    } else if (listingsType === 'hotels') {
      listingPrice = 0.0;
      pictures = this.props.listing.hotelPhotos.map(x => { return { thumbnail: 'http://roomsxml.com' + x.externalThumbnailUrl }; });
      rating = this.props.listing.star;
    }

    return (
      <div className="item active">
        <div className="list-property-small">
          <div className="list-property-pictures">
            <ListingItemPictureCarousel
              pictures={pictures}
              id={this.props.listing.id}
              listingsType={this.props.listingsType}
            />
          </div>
          <div className="popular-list-data">
            <h4>
              <Link to={`/${listingsType}/listings/${this.props.listing.id}?startDate=${moment(new Date(new Date().setHours(24)), 'DD/MM/YYYY').format('DD/MM/YYYY')}&endDate=${moment(new Date(new Date().setHours(48)), 'DD/MM/YYYY').format('DD/MM/YYYY')}&rooms=%5B%7B"adults":1,"children":%5B%5D%7D%5D`}>{this.props.listing.name.substr(0, 35)}{this.props.listing.name.length > 35 ? '...' : ''}</Link>
            </h4>
            <ListingItemRatingBox
              rating={rating}
            />
          </div>
          <div className="list-property-price">{this.props.paymentInfo.currencySign}{listingPrice} <span>(LOC {(listingPrice / this.props.paymentInfo.locRate).toFixed(2)})</span></div>
          <div className="clearfix">
          </div>
        </div>
      </div>);
  }
}

PopularListingItem.propTypes = {
  listing: PropTypes.object,
  listingsType: PropTypes.string,

  // start Redux props
  dispatch: PropTypes.func,
  paymentInfo: PropTypes.object
};

export default connect(mapStateToProps)(PopularListingItem);

function mapStateToProps(state) {
  const { paymentInfo } = state;
  return {
    paymentInfo
  };
}