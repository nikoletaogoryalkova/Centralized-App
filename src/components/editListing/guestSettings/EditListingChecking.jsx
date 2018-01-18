import React from 'react';
import { NavLink } from 'react-router-dom';

import EditListingGuestSettingsAside from './EditListingGuestSettingsAside';
import NavEditListing from '../NavEditListing';

export default class EditListingChecking extends React.Component {
    render() {
        const { checkinStart, checkinEnd, checkoutStart, checkoutEnd } = this.props.values;
        return (
            <div>
                <NavEditListing progress='100%' />
                <div className="container">
                    <div className="row">
                        <div className="listings create">
                            <div className="col-md-3">
                                <EditListingGuestSettingsAside />
                            </div>
                            <div className="col-md-9">
                                <h2>When can guests check-in?</h2>
                                <hr />
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="checkinStart">from:</label>
                                            <select
                                                onChange={this.props.updateDropdown}
                                                className="form-control"
                                                name="checkinStart"
                                                value={checkinStart}
                                                required="required"
                                                id="checkinStart">
                                                {EditListingChecking.hours.map((item, i) => {
                                                    return <option key={i} value={item}>{item}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="checkinEnd">to:</label>
                                            <select
                                                onChange={this.props.updateDropdown}
                                                className="form-control"
                                                name="checkinEnd"
                                                value={checkinEnd}
                                                required="required"
                                                id="checkinEnd">
                                                {EditListingChecking.hours.map((item, i) => {
                                                    return <option key={i} value={item}>{item}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <h2>When can guests check-out?</h2>
                                <hr />
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="checkoutStart">from:</label>
                                            <select
                                                onChange={this.props.updateDropdown}
                                                className="form-control"
                                                name="checkoutStart"
                                                value={checkoutStart}
                                                required="required"
                                                id="checkoutStart">
                                                {EditListingChecking.hours.map((item, i) => {
                                                    return <option key={i} value={item}>{item}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="checkoutEnd">to:</label>
                                            <select
                                                onChange={this.props.updateDropdown}
                                                className="form-control"
                                                name="checkoutEnd"
                                                value={checkoutEnd}
                                                required="required"
                                                id="checkoutEnd">
                                                {EditListingChecking.hours.map((item, i) => {
                                                    return <option key={i} value={item}>{item}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navigation col-md-12">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-7">
                        <NavLink to="/profile/listings/edit/houserules" className="btn btn-default btn-back" id="btn-continue">
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            &nbsp;Back</NavLink>
                        <NavLink to="/profile/listings/edit/price" className="btn btn-primary btn-next" id="btn-continue">Next</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

EditListingChecking.hours = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
]