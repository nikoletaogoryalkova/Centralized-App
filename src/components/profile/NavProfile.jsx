import React from 'react';

export default class NavProfile extends React.Component {
    render() {
        return (
            <nav id="profile-nav">
                <div className="container">
                    <ul className="navbar-profile">
                        {/* <li class="active">...</li> for underline */}
                        <li><a href="/profile/dashboard">Dashboard</a></li>
                        <li><a href="/profile/listings">My Listings</a></li>
                        <li><a href="/profile/reservations">My Reservations</a></li>
                        <li><a href="/profile/trips">My Trips</a></li>
                        <li><a href="/profile/messages/hosting">Messages</a></li>
                        <li><a href="/profile/me/edit">Profile</a></li>
                        <li><a href="/profile/account/notifications">Account</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}