import React from 'react';

export default class NavProfile extends React.Component {
    render() {
        return(
            <nav id="profile-nav">
                <div className="container">
                    <ul className="navbar-profile">
                        <li className="active"><a href="javascript://">Dashboard</a></li>
                        <li><a href="javascript://">My Listings</a></li>
                        <li><a href="javascript://">My Reservations</a></li>
                        <li><a href="javascript://">My Trips</a></li>
                        <li><a href="javascript://">Messages</a></li>
                        <li><a href="javascript://">Profile</a></li>
                        <li><a href="javascript://">Account</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}