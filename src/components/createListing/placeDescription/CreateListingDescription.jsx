import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingPlaceDescriptionAside from './CreateListingPlaceDescriptionAside';

export default class CreateListingDescription extends React.Component {
    render() {
        return (
            <div>
                <CreateListingPlaceDescriptionAside />
                <h1>Description</h1>
                <br/>
                <NavLink to="/listings/create/title" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/photos" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}