import { Link } from 'react-router-dom';
import ListingItemPictureCarousel from './ListingItemPictureCarousel';
import ListingItemRatingBox from './ListingItemRatingBox';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class PopularListingItem extends React.Component {
    render() {
        const { listingType } = this.props;
        const listingPrice = (this.props.listing.prices) && this.props.paymentInfo.currency === this.props.listing.currencyCode ? parseInt(this.props.listing.defaultDailyPrice, 10).toFixed(2) : parseInt(this.props.listing.prices[this.props.paymentInfo.currency], 10).toFixed(2);

        return (
            <div className="item active">
                <div className="list-property-small">
                    <div className="list-property-pictures">
                        <ListingItemPictureCarousel 
                            pictures={this.props.listing.pictures} 
                            id={this.props.listing.id}
                            listingType={this.props.listingType} 
                        />
                    </div>
                    <div className="popular-list-data">
                        <h3><Link to={`${listingType}/listings/${this.props.listing.id}`}>{this.props.listing.name}</Link></h3>
                        <ListingItemRatingBox 
                            rating={this.props.listing.averageRating} 
                            reviewsCount={this.props.listing.reviewsCount} 
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
    listingType: PropTypes.string,

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