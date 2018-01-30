import { DropdownButton, MenuItem } from 'react-bootstrap';

import React from 'react';
import observer from '../../services/observer';

export default class Footer extends React.Component {
    toggleCurrency(currency) {
        observer.currencyChange(currency);
    }

    render() {
        return (
            <footer id="main-footer" className="clearfix">
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
                                <a className="dropdown-toggle" data-toggle="dropdown">English newest</a>
                                <ul className="navbar-dropdown dropdown-menu">
                                    <li><a >English</a></li>
                                    <li><a >English</a></li>
                                </ul>
                            </div>

                            <select onChange={(e) => this.toggleCurrency(e.target.value)} value={localStorage['currency'] ? localStorage['currency'] : 'USD'} className="currency-switcher">
                                <option value="GBP">£ GBP</option>
                                <option value="EUR">€ EUR</option>
                                <option value="USD">$ USD</option>
                            </select>

                            {/* <DropdownButton block={true} title={localStorage['currency'] ? localStorage['currency'] : 'USD'} id="bg-nested-dropdown">
                                <MenuItem onClick={() => this.toggleCurrency('GBP')}>£ GBP</MenuItem>
                                <MenuItem onClick={() => this.toggleCurrency('EUR')}>€ EUR</MenuItem>
                                <MenuItem onClick={() => this.toggleCurrency('USD')}>$ USD</MenuItem>
                            </DropdownButton> */}
                        </div>

                        <div className="clearfix"></div>
                    </div>
                    <div className="copyright">Copyright 2017 LockChain | All rights reserved.</div>

                </div>
            </footer>
        );
    }
}