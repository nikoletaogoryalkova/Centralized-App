import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingPlaceDescriptionAside from './CreateListingPlaceDescriptionAside';

export default class CreateListingTitle extends React.Component {
    render() {
        return (
            <div>
                <CreateListingPlaceDescriptionAside />
                <div className="reservation-hotel-review-room col-md-9">
                    <h2>Give your place a name</h2>
                    <hr />

                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Listing title" />
                    </div>

                    <div className="clearfix"></div>
                </div>
                <NavLink to="/listings/create/location" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/description" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}