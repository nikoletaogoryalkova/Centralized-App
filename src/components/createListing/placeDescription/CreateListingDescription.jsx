import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingPlaceDescriptionAside from './CreateListingPlaceDescriptionAside';
import Textarea from '../Textarea';

export default class CreateListingDescription extends React.Component {
    render() {
        const { description, neighborhood } = this.props.values;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="listings create">
                            <div className="col-md-3">
                                <CreateListingPlaceDescriptionAside />
                            </div>
                            <div className="reservation-hotel-review-room col-md-9">
                                <h2>Tell your guests about your place</h2>
                                <hr />

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Summary</label>
                                            <Textarea
                                                name="description"
                                                value={description}
                                                placeholder="Describe your place..."
                                                rows={5}
                                                onChange={this.props.updateTextarea}
                                            />
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
                                            <Textarea
                                                name="neighborhood"
                                                value={neighborhood}
                                                placeholder="Describe what's near by, how to get around, etc..."
                                                rows={5}
                                                onChange={this.props.updateTextarea}
                                            />
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navigation col-md-12">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-7">
                        <NavLink to="/profile/listings/create/location" className="btn btn-default btn-back" id="btn-continue">
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            &nbsp;Back</NavLink>
                        <NavLink to="/profile/listings/create/photos" className="btn btn-primary btn-next" id="btn-continue">Next</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}