import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications';

import CreateListingBasicsAside from './CreateListingBasicsAside';

import { getCities } from '../../../requester';

export default class CreateListingLocation extends React.Component {
    constructor(props) {
        super(props);
        
        this.validateInput = this.validateInput.bind(this);
        this.showErrors = this.showErrors.bind(this);
    }

    async updateCountry(e) {
        await this.props.onChange(e);
        this.props.updateCountries();
        this.props.updateCities();
    }    
    
    validateInput() {
        const { street, city } = this.props.values;
        if (street.length < 6) {
            return false;
        }

        if (!city || city === '') {
            return false;
        }

        return true;
    }

    showErrors() {
        const { street, city } = this.props.values;
        if (street.length < 6) {
            NotificationManager.warning("Address should be at least 6 characters long");
        }

        if (!city || city === '') {
            NotificationManager.warning("City is required");
        }
    }

    render() {
        const { country, countries, city, cities, street } = this.props.values;
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
                                                <label htmlFor="country">Country</label>
                                                <select
                                                    onChange={(e) => this.updateCountry(e)}
                                                    className="form-control"
                                                    name="country"
                                                    value={country}
                                                    required="required"
                                                    id="country">
                                                    <option disabled value="">Location</option>
                                                    {countries.map((item, i) => {
                                                        return <option key={i} value={item.id}>{item.name}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="city">City</label>
                                                <select
                                                    onChange={this.props.onChange}
                                                    className="form-control"
                                                    name="city"
                                                    value={city}
                                                    required="required"
                                                    id="city">
                                                    <option disabled value="">City</option>
                                                    {cities.map((item, i) => {
                                                        return <option key={i} value={item.id}>{item.name}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="street">Address</label>
                                                <input onChange={this.props.onChange} className="form-control" id="street" name="street" value={street} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
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
                        <NavLink to="/profile/listings/create/safetyamenities" className="btn btn-default btn-back" id="btn-continue">
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            &nbsp;Back</NavLink>
                        
                        {this.validateInput() 
                            ? <NavLink to="/profile/listings/create/description" className="btn btn-primary btn-next" id="btn-continue">Next</NavLink>
                            : <button className="btn btn-primary btn-next disabled" onClick={this.showErrors}>Next</button>
                        }
                    </div>
                </div>
            </div >
        );
    }
}