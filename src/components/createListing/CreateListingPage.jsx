import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

import NavMain from './NavMain';
import CreateListingPlaceType from './CreateListingPlaceType';
import Footer from '../Footer';

export default class CreateListingPage extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div>
                <NavLink className="btn btn-default" activeClassName={'active'} to="/listings/create">Create</NavLink>
                <NavLink className="btn btn-default" activeClassName={'active'} to="/listings/create/placetype">Place Type</NavLink>

                <NavMain />
                <section id="reservation-content-box">
                    <div className="container">

                        <div className="row">
                            <div className="col-md-3">
                                <div className="host-step">Place Type</div>
                                <div className="host-step active">Accommodation</div>
                                <div className="host-step">Facilities</div>
                                <div className="host-step">Safety amenities</div>
                                <div className="host-step">Location</div>
                            </div>
                            <div className="col-md-8">
                                <Switch>
                                    <Route exact path="/listings/create/placetype" render={() => <CreateListingPlaceType />} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}