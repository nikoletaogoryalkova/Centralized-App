import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import GuestSettingsAside from '../aside/GuestSettingsAside';
import ListingCrudNav from '../navigation/ListingCrudNav';

export default function CreateListingChecking(props) {
    const { checkinStart, checkinEnd, checkoutStart, checkoutEnd } = props.values;
    return (
        <div>
            <ListingCrudNav progress='100%' />
            <div className="container">
                <div className="row">
                    <div className="listings create">
                        <div className="col-md-3">
                            <GuestSettingsAside routes={props.routes}/>
                        </div>
                        <div className="col-md-9">
                            <h2>When can guests check-in?</h2>
                            <hr />
                            <div className="col-md-12">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="checkinStart">from:</label>
                                        <select
                                            onChange={props.updateDropdown}
                                            className="form-control"
                                            name="checkinStart"
                                            value={checkinStart}
                                            required="required"
                                            id="checkinStart">
                                            {CreateListingChecking.hours.map((item, i) => {
                                                return <option key={i} value={item}>{item}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="checkinEnd">to:</label>
                                        <select
                                            onChange={props.updateDropdown}
                                            className="form-control"
                                            name="checkinEnd"
                                            value={checkinEnd}
                                            required="required"
                                            id="checkinEnd">
                                            {CreateListingChecking.hours.map((item, i) => {
                                                return <option key={i} value={item}>{item}</option>;
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
                                            onChange={props.updateDropdown}
                                            className="form-control"
                                            name="checkoutStart"
                                            value={checkoutStart}
                                            required="required"
                                            id="checkoutStart">
                                            {CreateListingChecking.hours.map((item, i) => {
                                                return <option key={i} value={item}>{item}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="checkoutEnd">to:</label>
                                        <select
                                            onChange={props.updateDropdown}
                                            className="form-control"
                                            name="checkoutEnd"
                                            value={checkoutEnd}
                                            required="required"
                                            id="checkoutEnd">
                                            {CreateListingChecking.hours.map((item, i) => {
                                                return <option key={i} value={item}>{item}</option>;
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
                    <NavLink to={props.prev} className="btn btn-default btn-back" id="btn-continue">
                        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                        &nbsp;Back</NavLink>
                    <NavLink to={props.next} className="btn btn-primary btn-next" id="btn-continue" onClick={() => { props.updateProgress(9); }}>Next</NavLink>
                </div>
            </div>
        </div>
    );
}

CreateListingChecking.hours = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
];

CreateListingChecking.propTypes ={
    values: PropTypes.any.isRequired,
    updateDropdown: PropTypes.func.isRequired,
    updateProgress: PropTypes.func.isRequired,
    prev: PropTypes.string,
    next: PropTypes.string,
};