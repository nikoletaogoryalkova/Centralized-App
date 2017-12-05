import React from 'react';
import observer from '../services/observer';

export default class Footer extends React.Component {
    toggleCurrency(e) {
        observer.currencyChange('EUR');
    }

    render() {
        return (
            <footer id="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h3>LockChain</h3>
                            <ul>
                                <li><a >Help</a></li>
                                <li><a >Terms and Conditions</a></li>
                                <li><a >Legal Information</a></li>
                                <li><a >Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h3>Hosting</h3>
                            <ul>
                                <li><a >Why Host</a></li>
                                <li><a >Hospitality</a></li>
                                <li><a >Responsible Hosting</a></li>
                                <li><a >Community Center</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">

                        </div>
                        <div className="col-md-2">

                            <div className="dropdown select-language">
                                <a className="dropdown-toggle" data-toggle="dropdown">English newest <span
                                    className="caret"></span></a>
                                <ul className="navbar-dropdown dropdown-menu">
                                    <li><a >English</a></li>
                                    <li><a >English</a></li>
                                </ul>
                            </div>

                            <div className="dropdown select-curency">
                                <a className="dropdown-toggle" onClick={this.toggleCurrency} data-toggle="dropdown">US Dollar <span className="caret"></span></a>
                                <ul className="navbar-dropdown dropdown-menu">
                                    <li><a >US Dollar</a></li>
                                    <li><a >LOC</a></li>
                                </ul>
                            </div>

                        </div>

                        <div className="clearfix"></div>
                    </div>
                    <div className="copyright">Copyright 2017 LockChain | All rights reserved.</div>

                </div>
            </footer>
        )
    }
}