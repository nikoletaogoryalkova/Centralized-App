import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import CreateListingLandingPage from './CreateListingLandingPage';
import CreateListingPlaceType from './CreateListingPlaceType';

export default class CreateListingPage extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div>
                <h1>Create listing</h1>
                <NavLink className="btn btn-default" activeClassName={'active'} to="/listings/create">Create</NavLink>
                <NavLink className="btn btn-default" activeClassName={'active'} to="/listings/create/placetype">Place Type</NavLink>

                <Switch>
                    <Route exact path="/listings/create" render={() => <CreateListingLandingPage />} />
                    <Route exact path="/listings/create/placetype" render={() => <CreateListingPlaceType />} />
                </Switch>
            </div>
        );
    }
}