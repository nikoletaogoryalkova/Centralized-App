import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingGuestSettingsAside from './CreateListingGuestSettingsAside';

export default class CreateListingCancellation extends React.Component {
    render() {
        return (
            <div>
                <CreateListingGuestSettingsAside />
                <div className="col-md-9">
                    <div className="form-group">
                        <h2>When your guest can cancel their reservation?</h2>
                        <hr/>
                    </div>
                </div>
                <NavLink to="/profile/listings/create/checking" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/profile/listings/create/price" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}