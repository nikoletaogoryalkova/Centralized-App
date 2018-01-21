import React from 'react';

import MainNav from '../MainNav';
import NavLocalization from './NavLocalization';
import NavProfile from './NavProfile';

export default class ProfileHeader extends React.Component {
    render() {
        return (
            <div>
                <nav id="main-nav" className="navbar">
                    <MainNav />
                </nav>
                <NavLocalization />
                <NavProfile />
            </div>
        );
    }
}