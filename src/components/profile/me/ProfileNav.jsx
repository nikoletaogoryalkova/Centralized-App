import React from 'react';

export default class ProfileNav extends React.Component {
    render() {
        return (
            <div id="profile-nav-side">
                <ul>
                    <li className="active"><span>Edit Profile</span></li>
                    <li><span>Photos</span></li>
                    <li><span>Trust and Verification</span></li>
                    <li><span>Reviews</span></li>
                </ul>
            </div>
        );
    }
}