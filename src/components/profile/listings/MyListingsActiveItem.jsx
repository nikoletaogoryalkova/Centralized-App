import { Link } from 'react-router-dom';
import ListingItemRatingBox from '../../../components/common/listing/ListingItemRatingBox';
import PropTypes from 'prop-types';
import React from 'react';
import DeletionModal from '../../common/modals/DeletionModal';
import { Config } from '../../../config';

export default class MyListingsActiveItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleting: false,
      deletingId: -1,
      deletingName: '',
      sending: false
    };

    this.onHide = this.onHide.bind(this);
    this.onOpen = this.onOpen.bind(this);
  }

  onHide() {
    this.setState(
      {
        isDeleting: false,
        deletingId: -1,
        deletingName: ''
      }
    );
  }

  onOpen(id, name) {
    console.log(id, name)
    this.setState(
      {
        isDeleting: true,
        deletingId: id,
        deletingName: name
      }
    );
  }

  render() {
    const listingStateBackgroundClass = this.props.state === 'active' ? '' : ' inactive';
    return (
      <div style={{ background: 'rgba(255,255,255, 0.8)' }}>
        <DeletionModal
          deletingName={this.state.deletingName}
          filterListings={this.props.filterListings}
          isActive={this.state.isDeleting}
          deletingId={this.state.deletingId}
          onHide={this.onHide}
          onOpen={this.onOpen}
        />
        <ul className={`profile-mylistings-active ${listingStateBackgroundClass}`}>
          <li className="toggle off"></li>
          <li className="thumb"><span
            style={{ backgroundImage: `url(${Config.getValue('imgHost') + this.props.listing.thumbnail})` }}></span></li>
          <li className="details">
            <Link to={'/homes/listings/' + this.props.listing.id}>{this.props.listing.name}</Link>
            <ListingItemRatingBox
              rating={this.props.listing.averageRating}
              reviewsCount={this.props.listing.reviewsCount}
            />
          </li>
          <li className="price">
            <span>{this.props.listing.defaultDailyPrice} {this.props.listing.currencyCode}</span>
          </li>
          <li className="edit">
            <Link to={`/profile/listings/edit/landing/${this.props.listing.id}`}>Edit Listing</Link>
          </li>
          <li className="calendar">
            {/* <input type="button" className="button" value="View Calendar"/> */}
            <Link to={'/profile/listings/calendar/' + this.props.listing.id}>View Calendar</Link>
          </li>
          <li className="remove" onClick={() => this.onOpen(this.props.listing.id, this.props.listing.name)}>
            <span></span>
          </li>
        </ul>
      </div>
    );
  }
}

MyListingsActiveItem.propTypes = {
  listing: PropTypes.object,
  state: PropTypes.string,
  filterListings: PropTypes.func
};