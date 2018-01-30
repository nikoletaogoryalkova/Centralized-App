import { Link, withRouter } from 'react-router-dom';

import ListingSearch from './listings/ListingSearch';
import React from 'react';

class Header extends React.Component {
    render() {
        return (
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

                <section id="search-bar">
                    <div className="container">
                        <ListingSearch paramsMap={this.props.paramsMap} updateParamsMap={this.props.updateParamsMap} handleSearch={this.props.handleSearch} />
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(Header);