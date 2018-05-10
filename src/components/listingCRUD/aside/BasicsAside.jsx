import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CreateListingAside(props) {
  return (
    <div>
      <div className="host-step"><NavLink exact activeClassName="active" to={props.routes.placetype}>Place Type</NavLink></div>
      <div className="host-step"><NavLink exact activeClassName="active" to={props.routes.accommodation}>Accommodation</NavLink></div>
      <div className="host-step"><NavLink exact activeClassName="active" to={props.routes.facilities}>Facilities</NavLink></div>
      <div className="host-step"><NavLink exact activeClassName="active" to={props.routes.safetyamenities}>Safety amenities</NavLink></div>
      <div className="host-step"><NavLink exact activeClassName="active" to={props.routes.location}>Location</NavLink></div>
    </div>
  );
}

CreateListingAside.propTypes = {
  routes: PropTypes.any,
};