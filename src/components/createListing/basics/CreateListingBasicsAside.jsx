import React from 'react';
import { withRouter, NavLink, Switch, Route } from 'react-router-dom';

class CreateListingAside extends React.Component {
    render() {
        return (
            <div className="col-md-3">
                <div>
                    <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/placetype">Place Type</NavLink></div>
                    <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/accommodation">Accommodation</NavLink></div>
                    <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/facilities">Facilities</NavLink></div>
                    <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/safetyamenities">Safety amenities</NavLink></div>
                    <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/location">Location</NavLink></div>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateListingAside);