import PropTypes from 'prop-types';
import React from 'react';
import filterListings from '../../../actions/filterListings';
import { Config } from '../../../config';

export default class ListingRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPublishing: false
    };

    this.filterListings = filterListings.bind(this);
    this.renderThumbnail = this.renderThumbnail.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ isPublishing: false });
  }

  renderThumbnail() {
    let thumbnailURL = this.props.listing.thumbnail;
    if (thumbnailURL.indexOf('fantasian') === -1) {
      thumbnailURL = `${Config.getValue('imgHost')}${this.props.listing.thumbnail}`;
    }

    return (
      <span className="session-nav-user-thumb"><img src={thumbnailURL} alt="listing-thumbnail" /></span>
    );
  }

  render() {
    return (
      <div key={this.props.listing.id} className="row reservation-box">
        <div className="col-md-12">
          <div className="col-md-1">
            <div className="reservation-image-box">
              { this.renderThumbnail() }
            </div>
          </div>
          <div className="col-md-4">
            <span><a href={`/homes/listings/${this.props.listing.id}`}>{this.props.listing.name}</a></span>
          </div>
          <div className="col-md-2">
            <span>{this.props.listing.defaultDailyPrice}</span>
          </div>
          <div className="col-md-3">
            {this.state.isPublishing ?
              <div className="loader" style={{ width: 110 }}></div> :
              <div><a className={this.props.actionClass}
                onClick={() => {
                  this.setState({ isPublishing: true });
                  this.props.updateListingStatus(this.props.listing.id);
                }}>{this.props.action}</a>
                &nbsp;
              {this.props.canDelete &&
                  <a className="btn btn-danger"
                    onClick={() => this.props.handleDeleteListing(this.props.listing.id, this.props.listing.name)}>
                    Delete
                  </a>
              }
              </div>
            }
          </div>
          <div className="col-md-2">
            <a className="btn btn-info" onClick={() => this.props.openModal(this.props.listing.id)}>Contact
                            host</a>
          </div>
        </div>
      </div>
    );
  }
}

ListingRow.propTypes = {
  listing: PropTypes.object,
  canDelete: PropTypes.bool,
  updateListingStatus: PropTypes.func,
  action: PropTypes.string,
  actionClass: PropTypes.string,
  contactHost: PropTypes.func,
  openModal: PropTypes.func,
  handleDeleteListing: PropTypes.func
};