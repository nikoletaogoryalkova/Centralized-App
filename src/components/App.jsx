import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './home/HomePage.jsx';
import ListingPage from './listings/ListingsPage';
import PropertyPage from './property/PropertyPage';
import observer from '../services/observer';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { currency: "USD" }

        this.currencyChange = this.currencyChange.bind(this);
    }

    componentDidMount() {
        observer.currencyChange = this.currencyChange;
    };

    currencyChange(currency) {
        this.setState({currency});
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={() => <HomePage currency={this.state.currency} />} />
                    <Route exact path="/listings" component={ListingPage} />
                    <Route exact path="/listings/:id" component={PropertyPage} />
                    <Route exact path="/property" component={PropertyPage} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);