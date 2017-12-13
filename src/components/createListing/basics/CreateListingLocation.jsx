import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';
import Dropdown from '../Dropdown';
import Textbox from '../Textbox';

export default class CreateListingLocation extends React.Component {
    render() {
        const {billingCountry, streetAddress, city, apartment, state, zipCode} = this.props.values;
        return (
            <div>
                <CreateListingBasicsAside />
                <div className="col-md-9">
                    <div className="form-group">
                        <h2>Where's your place located?</h2>
                        <hr/>

                        <div className="col-md-6">
                            <label>
                                Billing Country
                                <Dropdown 
                                    name="billingCountry"
                                    value={billingCountry}
                                    options={[ "Bulgaria", "United Kingdom" ]} 
                                    onChange={this.props.updateDropdown}/>
                            </label>
                            <label>
                                Street Address
                                <Textbox 
                                    name="streetAddress"
                                    value={streetAddress} 
                                    onChange={this.props.updateTextbox}/>
                            </label>
                            <label>
                                City
                                <Textbox 
                                    name="city"
                                    value={city} 
                                    onChange={this.props.updateTextbox}/>
                            </label>
                        </div>

                        <div className="col-md-6">
                            <label>
                                Apt, Suite, Blgd. (optional)
                                <Textbox 
                                    name="apartment"
                                    value={apartment} 
                                    onChange={this.props.updateTextbox}/>
                            </label>
                            <div className="col-md-6">
                                <label>
                                    State
                                    <Dropdown 
                                        name="state"
                                        value={state}
                                        options={[ "State", "Another state" ]} 
                                        onChange={this.props.updateDropdown}/>
                                </label>
                             </div>
                             <div className="col-md-6">
                                <label>
                                    ZipCode
                                    <Textbox 
                                        name="zipCode"
                                        value={zipCode} 
                                        onChange={this.props.updateTextbox}/>
                                </label>
                             </div>
                            
                        </div>

                        <div>
                            Your exact address will only be shared with confirmed guests.
                        </div>
                        
                    </div>
                    
                    <NavLink to="/listings/create/safetyamenities" className="btn btn-default" id="btn-continue">Back</NavLink>
                    <NavLink to="/listings/create/title" className="btn btn-primary" id="btn-continue">Continue</NavLink>
                </div>
            </div>
        );
    }
}