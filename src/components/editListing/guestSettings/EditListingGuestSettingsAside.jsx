import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class EditListingGuestSettingsAside extends React.Component {
    render() {
        const listingId = this.props.listingId;
        return (
            <div>
                <div className="host-step"><NavLink exact activeClassName="active" to={`/profile/listings/edit/houserules/${listingId}`}>House Rules</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to={`/profile/listings/edit/checking/${listingId}`}>Check-in / Check-out</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to={`/profile/listings/edit/price/${listingId}`}>Price</NavLink></div>
            </div>
        )
    }
}

export default withRouter(EditListingGuestSettingsAside);