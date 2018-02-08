import React from 'react';
import { Link } from 'react-router-dom';

const TypeNav = () => (
    <div>
        <nav id="second-nav">
            <div className="container">
                <ul className="nav navbar-nav">
                    <li className="active">
                        <Link to="/">HOMES</Link>
                    </li>
                </ul>

                <ul className="second-nav-text pull-right">
                </ul>
            </div>
        </nav>
    </div>
);

export default TypeNav;