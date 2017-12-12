import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingPlaceDescriptionAside from './CreateListingPlaceDescriptionAside';

export default class CreateListingDescription extends React.Component {
    render() {
        return (
            <div>
                <CreateListingPlaceDescriptionAside />
                
                <div className="reservation-hotel-review-room col-md-9">
                    <h2>Tell your guests about your place</h2>
                    <hr />

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Summary</label>
                                <textarea rows={5} className="form-control" placeholder="Describe your place..."></textarea>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <h2>Tell your guests about the neighborhood</h2>
                    <hr />

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>The neighborhood (optional)</label>
                                <textarea rows={5} className="form-control" placeholder="Describe what's near by, how to get around, etc..."></textarea>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <NavLink to="/listings/create/title" className="btn btn-default" id="btn-continue">Back</NavLink>
                    <NavLink to="/listings/create/photos" className="btn btn-primary" id="btn-continue">Continue</NavLink>
                </div>
            </div>
        );
    }
}