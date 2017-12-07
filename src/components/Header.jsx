import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import ListingSearch from './listings/ListingSearch';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav id='main-nav' className="navbar">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/"><img src="../images/logo.png" alt='logo' /></Link>
                        </div>

                        <div className="collapse navbar-collapse pull-right" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav" id="top-nav">
                            </ul>
                        </div>
                    </div>
                </nav>

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
                        <ListingSearch paramsMap={this.props.paramsMap} updateParamsMap={this.props.updateParamsMap} handleSearch={this.props.handleSearch}/>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(Header);