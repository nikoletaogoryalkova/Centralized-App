import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';

import NavCreateListing from '../NavCreateListing';

import { Config } from '../../../config';

export default function CreateListingLandingPage(props) {
    const { listingType, name } = props.values;
    return (
        <div>
            <NavCreateListing progress='33%'/>
            <div className="container">
                <NotificationContainer />
                <div className="row">
                    <div className="listings create landing">
                        <div className="col-md-6">
                            <img src={Config.getValue('basePath') + 'images/listing-illustration.png'} alt="listing-creation" className="left-poster" />
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
                                        <input onChange={props.onChange} placeholder="Listing Title" className="form-control" name="name" value={name} />
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
                                                    onChange={(e) => props.onChange(e)}
                                                    name="listingType"
                                                    checked={listingType === '1'}
                                                    value="1" />
                                                <span className="button"><img src={Config.getValue('basePath') + 'images/icon-check-japonica.png'} alt="radio-home" /></span>
                                                <span>Home</span>
                                            </label>
                                            <label className="hotel custom-radio" >
                                                <input
                                                    type="radio"
                                                    name="listingType"
                                                    checked={listingType === '2'}
                                                    value="2"
                                                    onClick={showComingSoonNotification} />
                                                <span className="button"><img src={Config.getValue('basePath') + 'images/icon-check-japonica.png'} alt="radio-hotel" /></span>
                                                <span>Hotel</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                {validateInput(props.values) 
                                    ? <NavLink to="/profile/listings/create/placetype" className="btn btn-primary" id="btn-continue" onClick={() => { props.updateProgress(1); }}>Continue</NavLink>
                                    : <button className="btn btn-primary btn-next disabled" onClick={() => showErrors(props.values)}>Continue</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function showComingSoonNotification() {
    NotificationManager.warning('Coming Soon...');
}

function validateInput(values) {
    const { name } = values;
    if (name.length < 2) {
        return false;
    }

    return true;
}

function showErrors(values) {
    const { name } = values;
    if (name.length < 2) {
        NotificationManager.warning('Title should be at least 2 characters');
    }
}

CreateListingLandingPage.propTypes = {
    values: PropTypes.any,
    onChange: PropTypes.func,
    updateProgress: PropTypes.func,
};