import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './home/HomePage.jsx';
import ListingPage from './listings/ListingsPage';
import PropertyPage from './property/PropertyPage';
import observer from '../services/observer';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { currency: "USD", currencySign: "$" }

        this.currencyChange = this.currencyChange.bind(this);
    }

    componentDidMount() {
        observer.currencyChange = this.currencyChange;
    };

    currencyChange(currency) {
        let currencySign = '';
        switch (currency) {
            case "EUR": currencySign = '€'
                break;
            case "LOC": currencySign = 'LOC'
                break;
            default: currencySign = '$';
                break;
        }

        this.setState({ currency, currencySign });
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={() => <HomePage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/listings" render={() => <ListingPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route path="/listings/:id" render={() => <PropertyPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/property" render={() => <PropertyPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);