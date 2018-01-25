import PropTypes from 'prop-types';
import React from 'react';

export default class ListingRow extends React.Component {
    render() {
        return (
            <div key={this.props.listing.id} className="row reservation-box">
                <div className="col-md-12">
                    <div className="col-md-1">
                        <div className="reservation-image-box">
                            <span className="session-nav-user-thumb"><img src={this.props.listing.thumbnail} alt="listing-picture" /></span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <span><a href={`/listings/${this.props.listing.id}`}>{this.props.listing.name}</a></span>
                    </div>
                    <div className="col-md-2">
                        <span>{this.props.listing.defaultDailyPrice}</span>
                    </div>
                    <div className="col-md-3">
                        <a href="#" onClick={() => this.props.updateListingStatus(this.props.listing.id)}>{this.props.action}</a>
                    </div>
                    <div className="col-md-2">
                        <a href="#" onClick={() => this.props.openModal(this.props.listing.id)}>Contact host</a>
                    </div>
                </div>
            </div>
        );
    }
}

ListingRow.propTypes = {
    listing: PropTypes.object,
    updateListingStatus: PropTypes.func,
    action: PropTypes.string,
    contactHost: PropTypes.func,
    openModal: PropTypes.func
};