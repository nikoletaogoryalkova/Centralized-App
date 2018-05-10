import React from 'react';

import { NavLink } from 'react-router-dom';

export default function TripsNav() {
  return (
    <div>
      <ul className="tab-navigation">
        <li><NavLink exact activeClassName="active" to="/profile/trips/hotels"><h2>Hotels</h2></NavLink></li>
        <li><NavLink exact activeClassName="active" to="/profile/trips/homes"><h2>Homes</h2></NavLink></li>
      </ul>
    </div>
  );
}