import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './home/HomePage.jsx';
import ListingPage from './listings/ListingsPage';
import PropertyPage from './property/PropertyPage';
import ProfilePage from './profile/ProfilePage';
import observer from '../services/observer';
import CreateListingPage from './createListing/CreateListingPage';
import CreateListingLandingPage from './createListing/CreateListingLandingPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        let currency = '';
        let currencySign = '';

        if(localStorage["currency"] && localStorage["currencySign"]) {
            currency = localStorage["currency"];
            currencySign = localStorage["currencySign"];
        }
        else {
            currency = "USD";
            currencySign= "$";

            localStorage["currency"] = currency;
            localStorage["currencySign"] = currencySign;
        }

        this.state = { currency: currency, currencySign: currencySign }
    
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
            case "GBP": currencySign = '£'
                break;
            default: currencySign = '$';
                break;
        }

        localStorage["currency"] = currency;
        localStorage["currencySign"] = currencySign;

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
                    <Route path="/create" render={() => <CreateListingLandingPage />} />
                    <Route exact path="/profile" render={() => <ProfilePage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);