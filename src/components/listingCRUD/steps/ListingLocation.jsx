import 'react-select/dist/react-select.css';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';

import BasicsAside from '../aside/BasicsAside';
import ListingCrudNav from '../navigation/ListingCrudNav';
import { NavLink } from 'react-router-dom';
import React from 'react';
import Select from 'react-select';

export default function CreateListingLocation(props) {

    const { country, countries, city, cities, street } = props.values;
    const renderCountries = countries.map((item) => {
        return { value: item.id, label: item.name };
    });
    const renderCities = cities.map((item) => {
        return { value: item.id, label: item.name };
    });
    return (
        <div>
            <ListingCrudNav progress='33%' />
            <NotificationContainer />
            <div className="container">
                <div className="row">
                    <div className="listings create">
                        <div className="col-md-3">
                            <BasicsAside />
                        </div>
                        <div className="col-md-9">
                            <div className="form-group">
                                <h2>Where&rsquo;s your place located?</h2>
                                <hr />
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <Select
                                                name="country"
                                                placeholder="Country"
                                                className="form-control form-control-select"
                                                clearable={false}
                                                style={{ border: 'none' }}
                                                value={country}
                                                onChange={(option) => updateCountry(props, option)}
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
                                                style={{ border: 'none' }}
                                                value={city}
                                                onChange={option => props.onSelect('city', option)}
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
                                            <input onChange={props.onChange} className="form-control" id="street" name="street" value={street} />
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

                    {validateInput(props.values)
                        ? <NavLink to="/profile/listings/create/description" className="btn btn-primary btn-next" id="btn-continue" onClick={() => { props.updateProgress(5); }}>Next</NavLink>
                        : <button className="btn btn-primary btn-next disabled" onClick={() => showErrors(props.values)}>Next</button>
                    }
                </div>
            </div>
        </div >
    );
}

async function updateCountry(props, option) {
    if (!option) {
        return;
    }

    await props.onSelect('country', option);
    props.updateCities();
}

function validateInput(values) {
    const { street, city } = values;
    if (street.length < 6) {
        return false;
    }

    if (!city || city === '') {
        return false;
    }

    return true;
}

function showErrors(values) {
    const { street, city, country } = values;
    if (street.length < 6) {
        NotificationManager.warning('Address should be at least 6 characters long');
    }

    if (!city || city === '') {
        NotificationManager.warning('City is required');
    }

    if (!country || country === '') {
        NotificationManager.warning('Country is required');
    }
}

CreateListingLocation.propTypes = {
    values: PropTypes.any,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    updateCities: PropTypes.func,
    updateProgress: PropTypes.func,
};