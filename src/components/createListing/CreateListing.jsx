import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import CreateListingAside from './CreateListingAside';
import CreateListingLandingPage from './CreateListingLandingPage';
import CreateListingPlaceType from './CreateListingPlaceType';
import CreateListingAccommodation from './CreateListingAccommodation';
import CreateListingNavigation from './CreateListingNavigation';

class CreateListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            process: 1,
            step: 1,
            listingType: 1,
            location: ''
        }

        this.stepNext = this.stepNext.bind(this);
        this.stepPrev = this.stepPrev.bind(this);
        this.stepOn = this.stepOn.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    calculateProcess(step) {
        let process = 1;
        if (step >= 7) {
            process = 2;
        }
        if (step >= 10) {
            process = 3;
        }

        this.setState({ process: process });
    }

    stepNext() {
        let step = this.state.step + 1;
        this.setState({ step: step });

        this.calculateProcess(step);
    }

    stepPrev() {
        let step = this.state.step - 1;
        if (step > 0) {
            this.setState({ step: step });

            this.calculateProcess(step);
        }
    }

    stepOn(e) {
        let step = parseInt(e.target.getAttribute('data-val'), 10);

        this.setState({ step: step });

        this.calculateProcess(step);
    }

    componentDidMount() {
        let step = this.props.location.pathname[this.props.location.pathname.length - 1];

        this.calculateProcess(parseInt(step));
    }

    render() {
        return (
            <div>

                {this.props.location.pathname !== '/listings/create/1' ?
                    <section id="reservation-content-box">
                        <div className="admin_dashboard">
                            <section id="search-bar" className="step-by-step">
                                <div className="container">
                                    <ul className="nav navbar-nav nav_dash_menu" style={{ display: 'flex', justifyContent: 'space-between', float: 'none' }}>
                                        <li style={{ float: 'none', display: 'inline-block' }} className={this.state.process >= 1 ? 'active' : ''}>
                                            <a href="#">Step 1: The Basics</a>
                                        </li>
                                        <li style={{ float: 'none', display: 'inline-block' }} className={this.state.process >= 2 ? 'active' : ''}>
                                            <a href="#">Step 2: Place description</a>
                                        </li>
                                        <li style={{ float: 'none', display: 'inline-block' }} className={this.state.process >= 3 ? 'active' : ''}>
                                            <a href="#">Step 3: Guest Settings</a>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                        <div className="container">
                            <div className="row">
                                <CreateListingAside stepOn={this.stepOn} process={this.state.process} />
                                <div className="col-md-8">
                                    <Switch>
                                        <Route exact path="/listings/create/1" render={() => <CreateListingLandingPage onChange={this.onChange} />} />
                                        <Route exact path="/listings/create/2" render={() => <CreateListingPlaceType />} />
                                        <Route exact path="/listings/create/7" render={() => <CreateListingAccommodation />} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                        <CreateListingNavigation stepNext={this.stepNext} stepPrev={this.stepPrev} next={this.state.step + 1} prev={this.state.step - 1} />
                    </section>
                    : <CreateListingLandingPage stepNext={this.stepNext} onChange={this.onChange} />}
            </div>
        )
    }
}

export default withRouter(CreateListing);