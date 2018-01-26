import { NavLink } from 'react-router-dom';
import React from 'react';
import { getCurrentLoggedInUserInfo } from '../../requester';

export default class NavProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUserRole: '',
            loading: true
        };
    }

    componentDidMount() {
        getCurrentLoggedInUserInfo().then((data) => {
            this.setState({ currentUserRole: data.roles[0].name, loading: false });
        });
    }

    isOnlyForAdmin() {
        if (this.state.currentUserRole === 'ADMIN') {
            return true;
        }
        return false;
    }

    render() {
        if (this.state.loading) {
            return <div className="loader"></div>;
        }

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
                        {this.isOnlyForAdmin() && <li><NavLink activeClassName="active" to="/admin/listings">All Listings</NavLink></li>}

                        {/* <li><Link to="/profile/account/notifications">Account</Link></li> */}
                    </ul>
                </div>
            </nav>
        );
    }
}