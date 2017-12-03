import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './home/HomePage.jsx';
import ListingPage from './listings/ListingsPage';
import PropertyPage from './property/PropertyPage';

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/listings" component={ListingPage} />
                    <Route exact path="/listings/:id" component={PropertyPage} />
                    <Route exact path="/property" component={PropertyPage} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);