import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class EditListingPlaceDescriptionAside extends React.Component {
    render() {
        const listingId = this.props.listingId;
        return (
            <div>
                <div className="host-step"><NavLink exact activeClassName="active" to={`/profile/listings/edit/description/${listingId}`}>Description</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to={`/profile/listings/edit/photos/${listingId}`}>Photos</NavLink></div>
            </div>
        )
    }
}

export default withRouter(EditListingPlaceDescriptionAside);