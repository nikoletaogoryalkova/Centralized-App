import React from 'react';
import { NavLink } from 'react-router-dom';

export default function CreateListingAside() {
    return (
        <div>
            <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/placetype">Place Type</NavLink></div>
            <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/accommodation">Accommodation</NavLink></div>
            <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/facilities">Facilities</NavLink></div>
            <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/safetyamenities">Safety amenities</NavLink></div>
            <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/location">Location</NavLink></div>
        </div>
    );
}