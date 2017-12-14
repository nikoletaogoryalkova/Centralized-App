import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import HomePage from './home/HomePage.jsx';
import ListingPage from './listings/ListingsPage';
import PropertyPage from './property/PropertyPage';

import DashboardPage from './profile/dashboard/DashboardPage';
import MyListingsPage from './profile/listings/MyListingsPage';
import MyReservationsPage from './profile/reservations/MyReservationsPage';
import MyTripsPage from './profile/trips/MyTripsPage';
import MessagesHostingPage from './profile/messages/MessagesHostingPage';
import MessagesTravelingPage from './profile/messages/MessagesTravelingPage';
import MessagesChatPage from './profile/messages/MessagesChatPage';
import ProfileEditPage from './profile/me/ProfileEditPage';
import AccountNotificationsPage from './profile/account/AccountNotificationsPage';

import CreateListingPage from './createListing/CreateListingPage';

import observer from '../services/observer';

class App extends React.Component {
    constructor(props) {
        super(props);
        let currency = '';
        let currencySign = '';

        if (localStorage["currency"] && localStorage["currencySign"]) {
            currency = localStorage["currency"];
            currencySign = localStorage["currencySign"];
        }
        else {
            currency = "USD";
            currencySign = "$";

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
                    <Route path="/listings/create" render={() => <CreateListingPage />} />
                    <Route path="/listings/:id" render={() => <PropertyPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/property" render={() => <PropertyPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/profile/dashboard" render={() => <DashboardPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/profile/listings" render={() => <MyListingsPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/profile/reservations" render={() => <MyReservationsPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/profile/trips" render={() => <MyTripsPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/profile/messages/hosting" render={() => <MessagesHostingPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/profile/messages/traveling" render={() => <MessagesTravelingPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/profile/messages/chat" render={() => <MessagesChatPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/profile/me/edit" render={() => <ProfileEditPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/profile/account/notifications" render={() => <AccountNotificationsPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);