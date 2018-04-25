import React from 'react';

import { NavLink } from 'react-router-dom';

export default class ListingsAdminNav extends React.Component {
  render() {
    return (
      <div>
        <ul className="tab-navigation">
          <li><NavLink exact activeClassName="active" to="/profile/admin/listings/published"><h2>Published</h2></NavLink></li>
          <li><NavLink exact activeClassName="active" to="/profile/admin/listings/unpublished"><h2>Unpublished</h2></NavLink></li>
        </ul>
      </div>
    );
  }
}