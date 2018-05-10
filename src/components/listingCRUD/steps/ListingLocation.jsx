import 'react-select/dist/react-select.css';
import { withRouter } from 'react-router-dom';

import { NotificationManager } from 'react-notifications';

import Autocomplete from 'react-google-autocomplete';
import BasicsAside from '../aside/BasicsAside';
import ListingCrudNav from '../navigation/ListingCrudNav';
import PropTypes from 'prop-types';
import React from 'react';
import FooterNav from '../navigation/FooterNav';

function CreateListingLocation(props) {

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
        props.onChange({ target: { name: 'street', value: address } });
        props.onChange({ target: { name: 'isAddressSelected', value: true } });
        props.onChange({ target: { name: 'lng', value: place.geometry.location.lng() } });
        props.onChange({ target: { name: 'lat', value: place.geometry.location.lat() } });
        changeAddressComponents(addressComponentsMap);
      } else {
        NotificationManager.warning('Invalid address');
        props.onChange({ target: { name: 'street', value: '' } });
        props.onChange({ target: { name: 'lng', value: '' } });
        props.onChange({ target: { name: 'lat', value: '' } });
        props.onChange({ target: { name: 'isAddressSelected', value: false } });
      }
    }
  };

  const changeAddressComponents = (addressComponentsMap) => {
    let addressCountry = addressComponentsMap.filter(x => x.type === 'country')[0];
    let addressCityName = addressComponentsMap.filter(x => x.type === 'locality')[0];
    let addressStateName = addressComponentsMap.filter(x => x.type === 'administrative_area_level_1')[0];

    props.onChange({ target: { name: 'country', value: addressCountry ? addressCountry.name : '' } });
    props.onChange({ target: { name: 'city', value: addressCityName ? addressCityName.name : '' } });
    props.onChange({ target: { name: 'state', value: addressStateName ? addressStateName.name : '' } });
    props.onChange({ target: { name: 'countryCode', value: addressCountry ? addressCountry.shortName : '' } });
  };

  const onAddressChange = (e) => {
    props.onChange({ target: { name: 'isAddressSelected', value: false } });
    props.onChange(e);
  };

  const { country, city, street, state } = props.values;
  const next = validateInput(props.values) ? props.next : props.location.pathname;
  const handleClickNext = validateInput(props.values) 
    ? () => { props.updateProgress(1); }
    : () => { showErrors(props.values); };

  return (
    <div>
      <ListingCrudNav progress='33%' />
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
                        onChange={onAddressChange}
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
      <FooterNav next={next} prev={props.prev} handleClickNext={handleClickNext} step={5} />
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
  convertGoogleApiAddressComponents: PropTypes.func,
  routes: PropTypes.object,

  // Router props
  location: PropTypes.object,
};

export default withRouter(CreateListingLocation);