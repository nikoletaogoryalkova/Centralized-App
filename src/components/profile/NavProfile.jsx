import React from 'react';

import {Link} from 'react-router-dom';

export default class NavProfile extends React.Component {
    render() {
        return (
            <nav id="profile-nav">
                <div className="container">
                    <ul className="navbar-profile">
                        <li><Link to="/profile/dashboard">Dashboard</Link></li>
                        <li><Link to="/profile/listings">My Listings</Link></li>
                        <li><Link to="/profile/reservations">My Reservations</Link></li>
                        <li><Link to="/profile/trips">My Trips</Link></li>
                        <li><Link to="/profile/messages">Messages</Link></li>
                        <li><Link to="/profile/me/edit">Profile</Link></li>
                        {/* <li><Link to="/profile/account/notifications">Account</Link></li> */}
                    </ul>
                </div>
            </nav>
        )
    }
}