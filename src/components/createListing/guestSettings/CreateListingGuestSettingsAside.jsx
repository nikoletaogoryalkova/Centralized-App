import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class CreateListingGuestSettingsAside extends React.Component {
    render() {
        return (
            <div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/houserules">House Rules</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/checking">Check-in / Check-out</NavLink></div>
                {/* <div className="host-step"><NavLink exact activeClassName="active" to="/listings/create/cancellation">Cancellation</NavLink></div> */}
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/price">Price</NavLink></div>
            </div>
        )
    }
}

export default withRouter(CreateListingGuestSettingsAside);