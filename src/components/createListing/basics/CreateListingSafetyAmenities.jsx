import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';

export default class CreateListingSafetyAmenities extends React.Component {
    render() {
        return (
            <div>
                <CreateListingBasicsAside />
                <h1>CreateListingSafetyAmenities</h1>
                <br/>
                <NavLink to="/listings/create/facilities" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/location" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}