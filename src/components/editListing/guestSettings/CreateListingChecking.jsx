import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingGuestSettingsAside from './CreateListingGuestSettingsAside';

export default class CreateListingChecking extends React.Component {
    render() {
        const { checkinFrom, checkinTo, checkoutFrom, checkoutTo } = this.props.values;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="listings create">
                            <div className="col-md-3">
                                <CreateListingGuestSettingsAside />
                            </div>
                            <div className="col-md-9">
                                <h2>When can guests check-in?</h2>
                                <hr />
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="checkinFrom">from:</label>
                                            <select
                                                onChange={this.props.updateDropdown}
                                                className="form-control"
                                                name="checkinFrom"
                                                value={checkinFrom}
                                                required="required"
                                                id="checkinFrom">
                                                {CreateListingChecking.hours.map((item, i) => {
                                                    return <option key={i} value={item}>{item}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="checkinTo">to:</label>
                                            <select
                                                onChange={this.props.updateDropdown}
                                                className="form-control"
                                                name="checkinTo"
                                                value={checkinTo}
                                                required="required"
                                                id="checkinTo">
                                                {CreateListingChecking.hours.map((item, i) => {
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
                                            <label htmlFor="checkoutFrom">from:</label>
                                            <select
                                                onChange={this.props.updateDropdown}
                                                className="form-control"
                                                name="checkoutFrom"
                                                value={checkoutFrom}
                                                required="required"
                                                id="checkoutFrom">
                                                {CreateListingChecking.hours.map((item, i) => {
                                                    return <option key={i} value={item}>{item}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="checkoutTo">to:</label>
                                            <select
                                                onChange={this.props.updateDropdown}
                                                className="form-control"
                                                name="checkoutTo"
                                                value={checkoutTo}
                                                required="required"
                                                id="checkoutTo">
                                                {CreateListingChecking.hours.map((item, i) => {
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