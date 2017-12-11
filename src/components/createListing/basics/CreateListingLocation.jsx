import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';

export default class CreateListingLocation extends React.Component {
    render() {
        return (
            <div>
                <CreateListingBasicsAside />
                <h1>CreateListingLocation</h1>
                <br/>
                <NavLink to="/listings/create/safetyamenities" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/title" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}