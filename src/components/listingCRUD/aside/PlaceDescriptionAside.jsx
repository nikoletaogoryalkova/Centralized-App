import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PlaceDescriptionAside(props) {
  return (
    <div>
      <div className="host-step"><NavLink exact activeClassName="active" to={props.routes.description}>Description</NavLink></div>
      <div className="host-step"><NavLink exact activeClassName="active" to={props.routes.photos}>Photos</NavLink></div>
    </div>
  );
}

PlaceDescriptionAside.propTypes = {
  routes: PropTypes.any,
};