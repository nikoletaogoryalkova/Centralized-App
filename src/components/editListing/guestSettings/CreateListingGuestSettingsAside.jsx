import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class CreateListingGuestSettingsAside extends React.Component {
    render() {
        return (
            <div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/edit/houserules">House Rules</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/edit/checking">Check-in / Check-out</NavLink></div>
                {/* <div className="host-step"><NavLink exact activeClassName="active" to="/listings/edit/cancellation">Cancellation</NavLink></div> */}
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/edit/price">Price</NavLink></div>
            </div>
        )
    }
}

export default withRouter(CreateListingGuestSettingsAside);