import React from 'react';

export default class NavProfile extends React.Component {
    render() {
        return (
            <nav id="profile-nav">
                <div className="container">
                    <ul className="navbar-profile">
                        <li className="active"><a>Dashboard</a></li>
                        <li><a>My Listings</a></li>
                        <li><a>My Reservations</a></li>
                        <li><a>My Trips</a></li>
                        <li><a>Messages</a></li>
                        <li><a>Profile</a></li>
                        <li><a>Account</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}