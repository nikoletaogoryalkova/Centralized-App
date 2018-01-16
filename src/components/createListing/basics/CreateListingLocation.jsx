import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import CreateListingBasicsAside from './CreateListingBasicsAside';

import { getCities } from '../../../requester';

export default class CreateListingLocation extends React.Component {
    constructor(props) {
        super(props);
        
        this.validateInput = this.validateInput.bind(this);
        this.showErrors = this.showErrors.bind(this);
        this.updateCountry = this.updateCountry.bind(this);
    }

    async updateCountry(option) {
        if (!option) {
            return;
        }

        await this.props.onSelect('country', option);
        // this.props.updateCountries();
        this.props.updateCities();
    }

    async updateCity(option) {
        if (!option) {
            return;
        }

        await this.props.onSelect('city', option);
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
        const { street, city, country } = this.props.values;
        if (street.length < 6) {
            NotificationManager.warning("Address should be at least 6 characters long");
        }

        if (!city || city === '') {
            NotificationManager.warning("City is required");
        }

        if (!country || country === '') {
            NotificationManager.warning("Country is required");
        }
    }

    test(option) {
        if (!option) {
            return;
        }

        this.props.onSelect('country', option);
    } 

    render() {
        const { country, countries, city, cities, street } = this.props.values;
        const renderCountries = countries.map((item, i) => {
            return { value: item.id, label: item.name }
        });
        const renderCities = cities.map((item, i) => {
            return { value: item.id, label: item.name }
        });
        return (
            <div>
                <NotificationContainer />
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
                                                <Select
                                                    name="country"
                                                    placeholder="Country"
                                                    className="form-control form-control-select"
                                                    clearable={false}
                                                    style={{border: 'none'}}
                                                    value={country}
                                                    onChange={this.updateCountry}
                                                    options={renderCountries}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <Select
                                                    name="city"
                                                    placeholder="City"
                                                    className="form-control form-control-select"
                                                    clearable={false}
                                                    style={{border: 'none'}}
                                                    value={city}
                                                    onChange={option => this.props.onSelect('city', option)}
                                                    options={renderCities}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
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