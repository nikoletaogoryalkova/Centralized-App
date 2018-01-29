import React from 'react';
import { NavLink } from 'react-router-dom';

export default function CreateListingGuestSettingsAside() {
    return (
        <div>
            <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/houserules">House Rules</NavLink></div>
            <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/checking">Check-in / Check-out</NavLink></div>
            <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/price">Price</NavLink></div>
        </div>
    );
}