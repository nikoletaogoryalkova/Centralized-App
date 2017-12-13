import React from 'react';
import { NavLink } from 'react-router-dom';

import { Config } from '../../../config';
import { Radio, FormControl, FormGroup } from 'react-bootstrap';

export default class CreateListingLandingPage extends React.Component {


    render() {
        const {listingType, location} = this.props.values;
    
        return (
            <div>
                <div className="col-md-6">
                    <img src={Config.getValue("basePath") + "images/listing-illustration.png"} alt="listing-creation" />
                </div>
                <div className="col-md-6">
                    <h4>STEP ONE</h4>
                    <h3>What kind of place do you want to list?</h3>
                    <hr />
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12">
                                <label>
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        name="listingType" 
                                        checked={listingType === 'home'} 
                                        value="home"/>
                                    Home
                                </label>
                                {' '}
                                <label>
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        name="listingType" 
                                        checked={listingType === 'hotel'} 
                                        value="hotel"/>
                                    Hotel
                                </label>
                                
                                <br />

                                <input 
                                    type="text"
                                    name="location" 
                                    value={location}
                                    placeholder="Enter a location" 
                                    onChange={(e) => this.props.onChange(e)} />
                            </div>
                        </div>
                    </div>
                    <br />
                    
                    <NavLink 
                        to="/listings/create/placetype" 
                        className="btn btn-primary" 
                        id="btn-continue">
                        Continue
                    </NavLink>
                </div>
            </div>
        );
    }
}