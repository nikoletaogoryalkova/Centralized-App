import React from 'react';

import NavLocalization from './NavLocalization';
import NavProfile from './NavProfile';

export default class ProfileHeader extends React.Component {
  render() {
    return (
      <div>
        <NavLocalization />
        <NavProfile />
      </div>
    );
  }
}