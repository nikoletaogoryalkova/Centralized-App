import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingGuestSettingsAside from './CreateListingGuestSettingsAside';
import Textbox from '../Textbox';
import ReCAPTCHA from 'react-google-recaptcha';

import { getCurrencies } from '../../../requester.js';

export default class CreateListingPrice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currencies: []
        }
    }

    componentDidMount() {
        getCurrencies().then(data => {
            this.setState({ currencies: data.content });
        });
    }

    render() {
        const { defaultDailyPrice, currency } = this.props.values;

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="listings create">
                            <div className="col-md-3">
                                <CreateListingGuestSettingsAside />
                            </div>

                            {!this.props.values.loading ? <div className="col-md-9">
                                <div className="form-group">
                                    <h2>Default nightly rate</h2>
                                    <hr />
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="defaultDailyPrice">Base price</label>
                                                <input onChange={this.props.updateNumber} type="number" id="defaultDailyPrice" className="form-control" name="defaultDailyPrice" value={defaultDailyPrice} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="city">Currency</label>
                                                <select
                                                    onChange={this.props.updateDropdown}
                                                    className="form-control"
                                                    name="currency"
                                                    value={currency}
                                                    required="required"
                                                    id="currency">
                                                    <option disabled value="">Currency</option>
                                                    {this.state.currencies.map((item, i) => {
                                                        return <option key={i} value={item.id}>{item.code}</option>
                                                    })}
                                                </select>
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
                        <NavLink to="/listings/create/checking" className="btn btn-default btn-back" id="btn-continue">
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            &nbsp;Back</NavLink>
                        <NavLink to="/listings/create/price" className="btn btn-primary btn-next" onClick={(e) => { e.preventDefault(); this.captcha.execute() }} id="btn-continue">Finish</NavLink>
                        
                        <ReCAPTCHA
                                ref={el => this.captcha = el}
                                size="invisible"
                                sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                                onChange={token => this.props.createListing(token)}
                            />
                    </div>
                </div>
            </div >
        );
    }
}