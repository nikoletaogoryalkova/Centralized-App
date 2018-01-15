import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications';

import CreateListingPlaceDescriptionAside from './CreateListingPlaceDescriptionAside';
import Textarea from '../Textarea';

export default class CreateListingDescription extends React.Component {
    constructor(props) {
        super(props);

        this.validateInput = this.validateInput.bind(this);
        this.showErrors = this.showErrors.bind(this);
    }

    validateInput() {
        const { text, interaction } = this.props.values;
        if (text.length < 6) {
            return false;
        }

        return true;
    }

    showErrors() {
        const { text, interaction } = this.props.values;
        if (text.length < 6) {
            NotificationManager.warning("Summary should be at least 6 characters long")
        }
    }

    render() {
        const { text, interaction } = this.props.values;
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
                                                name="text"
                                                value={text}
                                                placeholder="Describe your place..."
                                                rows={5}
                                                onChange={this.props.onChange}
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
                                                name="interaction"
                                                value={interaction}
                                                placeholder="Describe what's near by, how to get around, etc..."
                                                rows={5}
                                                onChange={this.props.onChange}
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
                        {this.validateInput() 
                            ? <NavLink to="/profile/listings/create/photos" className="btn btn-primary btn-next" id="btn-continue">Next</NavLink>
                            : <button className="btn btn-primary btn-next disabled" onClick={this.showErrors}>Next</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}