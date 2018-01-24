import { NavLink } from 'react-router-dom';
import React from 'react';

export default class NavProfile extends React.Component {
    render() {
        return (
            <nav id="profile-nav">
                <div className="container">
                    <ul className="navbar-profile">
                        <li><NavLink exact activeClassName="active" to="/profile/dashboard">Dasboard</NavLink></li>
                        <li><NavLink exact activeClassName="active" to="/profile/listings">My Listings</NavLink></li>
                        <li><NavLink exact activeClassName="active" to="/profile/reservations">My Reservations</NavLink></li>
                        <li><NavLink exact activeClassName="active" to="/profile/trips">My Trips</NavLink></li>
                        <li><NavLink exact activeClassName="active" to="/profile/messages">Messages</NavLink></li>
                        <li><NavLink exact activeClassName="active" to="/profile/me/edit">Profile</NavLink></li>
                        <li><NavLink activeClassName="active" to="/admin/listings">All Listings</NavLink></li>

                        {/* <li><Link to="/profile/account/notifications">Account</Link></li> */}
                    </ul>
                </div>
            </nav>
        );
    }
}