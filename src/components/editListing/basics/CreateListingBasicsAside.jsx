import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class CreateListingAside extends React.Component {
    render() {
        return (
            <div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/edit/placetype">Place Type</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/edit/accommodation">Accommodation</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/edit/facilities">Facilities</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/edit/safetyamenities">Safety amenities</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/edit/location">Location</NavLink></div>
            </div>
        )
    }
}

export default withRouter(CreateListingAside);