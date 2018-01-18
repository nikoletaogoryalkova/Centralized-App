import React from 'react';
import { NavLink } from 'react-router-dom';

import EditListingGuestSettingsAside from './EditListingGuestSettingsAside';
import NavEditListing from '../NavEditListing';

export default class EditListingCancellation extends React.Component {
    render() {
        return (
            <div>
                <NavEditListing progress='100%' />
                <EditListingGuestSettingsAside listingId={listingId} />
                <div className="col-md-9">
                    <div className="form-group">
                        <h2>When your guest can cancel their reservation?</h2>
                        <hr/>
                    </div>
                </div>
                <NavLink to="/profile/listings/edit/checking" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/profile/listings/edit/price" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}