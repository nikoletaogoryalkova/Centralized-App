import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';

import { Config } from '../../../config';

const page = 'placeType';

export default class CreateListingPlaceType extends React.Component {
    render() {
        return (
            <div>
                <CreateListingBasicsAside />
                <div className="reservation-hotel-review-room col-md-8">
                    <h2>What kind of place do you want to list?</h2>
                    <hr />
                    
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="listing-type">What are you listing?</label>
                                <select onChange={(e) => this.props.onChange(page, e)} className="form-control" name="listingType" value={this.props.values.listingType} required="required" id="listing-type">
                                    <option value="Home">Home</option>
                                    <option value="Hotel">Hotel</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="property-type">What type of property is this?</label>
                                <select onChange={(e) => this.props.onChange(page, e)} className="form-control" name="propertyType" value={this.props.values.propertyType} required="required" id="property-type">
                                    <option value="Apartment">Apartment</option>
                                    <option value="Condominium">Condominium</option>
                                    <option value="Guesthouse">Guesthouse</option>
                                    <option value="House">House</option>
                                    <option value="In-law">In-law</option>
                                    <option value="Guest suite">Guest suite</option>
                                    <option value="Townhouse">Townhouse</option>
                                    <option value="Vacation home">Vacation home</option>
                                    <option value="Boat">Boat</option>
                                    <option value="Bungalow">Bungalow</option>
                                    <option value="Cabin">Cabin</option>
                                    <option value="Castle">Castle</option>
                                    <option value="Cave">Cave</option>
                                    <option value="Chalet">Chalet</option>
                                    <option value="Dorm">Dorm</option>
                                    <option value="Earth House">Earth House</option>
                                    <option value="Hut">Hut</option>
                                    <option value="Igloo">Igloo</option>
                                    <option value="Island">Island</option>
                                    <option value="Lighthouse">Lighthouse</option>
                                    <option value="Loft">Loft</option>
                                    <option value="Plane">Plane</option>
                                    <option value="Camper/RV">Camper/RV</option>
                                    <option value="Tent">Tent</option>
                                    <option value="Tipi">Tipi</option>
                                    <option value="Train">Train</option>
                                    <option value="Treehouse">Treehouse</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Yurt">Yurt</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>What will your guests have?</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <input type="radio" onChange={(e) => this.props.onChange(page, e)} className="host-step-radio" id="entire-place" name="reservationType" checked={this.props.values.reservationType === 'entirePlace'} value="entirePlace"/>
                                    <div className="radio-input-group">
                                        <div className="host-img-box">
                                            <img src={Config.getValue("basePath") + "images/icon-home.png"} alt="icon home" />
                                        </div>
                                        <label htmlFor="entire-place">Entire Place</label>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <input type="radio" onChange={(e) => this.props.onChange(page, e)} className="host-step-radio" id="private-room" name="reservationType" checked={this.props.values.reservationType === 'privateRoom'} value="privateRoom"/>
                                    <div className="radio-input-group">
                                        <div className="host-img-box">
                                            <img src={Config.getValue("basePath") + "images/icon-home.png"} alt="icon home" />
                                        </div>
                                        <label htmlFor="private-room">Private room</label>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <input type="radio" onChange={(e) => this.props.onChange(page, e)} className="host-step-radio" id="shared-room" name="reservationType"  checked={this.props.values.reservationType === 'sharedRoom'} value="sharedRoom"/>
                                    <div className="radio-input-group">
                                        <div className="host-img-box">
                                            <img src={Config.getValue("basePath") + "images/icon-home.png"} alt="icon home" />
                                        </div>
                                        <label htmlFor="shared-room">Shared Room</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Is this set up as dedicated guest space?</label>
                                <br/>

                                <input type="radio" onChange={(e) => this.props.onChange(page, e)} name="dedicatedSpace" id="dedicated-space-yes" className="radio-input-group" checked={this.props.values.dedicatedSpace === "true"} value="true"/>
                                <label htmlFor="dedicated-space-yes">Yes, it's primarily set up for guests</label>
                                <br/>

                                <input type="radio" onChange={(e) => this.props.onChange(page, e)} name="dedicatedSpace" id="dedicated-space-no" className="radio-input-group" checked={this.props.values.dedicatedSpace === "false"} value="false"/>
                                <label htmlFor="dedicated-space-no">No, I keep my personal belongings here</label>
                            </div>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="property-size">Please enter the size of your property</label>
                                <div className="input-group">
                                    <input onChange={(e) => this.props.onChange(page, e)} type="number" className="form-control" id="property-size" name="propertySize" value={this.props.values.propertySize}/>
                                    <span className="input-group-addon">m&sup2;</span>
                                </div>
                            </div>
                        </div>


                        <div className="clearfix"></div>
                    </div>
                    <NavLink to="/listings/create/landing" className="btn btn-default" id="btn-continue">Back</NavLink>
                    <NavLink to="/listings/create/accommodation" className="btn btn-primary" id="btn-continue">Continue</NavLink>
                </div>
            </div>
            
        )
    }
}