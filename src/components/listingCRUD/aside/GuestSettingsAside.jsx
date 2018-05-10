import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function GuestSettingsAside(props) {
  return (
    <div>
      <div className="host-step"><NavLink exact activeClassName="active" to={props.routes.houserules}>House Rules</NavLink></div>
      <div className="host-step"><NavLink exact activeClassName="active" to={props.routes.checking}>Check-in / Check-out</NavLink></div>
      <div className="host-step"><NavLink exact activeClassName="active" to={props.routes.price}>Price</NavLink></div>
    </div>
  );
}

GuestSettingsAside.propTypes = {
  routes: PropTypes.any,
};