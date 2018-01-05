import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class CreateListingPlaceDescriptionAside extends React.Component {
    render() {
        return (
            <div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/edit/title">Title</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/edit/description">Description</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/edit/photos">Photos</NavLink></div>
            </div>
        )
    }
}

export default withRouter(CreateListingPlaceDescriptionAside);