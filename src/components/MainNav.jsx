import React from 'react';
import { Link } from 'react-router-dom';

export default class MainNav extends React.Component {
    render() {
        return (
            <header id='main-nav' className={`navbar ${this.props.home ? 'home_page' : ''}`}>
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
            </header>
        )
    }
}