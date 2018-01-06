import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';

import { getCities } from '../../../requester';

export default class CreateListingLocation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cities: [],
        }
    }

    componentDidMount() {
        getCities(this.props.values.billingCountry).then(data => {
            this.setState({ cities: data.content });
        });
    }

    updateBillingCountry(e) {
        const countryId = e.target.value;
        getCities(countryId).then(data => {
            this.setState({ cities: data.content });
        });

        this.props.updateDropdown(e);
        this.props.resetCity();
    }

    render() {
        if (!this.state.cities) {
            return null;
        }

        const { billingCountry, streetAddress, city, apartment, zipCode, countries } = this.props.values;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="listings create">
                            <div className="col-md-3">
                                <CreateListingBasicsAside />
                            </div>
                            <div className="col-md-9">
                                <div className="form-group">
                                    <h2>Where's your place located?</h2>
                                    <hr />
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="billingCountry">Billing Country</label>
                                                <select
                                                    onChange={(e) => this.updateBillingCountry(e)}
                                                    className="form-control"
                                                    name="billingCountry"
                                                    value={billingCountry}
                                                    required="required"
                                                    id="billingCountry">
                                                    <option disabled value="">Location</option>
                                                    {countries.map((item, i) => {
                                                        return <option key={i} value={item.id}>{item.name}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="streetAddress">Street Address</label>
                                                <input onChange={this.props.updateTextbox} className="form-control" id="streetAddress" name="streetAddress" value={streetAddress} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="apartment">Apt, Suite, Bldg. (optional)</label>
                                                <input onChange={this.props.updateTextbox} className="form-control" id="apartment" name="apartment" value={apartment} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="city">City</label>
                                                <select
                                                    onChange={this.props.updateDropdown}
                                                    className="form-control"
                                                    name="city"
                                                    value={city}
                                                    required="required"
                                                    id="city">
                                                    <option disabled value="">City</option>
                                                    {this.state.cities.map((item, i) => {
                                                        return <option key={i} value={item.id}>{item.name}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="zipCode">ZIP Code</label>
                                                <input onChange={this.props.updateTextbox} className="form-control" id="zipCode" name="zipCode" value={zipCode} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-12">
                                            <div className="col-md-12 protection-message">
                                                <p><i className="fa fa-2x fa-lightbulb-o" aria-hidden="true"></i>Your exact address will only be shared with confirmed guests.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <div className="navigation col-md-12">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-7">
                        <NavLink to="/profile/listings/edit/safetyamenities" className="btn btn-default btn-back" id="btn-continue">
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            &nbsp;Back</NavLink>
                        <NavLink to="/profile/listings/edit/title" className="btn btn-primary btn-next" id="btn-continue">Next</NavLink>
                    </div>
                </div>
            </div >
        );
    }
}