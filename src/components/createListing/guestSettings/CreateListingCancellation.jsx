import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingGuestSettingsAside from './CreateListingGuestSettingsAside';

export default class CreateListingCancellation extends React.Component {
    render() {
        return (
            <div>
                <CreateListingGuestSettingsAside />
                <h1>Cancellation</h1>
                <br/>
                <NavLink to="/listings/create/checking" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/price" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}