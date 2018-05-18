import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

function ListingTypeNav(props) {
  return (
    <ul className="tabset">
      <li className={props.location.pathname.indexOf('/hotels') !== -1 ? 'active' : ''}><NavLink to='/hotels' activeClassName="active">HOTELS</NavLink></li>
      <li className={props.location.pathname.indexOf('/homes') !== -1 ? 'active' : ''}><NavLink to='/homes' activeClassName="active">HOMES</NavLink></li>
    </ul>
  );
}

export default withRouter(ListingTypeNav);