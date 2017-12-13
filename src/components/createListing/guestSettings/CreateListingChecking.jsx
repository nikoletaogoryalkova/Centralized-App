import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingGuestSettingsAside from './CreateListingGuestSettingsAside';
import Dropdown from '../Dropdown';

export default class CreateListingChecking extends React.Component {
    render() {
        const {checkinFrom, checkinTo, checkoutFrom, checkoutTo} = this.props.values;
        return (
            <div>
                <CreateListingGuestSettingsAside />
                <div className="col-md-9">
                    <h2>When can guests check-in?</h2>
                    <hr/>
                    <div className="form-group">    
                        <div className="col-md-6">
                            <label htmlFor="">
                                from:
                                <Dropdown 
                                    name="checkinFrom"
                                    value={checkinFrom}
                                    options={CreateListingChecking.hours}
                                    onChange={this.props.updateDropdown}
                                    />
                            </label>
                        </div>
                            
                        <div className="col-md-6">
                        <label htmlFor="">
                                to:
                                <Dropdown 
                                    name="checkinTo"
                                    value={checkinTo}
                                    options={CreateListingChecking.hours}
                                    onChange={this.props.updateDropdown}
                                    />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    <h2>When can guests check-out?</h2>
                    <hr/>
                    <div className="form-group">    
                        <div className="col-md-6">
                            <label htmlFor="">
                                from:
                                <Dropdown 
                                    name="checkoutFrom"
                                    value={checkoutFrom}
                                    options={CreateListingChecking.hours}
                                    onChange={this.props.updateDropdown}
                                    />
                            </label>
                        </div>
                            
                        <div className="col-md-6">
                            <label htmlFor="">
                                to:
                                <Dropdown 
                                    name="checkoutTo"
                                    value={checkoutTo}
                                    options={CreateListingChecking.hours}
                                    onChange={this.props.updateDropdown}
                                    />
                            </label>
                        </div>
                    </div>
                </div>
                <NavLink to="/listings/create/houserules" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/cancellation" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}

CreateListingChecking.hours = [
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 PM",
]