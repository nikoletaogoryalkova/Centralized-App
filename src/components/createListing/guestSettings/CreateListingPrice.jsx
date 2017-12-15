import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingGuestSettingsAside from './CreateListingGuestSettingsAside';
import Textbox from '../Textbox';
import Dropdown from '../Dropdown';

export default class CreateListingPrice extends React.Component {
    render() {
        const {defaultDailyPrice, currency} = this.props.values;
        return (
            <div>
                <CreateListingGuestSettingsAside />
                <div className="col-md-9">
                    <div className="form-group">
                        <h2>Default nightly rate</h2>
                        <hr/>

                        <div className="col-md-6">
                            <label>
                                Base price
                                <Textbox
                                    type="number" 
                                    name="defaultDailyPrice"
                                    value={defaultDailyPrice} 
                                    onChange={this.props.updateNumber}/>
                            </label>
                            <label>
                                Currency
                                <Dropdown 
                                    name="currency"
                                    value={currency}
                                    options={[ "LOC", "BGN" ]} 
                                    onChange={this.props.updateDropdown}/>
                            </label>
                        </div>
                    </div>
                </div>
                <NavLink to="/listings/create/cancellation" className="btn btn-default" id="btn-continue">Back</NavLink>
                <input type="button" className="btn btn-primary" onClick={this.props.submitPost} />
                {/* <NavLink to="/listings/create/price" className="btn btn-primary" id="btn-continue" onClick={this.props.submitPost}>Finish</NavLink> */}
            </div>
        );
    }
}