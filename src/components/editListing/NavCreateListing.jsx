import React from 'react';
import { withRouter } from 'react-router-dom';

class NavCreateListing extends React.Component {

    render() {
        return (
            <div className="admin_dashboard">
                <section id="search-bar" className="step-by-step">
                    <div className="container">
                        <ul className="nav navbar-nav nav_dash_menu" style={{padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' , float: 'none' }}>
                            <p to="/listings/create/landing" style={{ float: 'none', display: 'inline-block', color: 'white', fontSize: '20px' }}>Step 1: The Basics</p>
                            <p to="/listings/create/title" style={{ float: 'none', display: 'inline-block', color: 'white', fontSize: '20px' }}>Step 2: Place description</p>
                            <p to="/listings/create/houserules" style={{ float: 'none', display: 'inline-block', color: 'white', fontSize: '20px' }}>Step 3: Guest Settings</p>
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(NavCreateListing);