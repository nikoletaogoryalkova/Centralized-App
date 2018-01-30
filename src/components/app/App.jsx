import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import AccountNotificationsPage from '../profile/account/AccountNotificationsPage';
import BigCalendar from 'react-big-calendar';
import CalendarPage from '../profile/calendar/CalendarPage';
import { Config } from '../../config';
import CreateListingPage from '../listingCRUD/CreateListingPage';
import EditListingPage from '../listingCRUD/EditListingPage';
import HomePage from '../home/HomePage.jsx';
import ListingPage from '../listings/ListingsPage';
import PropertyPage from '../property/PropertyPage';
import React from 'react';
import moment from 'moment';
import observer from '../../services/observer';
import MainNav from '../mainNav/MainNav';
import Footer from '../footer/Footer';

import ProfilePage from '../profile/ProfilePage';

class App extends React.Component {
    constructor(props) {
        super(props);
        BigCalendar.setLocalizer(
            BigCalendar.momentLocalizer(moment)
        );
        let currency = '';
        let currencySign = '';

        if (localStorage['currency'] && localStorage['currencySign']) {
            currency = localStorage['currency'];
            currencySign = localStorage['currencySign'];
        }
        else {
            currency = 'USD';
            currencySign = '$';

            localStorage['currency'] = currency;
            localStorage['currencySign'] = currencySign;
        }

        this.state = { currency: currency, currencySign: currencySign };

        this.currencyChange = this.currencyChange.bind(this);
    }

    componentDidMount() {
        observer.currencyChange = this.currencyChange;
    }

    currencyChange(currency) {
        let currencySign = '';
        switch (currency) {
        case 'EUR': currencySign = '€';
            break;
        case 'GBP': currencySign = '£';
            break;
        default: currencySign = '$';
            break;
        }

        localStorage['currency'] = currency;
        localStorage['currencySign'] = currencySign;

        this.setState({ currency, currencySign });
    }

    isAuthenticated() {
        let token = localStorage.getItem(Config.getValue('domainPrefix') + '.auth.lockchain');
        if (token) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div>
                <MainNav />
                <Switch>
                    <Route exact path="/" render={() => <HomePage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/listings" render={() => <ListingPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/property" render={() => <PropertyPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/profile/listings/edit/:step/:id" render={() => !this.isAuthenticated() ? <Redirect to="/" /> : <EditListingPage />} />
                    <Route exact path="/profile/listings/calendar/:id" render={() => !this.isAuthenticated() ? <Redirect to="/" /> : <CalendarPage />} />
                    <Route exact path="/profile/account/notifications" render={() => !this.isAuthenticated() ? <Redirect to="/" /> : <AccountNotificationsPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route exact path="/users/resetPassword/:confirm" render={() => <HomePage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route path="/profile/listings/create" render={() => !this.isAuthenticated() ? <Redirect to="/" /> : <CreateListingPage />} />
                    <Route path="/profile/" render={() => !this.isAuthenticated() ? <Redirect to="/" /> : <ProfilePage location={this.props.location} currency={this.state.currency} currencySign={this.state.currencySign} />} />
                    <Route path="/listings/:id" render={() => <PropertyPage currency={this.state.currency} currencySign={this.state.currencySign} />} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);