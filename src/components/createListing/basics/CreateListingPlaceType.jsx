import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';

import { Config } from '../../../config';
import { getPropertyTypesWithIds } from '../../../requester';

export default class CreateListingPlaceType extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            propertyTypes: [],
        }
    }

    componentDidMount() {
        getPropertyTypesWithIds().then(data => {
            this.setState({ propertyTypes: data.content });
        });
    }

    render() {
        const {type, propertyType, roomType, dedicated_space, propertySize} = this.props.values;
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
                                <select 
                                    onChange={(e) => this.props.onChange(e)} 
                                    className="form-control" 
                                    name="type" 
                                    value={type} 
                                    required="required" 
                                    id="listing-type">
                                    <option value="1">Home</option>
                                    <option value="2">Hotel</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="property-type">What type of property is this?</label>
                                <select 
                                    value={propertyType}
                                    name="propertyType"
                                    required="required"
                                    id="property-type"
                                    onChange={(e) => this.props.onChange(e)}>
                                    <option disabled value="">Type</option>
                                    {this.state.propertyTypes.map((item, i) => {
                                        return <option key={i} value={item.id}>{item.name}</option>
                                    })}
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
                                    <input type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        className="host-step-radio" 
                                        id="entire-place" 
                                        name="roomType" 
                                        checked={roomType === 'entire'} 
                                        value="entire"/>
                                    <div className="radio-input-group">
                                        <div className="host-img-box">
                                            <img src={Config.getValue("basePath") + "images/icon-home.png"} alt="icon home" />
                                        </div>
                                        <label htmlFor="entire-place">Entire Place</label>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        className="host-step-radio" 
                                        id="private-room" 
                                        name="roomType" 
                                        checked={roomType === 'private'} 
                                        value="private"/>
                                    
                                    <div className="radio-input-group">
                                        <div className="host-img-box">
                                            <img src={Config.getValue("basePath") + "images/icon-home.png"} alt="icon home" />
                                        </div>
                                        <label htmlFor="private-room">Private room</label>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <input 
                                        type="radio" onChange={(e) => this.props.onChange(e)} 
                                        className="host-step-radio" 
                                        id="shared-room" 
                                        name="roomType"  
                                        checked={roomType === 'shared'} 
                                        value="shared"/>

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

                                <input type="radio" onChange={(e) => this.props.onChange( e)} name="dedicated_space" id="dedicated-space-yes" className="radio-input-group" checked={dedicated_space === "true"} value="true"/>
                                <label htmlFor="dedicated-space-yes">Yes, it's primarily set up for guests</label>
                                <br/>

                                <input type="radio" onChange={(e) => this.props.onChange(e)} name="dedicated_space" id="dedicated-space-no" className="radio-input-group" checked={dedicated_space === "false"} value="false"/>
                                <label htmlFor="dedicated-space-no">No, I keep my personal belongings here</label>
                            </div>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="property-size">Please enter the size of your property</label>
                                <div className="input-group">
                                    <input onChange={(e) => this.props.onChange(e)} type="number" className="form-control" id="property-size" name="propertySize" value={propertySize}/>
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