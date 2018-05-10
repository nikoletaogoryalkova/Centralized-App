import React from 'react';

import { NavLink } from 'react-router-dom';

export default class ProfileNav extends React.Component {
  render() {
    return (
      <div>
        <div className="host-step"><NavLink exact activeClassName="active" to="/profile/me/edit">Edit Profile</NavLink></div>
        <div className="host-step"><NavLink exact activeClassName="active" to="/profile/me/edit/photos">Photos</NavLink></div>
        {/* <div className="host-step"><NavLink exact activeClassName="active" to="/profile/me/verification">Trist and Verification</NavLink></div>
                <div className="host-step"><NavLink exact activeClassName="active" to="/profile/me/reviews">Reviews</NavLink></div> */}
      </div>
    );
  }
}