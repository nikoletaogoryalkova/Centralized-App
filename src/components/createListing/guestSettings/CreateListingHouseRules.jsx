import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingGuestSettingsAside from './CreateListingGuestSettingsAside';

export default class CreateListingHouseRules extends React.Component {
    render() {
        return (
            <div>
                <CreateListingGuestSettingsAside />
                <h1>House Rules</h1>
                <br/>
                <NavLink to="/listings/create/photos" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/checking" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}