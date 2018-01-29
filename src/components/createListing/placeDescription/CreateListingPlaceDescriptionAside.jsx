import React from 'react';
import { NavLink } from 'react-router-dom';

export default function CreateListingPlaceDescriptionAside() {
    return (
        <div>
            <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/description">Description</NavLink></div>
            <div className="host-step"><NavLink exact activeClassName="active" to="/profile/listings/create/photos">Photos</NavLink></div>
        </div>
    );
}