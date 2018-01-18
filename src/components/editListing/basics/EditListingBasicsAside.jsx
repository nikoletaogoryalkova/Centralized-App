import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class EditListingAside extends React.Component {
    render() {
        const listingId = this.props.listingId;
        return (
            <div>
                <div className="host-step"><NavLink exact activeClassName="active" to={`/profile/listings/edit/placetype/${listingId}`}>Place Type</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to={`/profile/listings/edit/accommodation/${listingId}`}>Accommodation</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to={`/profile/listings/edit/facilities/${listingId}`}>Facilities</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to={`/profile/listings/edit/safetyamenities/${listingId}`}>Safety amenities</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to={`/profile/listings/edit/location/${listingId}`}>Location</NavLink></div>
            </div>
        )
    }
}

export default withRouter(EditListingAside);