import 'react-select/dist/react-select.css';

import { NotificationContainer, NotificationManager } from 'react-notifications';

import Autocomplete from 'react-google-autocomplete';
import BasicsAside from '../aside/BasicsAside';
import ListingCrudNav from '../navigation/ListingCrudNav';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

export default function CreateListingLocation(props) {

    const handleOnPlaceSelected = (place) => {
        if (place.address_components !== undefined) {
            let addressComponentsMap = props.convertGoogleApiAddressComponents(place);
            changeAddressComponents(addressComponentsMap);
        }
    };

    const handleStreetSelected = (place) => {
        if (place.address_components !== undefined) {
            const addressComponentsMap = props.convertGoogleApiAddressComponents(place);
            // console.log(place)
            let address = '';
            if (addressComponentsMap.filter(x => x.type === 'route')[0]) {
                const addressNumber = addressComponentsMap.filter(x => x.type === 'street_number')[0] ? addressComponentsMap.filter(x => x.type === 'street_number')[0].name : '';
                const addressRoute = addressComponentsMap.filter(x => x.type === 'route')[0].name;
                address = `${addressNumber}, ${addressRoute}`;
                props.onChange({ target: { name: 'street', value: address }});
                props.onChange({ target: { name: 'isAddressSelected', value: true }});
                props.onChange({ target: { name: 'lng', value: place.geometry.location.lng() }});
                props.onChange({ target: { name: 'lat', value: place.geometry.location.lat() }});
                changeAddressComponents(addressComponentsMap);
            } else {
                NotificationManager.warning('Invalid address');
                props.onChange({ target: { name: 'street', value: '' }});
                props.onChange({ target: { name: 'lng', value: '' }});
                props.onChange({ target: { name: 'lat', value: '' }});
                props.onChange({ target: { name: 'isAddressSelected', value: false }});
            }
        }
    };

    const changeAddressComponents = (addressComponentsMap) => {
        let addressCountryName = addressComponentsMap.filter(x => x.type === 'country')[0].name;
        let addressCityName = addressComponentsMap.filter(x => x.type === 'locality')[0].name;
        let addressStateName = addressComponentsMap.filter(x => x.type === 'administrative_area_level_1')[0];

        props.onChange({ target: { name: 'city', value: addressCityName } });
        props.onChange({ target: { name: 'country', value: addressCountryName } });
        props.onChange({ target: { name: 'state', value: addressStateName !== undefined ? addressStateName.name : '' } });
    };

    const { country, city, street, state } = props.values;
    return (
        <div>
            <ListingCrudNav progress='33%' />
            <NotificationContainer />
            <div className="container">
                <div className="row">
                    <div className="listings create">
                        <div className="col-md-3">
                            <BasicsAside routes={props.routes} />
                        </div>
                        <div className="col-md-9">
                            <div className="form-group">
                                <h2>Where&rsquo;s your place located?</h2>
                                <hr />
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="city">City</label>
                                            <Autocomplete
                                                className="form-control"
                                                value={city}
                                                onChange={props.onChange}
                                                name="city"
                                                onPlaceSelected={handleOnPlaceSelected}
                                                types={['(cities)']}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="country">Country</label>
                                            <input style={{ background: '#AAA', opacity: 0.5 }} disabled className="form-control" id="country" name="country" value={country} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="street">Address</label>
                                            <Autocomplete
                                                className="form-control"
                                                value={street}
                                                onChange={props.onChange}
                                                name="street"
                                                onPlaceSelected={handleStreetSelected}
                                                types={['geocode']}
                                            />
                                            {/* <input className="form-control" id="street" name="street" value={street} onChange={props.onChange} /> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="country">State</label>
                                            <input style={{ background: '#AAA', opacity: 0.5 }} disabled className="form-control" id="state" name="state" value={state} />
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
            </div>
            <div className="navigation col-md-12">
                <div className="col-md-3">
                </div>
                <div className="col-md-7">
                    <NavLink to={props.prev} className="btn btn-default btn-back" id="btn-continue">
                        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                        &nbsp;Back</NavLink>

                    {validateInput(props.values)
                        ? <NavLink to={props.next} className="btn btn-primary btn-next" id="btn-continue" onClick={() => { props.updateProgress(5); }}>Next</NavLink>
                        : <button className="btn btn-primary btn-next disabled" onClick={() => showErrors(props.values)}>Next</button>
                    }
                </div>
            </div>
        </div>
    );
}

function validateInput(values) {
    const { street, city, country, isAddressSelected } = values;
    if (!isAddressSelected) {
        return false;
    }

    if (street.length < 6) {
        return false;
    }

    if (!city || city.trim() === '') {
        return false;
    }

    if (!country || country.trim() === '') {
        return false;
    }

    return true;
}

function showErrors(values) {
    const { street, city, country, isAddressSelected } = values;
    if (!isAddressSelected) {
        NotificationManager.warning('Select a valid address');
    }

    if (street.length < 6) {
        NotificationManager.warning('Address should be at least 6 characters long');
    }

    if (!city || city.trim() === '') {
        NotificationManager.warning('City is required');
    }

    if (!country || country.trim() === '') {
        NotificationManager.warning('Country is required');
    }
}

CreateListingLocation.propTypes = {
    values: PropTypes.any,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    updateCities: PropTypes.func,
    updateProgress: PropTypes.func,
    prev: PropTypes.string,
    next: PropTypes.string,
    convertGoogleApiAddressComponents: PropTypes.func
};