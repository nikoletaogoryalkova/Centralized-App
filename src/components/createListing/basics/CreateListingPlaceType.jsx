import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';

import { Config } from '../../../config';

export default class CreateListingPlaceType extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { type, propertyType, propertyTypes, roomType, dedicatedSpace, propertySize } = this.props.values;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="listings create">

                            <div className="col-md-3">
                                <CreateListingBasicsAside />
                            </div>
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
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="property-type">What type of property is this?</label>
                                            <select
                                                onChange={(e) => this.props.onChange(e)}
                                                value={propertyType}
                                                className="form-control"
                                                name="propertyType"
                                                required="required"
                                                id="property-type">
                                                <option disabled value="">Type</option>
                                                {propertyTypes.map((item, i) => {
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
                                                <label className="entire custom-radio">
                                                    <input
                                                        type="radio"
                                                        onChange={(e) => this.props.onChange(e)}
                                                        name="roomType"
                                                        checked={roomType === 'entire'}
                                                        value="entire" />
                                                    <span className="button"><img src={Config.getValue("basePath") + "images/icon-check-japonica.png"} alt="radio-home" /></span>
                                                    <span>Entire Place</span>
                                                </label>
                                            </div>

                                            <div className="col-md-4">
                                                <label className="private custom-radio">
                                                    <input
                                                        type="radio"
                                                        onChange={(e) => this.props.onChange(e)}
                                                        name="roomType"
                                                        checked={roomType === 'private'}
                                                        value="private" />
                                                    <span className="button"><img src={Config.getValue("basePath") + "images/icon-check-japonica.png"} alt="radio-home" /></span>
                                                    <span>Private Place</span>
                                                </label>
                                            </div>

                                            <div className="col-md-4">
                                                <label className="shared custom-radio">
                                                    <input
                                                        type="radio"
                                                        onChange={(e) => this.props.onChange(e)}
                                                        name="roomType"
                                                        checked={roomType === 'shared'}
                                                        value="shared" />
                                                    <span className="button"><img src={Config.getValue("basePath") + "images/icon-check-japonica.png"} alt="radio-home" /></span>
                                                    <span>Shared Place</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <br/>
                                        <div className="form-group">
                                            <label>Is this set up as dedicated guest space?</label>
                                            <br />

                                            <input type="radio" onChange={(e) => this.props.onChange(e)} name="dedicatedSpace" id="dedicated-space-yes" className="radio-input-group" checked={dedicatedSpace === "true"} value="true" />
                                            <label htmlFor="dedicated-space-yes">Yes, it's primarily set up for guests</label>
                                            <br />

                                            <input type="radio" onChange={(e) => this.props.onChange(e)} name="dedicatedSpace" id="dedicated-space-no" className="radio-input-group" checked={dedicatedSpace === "false"} value="false" />
                                            <label htmlFor="dedicated-space-no">No, I keep my personal belongings here</label>
                                        </div>
                                    </div>

                                    <div className="clearfix"></div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="property-size">Please enter the size of your property</label>
                                            <div className="input-group">
                                                <input onChange={(e) => this.props.onChange(e)} type="number" className="form-control" id="property-size" name="propertySize" value={propertySize} />
                                                <span className="input-group-addon">m&sup2;</span>
                                            </div>
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
                        <NavLink to="/profile/listings/create/landing" className="btn btn-default btn-back" id="btn-continue">
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            &nbsp;Back</NavLink>
                        <NavLink to="/profile/listings/create/accommodation" className="btn btn-primary btn-next" id="btn-continue">Next</NavLink>
                    </div>
                </div>

            </div>
        )
    }
}