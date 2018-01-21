import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import CreateListingBasicsAside from './basics/CreateListingBasicsAside';
import NavCreateListing from './NavCreateListing';
import ReCAPTCHA from 'react-google-recaptcha';

export default class CreateListingLocAddress extends React.Component {
    constructor(props) {
        super(props);

        this.validateInput = this.validateInput.bind(this);
        this.showErrors = this.showErrors.bind(this);
    }
    validateInput() {
        const { locAddress } = this.props.values;
        if (locAddress.length < 20) {
            return false;
        }

        return true;
    }

    showErrors() {
        const { locAddress } = this.props.values;
        if (locAddress.length < 20) {
            NotificationManager.warning("LOC Address should be at least 20 characters long");
        }
    }

    render() {
        const { userHasLocAddress, locAddress } = this.props.values;
        return <div>
            <NavCreateListing progress='0%' />
            <NotificationContainer />
            <div className="container">
                <div className="row">
                    <div className="listings create">
                        <div className="col-md-3">
                            <CreateListingBasicsAside />
                        </div>
                        <div className="col-md-9">
                            <div className="form-group">
                                <h2>You need to enter LOC Address in order to publish a property</h2>
                                <hr />
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="street">LOC Address</label>
                                            <input onChange={this.props.onChange} className="form-control" id="locAddress" name="locAddress" value={locAddress} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="navigation col-md-12">
                <div className="col-md-3">
                </div>
                <div className="col-md-7">
                    <form onSubmit={(e) => { e.preventDefault(); this.captcha.execute() }}>
                        {this.validateInput()
                            ? <button type="button" className="btn btn-primary btn-next">Next</button>
                            : <button type="button" className="btn btn-primary btn-next disabled" onClick={this.showErrors}>Next</button>
                        }

                        <ReCAPTCHA
                            ref={el => this.captcha = el}
                            size="invisible"
                            sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                            onChange={token => { this.props.updateLocAddress(token); this.captcha.reset(); }}
                        />
                    </form>
                </div>
            </div>
        </div>
    }
}