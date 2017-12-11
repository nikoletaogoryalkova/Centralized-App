import React from 'react';
import { withRouter, NavLink, Switch, Route } from 'react-router-dom';

class CreateListingGuestSettingsAside extends React.Component {
    render() {
        return (
            <div className="col-md-3">
                <div>
                    <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/houserules">House Rules</NavLink></div>
                    <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/checking">Check-in / Check-out</NavLink></div>
                    <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/cancellation">Cancellation</NavLink></div>
                    <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/price">Price</NavLink></div>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateListingGuestSettingsAside);