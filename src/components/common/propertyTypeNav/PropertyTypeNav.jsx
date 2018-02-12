import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

function PropertyTypeNav(props) {
    return (
        <div>
            <nav id="second-nav">
                <div className="container">
                    <ul className="nav navbar-nav">
                        <li><NavLink to='/hotels' activeClassName="active">HOTELS</NavLink></li>
                        <li><NavLink to='/homes' activeClassName="active">HOMES</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default withRouter(PropertyTypeNav);