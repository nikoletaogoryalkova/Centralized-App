import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications';

import { Config } from '../../../config';

export default class EditListingLandingPage extends React.Component {
    constructor(props) {
        super(props);

        this.showComingSoonNotification = this.showComingSoonNotification.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.showErrors = this.showErrors.bind(this);
    }

    showComingSoonNotification() {
        NotificationManager.warning("Coming Soon...");
    }

    validateInput() {
        const { name } = this.props.values;
        if (name.length < 2) {
            return false;
        }

        return true;
    }

    showErrors() {
        const { name } = this.props.values;
        if (name.length < 2) {
            NotificationManager.warning("Title should be at least 2 characters")
        }
    }

    render() {
        const { type, name } = this.props.values;

        return (
            <div className="container">
                <NotificationContainer />
                <div className="row">
                    <div className="listings create landing">
                        <div className="col-md-6">
                            <img src={Config.getValue("basePath") + "images/listing-illustration.png"} alt="listing-creation" className="left-poster" />
                        </div>
                        <div className="col-md-6">
                            <div className="column-container">
                                <div>
                                    <h4>STEP ONE</h4>
                                </div>
                                
                                <div>
                                    <h3>Give your place a name</h3>
                                    <hr />
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input onChange={this.props.onChange} placeholder="Listing Title" className="form-control" name="name" value={name} />
                                        <br/>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3>What kind of place do you want to list?</h3>
                                    <hr />
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="house custom-radio">
                                                <input
                                                    type="radio"
                                                    onChange={(e) => this.props.onChange(e)}
                                                    name="type"
                                                    checked={type === '1'}
                                                    value="1" />
                                                <span className="button"><img src={Config.getValue("basePath") + "images/icon-check-japonica.png"} alt="radio-home" /></span>
                                                <span>Home</span>
                                            </label>
                                            <label className="hotel custom-radio" >
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    checked={type === '2'}
                                                    value="2"
                                                    onClick={this.showComingSoonNotification} />
                                                <span className="button"><img src={Config.getValue("basePath") + "images/icon-check-japonica.png"} alt="radio-hotel" /></span>
                                                <span>Hotel</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <NavLink to="/profile/listings/edit/placetype" className="btn btn-primary" id="btn-continue">Continue</NavLink>
                                {/* {this.validateInput() 
                                    ? <NavLink to="/profile/listings/edit/placetype" className="btn btn-primary" id="btn-continue">Continue</NavLink>
                                    : <button className="btn btn-primary btn-next disabled" onClick={this.showErrors}>Next</button>
                                } */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}