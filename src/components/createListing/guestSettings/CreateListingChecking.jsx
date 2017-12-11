import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingGuestSettingsAside from './CreateListingGuestSettingsAside';

export default class CreateListingChecking extends React.Component {
    render() {
        return (
            <div>
                <CreateListingGuestSettingsAside />
                <h1>Checking</h1>
                <br/>
                <NavLink to="/listings/create/houserules" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/cancellation" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}