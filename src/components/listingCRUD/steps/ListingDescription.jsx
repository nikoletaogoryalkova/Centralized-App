import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';

import PlaceDescriptionAside from '../aside/PlaceDescriptionAside';
import ListingCrudNav from '../navigation/ListingCrudNav';
import Textarea from '../textbox/Textarea';

export default function CreateListingDescription(props) {
  const { text, interaction } = props.values;
  return (
    <div>
      <ListingCrudNav progress='66%' />
      <NotificationContainer />
      <div className="container">
        <div className="row">
          <div className="listings create">
            <div className="col-md-3">
              <PlaceDescriptionAside routes={props.routes} />
            </div>
            <div className="reservation-hotel-review-room col-md-9">
              <h2>Tell your guests about your place</h2>
              <hr />

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Summary</label>
                    <Textarea
                      name="text"
                      value={text}
                      placeholder="Describe your place..."
                      rows={5}
                      onChange={props.onChange}
                    />
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>

              <h2>Tell your guests about the neighborhood</h2>
              <hr />

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>The neighborhood (optional)</label>
                    <Textarea
                      name="interaction"
                      value={interaction}
                      placeholder="Describe what's near by, how to get around, etc..."
                      rows={5}
                      onChange={props.onChange}
                    />
                  </div>
                </div>
                <div className="clearfix"></div>
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
            ? <NavLink to={props.next} className="btn btn-primary btn-next" id="btn-continue" onClick={() => { props.updateProgress(6); }}>Next</NavLink>
            : <button className="btn btn-primary btn-next disabled" onClick={() => showErrors(props.values)}>Next</button>
          }
        </div>
      </div>
    </div>
  );
}

function validateInput(values) {
  const { text } = values;
  if (text.length < 6) {
    return false;
  }

  return true;
}

function showErrors(values) {
  const { text } = values;
  if (text.length < 6) {
    NotificationManager.warning('Summary should be at least 6 characters long');
  }
}

CreateListingDescription.propTypes = {
  values: PropTypes.any,
  onChange: PropTypes.func,
  updateProgress: PropTypes.func,
  prev: PropTypes.string,
  next: PropTypes.string,
  routes: PropTypes.array,
};