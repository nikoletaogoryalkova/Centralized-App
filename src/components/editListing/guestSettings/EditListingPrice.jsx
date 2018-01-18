import React from 'react';
import { NavLink } from 'react-router-dom';

import EditListingGuestSettingsAside from './EditListingGuestSettingsAside';
import NavEditListing from '../NavEditListing';
import ReCAPTCHA from 'react-google-recaptcha';

export default class EditListingPrice extends React.Component {
    render() {
        const { listingId, currency, defaultDailyPrice, cleaningFee, depositRate, currencies } = this.props.values;

        return (
            <div>
                <NavEditListing progress='100%' />
                <div className="container">
                    <div className="row">
                        <div className="listings create">
                            <div className="col-md-3">
                                <EditListingGuestSettingsAside listingId={listingId} />
                            </div>

                            {!this.props.values.loading ? <div className="col-md-9">
                                <div className="form-group">
                                    <h2>Default nightly rate</h2>
                                    <hr />
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="city">Currency</label>
                                                <select
                                                    onChange={this.props.onChange}
                                                    className="form-control"
                                                    name="currency"
                                                    value={currency}
                                                    required="required"
                                                    id="currency">
                                                    <option disabled value="">Currency</option>
                                                    {currencies.map((item, i) => {
                                                        return <option key={i} value={item.id}>{item.code}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="defaultDailyPrice">Price per Night</label>
                                                <input onChange={this.props.onChange} type="number" id="defaultDailyPrice" className="form-control" name="defaultDailyPrice" value={defaultDailyPrice} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="cleaningFee">Cleaning Fee</label>
                                                <input onChange={this.props.onChange} type="number" id="cleaningFee" className="form-control" name="cleaningFee" value={cleaningFee} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="depositRate">Deposit Required</label>
                                                <input onChange={this.props.onChange} type="number" id="depositRate" className="form-control" name="depositRate" value={depositRate} />
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
                        <NavLink to={`/profile/listings/edit/checking/${listingId}`} className="btn btn-default btn-back" id="btn-continue">
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            &nbsp;Back</NavLink>
                        <NavLink to={`/profile/listings/edit/price/${listingId}`} className="btn btn-primary btn-next" onClick={(e) => { 
                                e.preventDefault(); 
                                {/* this.props.createListing(); */}
                                this.captcha.execute(); 
                            }} id="btn-continue">Finish</NavLink>
                        
                        <ReCAPTCHA
                                ref={el => this.captcha = el}
                                size="invisible"
                                sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                                onChange={token => {this.props.createListing(token); this.captcha.reset();}}
                            />
                    </div>
                </div>
            </div >
        );
    }
}