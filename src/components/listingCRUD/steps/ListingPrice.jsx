import GuestSettingsAside from '../aside/GuestSettingsAside';
import ListingCrudNav from '../navigation/ListingCrudNav';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';

let captcha;

export default function CreateListingPrice(props) {
    const { currency, defaultDailyPrice, cleaningFee, depositRate, currencies } = props.values;
    return (
        <div>
            <ListingCrudNav progress='100%' />
            <div className="container">
                <div className="row">
                    <div className="listings create">
                        <div className="col-md-3">
                            <GuestSettingsAside routes={props.routes} />
                        </div>

                        {!props.values.loading ? <div className="col-md-9">
                            <div className="form-group">
                                <h2>Default nightly rate</h2>
                                <hr />
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="city">Currency</label>
                                            <select
                                                onChange={props.onChange}
                                                className="form-control"
                                                name="currency"
                                                value={currency}
                                                required="required"
                                                id="currency">
                                                <option disabled value="">Currency</option>
                                                {currencies.map((item, i) => {
                                                    return <option key={i} value={item.id}>{item.code}</option>;
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="defaultDailyPrice">Price per Night</label>
                                            <input onChange={props.onChange} type="number" id="defaultDailyPrice" className="form-control" name="defaultDailyPrice" value={defaultDailyPrice} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="cleaningFee">Cleaning Fee</label>
                                            <input onChange={props.onChange} type="number" id="cleaningFee" className="form-control" name="cleaningFee" value={cleaningFee} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="depositRate">Deposit Required</label>
                                            <input onChange={props.onChange} type="number" id="depositRate" className="form-control" name="depositRate" value={depositRate} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : <div className="loader"></div>}
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
                    <NavLink to='#' className="btn btn-primary btn-next" onClick={(e) => {
                        e.preventDefault();
                        captcha.execute();
                    }} id="btn-continue">Finish</NavLink>

                    <ReCAPTCHA
                        ref={(el) => captcha = el}
                        size="invisible"
                        sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                        onChange={token => { props.finish(token); captcha.reset(); }}
                    />
                </div>
            </div>
        </div>
    );
}

CreateListingPrice.propTypes = {
    values: PropTypes.object,
    onChange: PropTypes.func,
    finish: PropTypes.func,
    prev: PropTypes.string,
};