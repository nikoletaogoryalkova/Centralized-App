import React from 'react';
import { NavLink } from 'react-router-dom';

const PropertyTypeNav = () => (
    <div>
        <nav id="second-nav">
            <div className="container">
                <ul className="nav navbar-nav">
                    <li><NavLink to="/hotels" activeClassName="active">HOTELS</NavLink></li>
                    <li><NavLink to="/homes" activeClassName="active">HOMES</NavLink></li>
                </ul>
            </div>
        </nav>
    </div>
);

export default PropertyTypeNav;