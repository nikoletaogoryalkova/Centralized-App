import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class CreateListingAside extends React.Component {
    render() {
        return (
            <div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/placetype">Place Type</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/accommodation">Accommodation</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/facilities">Facilities</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/safetyamenities">Safety amenities</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/location">Location</NavLink></div>
            </div>
        )
    }
}

export default withRouter(CreateListingAside);