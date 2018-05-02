import 'react-select/dist/react-select.css';

import { NotificationManager } from 'react-notifications';

import { Config } from '../../../config';
import BasicsAside from '../aside/BasicsAside';
import ListingCrudNav from '../navigation/ListingCrudNav';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';

let captcha;

export default function ListingLocAddress(props) {
  const { locAddress } = props.values;
  return <div>
    <ListingCrudNav progress='0%' />
    <div className="container">
      <div className="row">
        <div className="listings create">
          <div className="col-md-3">
            <BasicsAside routes={props.routes} />
          </div>
          <div className="col-md-9">
            <div className="form-group">
              <h2>You need to enter LOC Address in order to publish a property</h2>
              <hr />
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="street">LOC Address</label>
                    <input onChange={props.onChange} className="form-control" id="locAddress" name="locAddress" value={locAddress} />
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
        <form onSubmit={(e) => { e.preventDefault(); captcha.execute(); }}>
          {validateInput(props.values)
            ? <button type="submit" className="btn btn-primary btn-next">Next</button>
            : <button type="button" className="btn btn-primary btn-next disabled" onClick={() => showErrors(props.values)}>Next</button>
          }

          <ReCAPTCHA
            ref={el => captcha = el}
            size="invisible"
            sitekey={Config.getValue('recaptchaKey')}
            onChange={token => { props.updateLocAddress(token); captcha.reset(); }}
          />
        </form>
      </div>
    </div>
  </div>;
}

function validateInput(values) {
  const { locAddress } = values;
  if (locAddress.length < 20) {
    return false;
  }

  return true;
}

function showErrors(values) {
  const { locAddress } = values;
  if (locAddress.length < 20) {
    NotificationManager.warning('LOC Address should be at least 20 characters long');
  }
}

ListingLocAddress.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
  updateLocAddress: PropTypes.func,
  next: PropTypes.string,
  routes: PropTypes.array,
};