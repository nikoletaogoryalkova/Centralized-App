import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class CreateListingPlaceDescriptionAside extends React.Component {
    render() {
        return (
            <div className="col-md-3">
                <div>
                    <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/title">Title</NavLink></div>
                    <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/description">Description</NavLink></div>
                    <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/photos">Photos</NavLink></div>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateListingPlaceDescriptionAside);