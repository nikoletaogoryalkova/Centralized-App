import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class NavCreateListing extends React.Component {

    render() {
        return (
            <div className="admin_dashboard">
                <section id="search-bar" className="step-by-step">
                    <div className="container">
                        <ul className="nav navbar-nav nav_dash_menu" style={{ display: 'flex', justifyContent: 'space-between', float: 'none' }}>
                            <NavLink to="/listings/create/landing" style={{ float: 'none', display: 'inline-block', color: 'white', fontSize: '20px' }}>Step 1: The Basics</NavLink>
                            <NavLink to="/listings/create/title" style={{ float: 'none', display: 'inline-block', color: 'white', fontSize: '20px' }}>Step 2: Place description</NavLink>
                            <NavLink to="/listings/create/houserules" style={{ float: 'none', display: 'inline-block', color: 'white', fontSize: '20px' }}>Step 3: Guest Settings</NavLink>

                            {/* <li style={{ float: 'none', display: 'inline-block' }}>
                                <a href="#">Step 1: The Basics</a>
                            </li>
                            <li style={{ float: 'none', display: 'inline-block' }}>
                                <a href="#">Step 2: Place description</a>
                            </li>
                            <li style={{ float: 'none', display: 'inline-block' }}>
                                <a href="#">Step 3: Guest Settings</a>
                            </li> */}
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(NavCreateListing);