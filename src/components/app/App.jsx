import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import AccountNotificationsPage from '../profile/account/AccountNotificationsPage';
import BigCalendar from 'react-big-calendar';
import CalendarPage from '../profile/calendar/CalendarPage';
import { Config } from '../../config';
import CreateListingPage from '../listingCRUD/CreateListingPage';
import EditListingPage from '../listingCRUD/EditListingPage';
import HomeRouterPage from '../home/HomeRouterPage';
import HomesRouterPage from '../homes/HomesRouterPage';
import HotelsRouterPage from '../hotels/HotelsRouterPage';
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import MainNav from '../mainNav/MainNav';
import Footer from '../footer/Footer';
import AttachedFooter from '../footer/AttachedFooter';
import NavLocalization from '../profile/NavLocalization';

import ProfilePage from '../profile/ProfilePage';
import PropTypes from 'prop-types';

import { TokenTransactions } from '../../services/blockchain/tokenTransactions.js'
import { HotelReservation } from '../../services/blockchain/hotelReservation.js'
import { transactionCostInEth, transactionCostInLoc } from '../../services/blockchain/utils/ethFuncs.js'
const gasConfig = require('../../services/blockchain/config/gas-config.json');

class App extends React.Component {
    constructor(props) {
        super(props);
        BigCalendar.setLocalizer(
            BigCalendar.momentLocalizer(moment)
        );
        let jsonFile = '{"version":3,"id":"c22cfc55-5289-429a-b655-8cec0f942f7b","address":"2b8e7487cdacc95889252fc77b5e8e757af666e6","Crypto":{"ciphertext":"bfca91b96b03120f0dc79b27ead2a34a36c5a41dbd8de8847e85ef02c15330ad","cipherparams":{"iv":"5cb2dc69ab5e338fa07a8dad50e68000"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"6afe091b6717744146dca91f7a072e09047a6aebc431436b7a9030a2740fd688","n":1024,"r":8,"p":1},"mac":"e3c58b4da610a173497cb22c0fa1dfd94dcdfb25dd9235b9e852436f8a9c5b73"}}'
        let password = '123456789';
        let recipient = '0x6524083C3A4B06CAc3Bb2D13c7C2BC3aeB50C680';
        let owner = '0x2b8e7487cdacc95889252fc77b5e8e757af666e6';
        let amount = 1000;

        TokenTransactions.sendTokens(jsonFile, password, recipient, amount).then(function (txhash) {
            console.log(txhash)
        });
        const currentTimestamp = Date.now() / 1000 | 0;
        const day = 24 * 60 * 60;

        const hotelReservationId = 'udri1032';
        const reservationCostLOC = '10';
        const reservationStartDate = currentTimestamp + (day * 5);
        const reservationEndDate = currentTimestamp + (day * 10);
        const daysBeforeStartForRefund = '1';
        const refundPercantage = '10';
        const hotelId = "hotelId1";
        const roomId = "roomId1";
        const numberOfTravelers = '2';

        const txCost = transactionCostInEth(owner, gasConfig.approve)
        console.log(txCost);

        // HotelReservation.createReservation(jsonFile,
        //     password,
        //     hotelReservationId,
        //     reservationCostLOC,
        //     reservationStartDate,
        //     reservationEndDate,
        //     daysBeforeStartForRefund,
        //     refundPercantage,
        //     hotelId,
        //     roomId,
        //     numberOfTravelers).then(function (txhash) {
        //         console.log(txhash);
        //     });
        // HotelReservation.getReservation(hotelReservationId).then(function (txhash) {
        //     console.log(txhash);
        // });

        // HotelReservation.cancelReservation(jsonFile, password, hotelReservationId).then(function (txhash) {
        //     console.log(txhash);
        // });
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
                <NavLocalization />
                <Switch>
                    <Route exact path="/" render={() => <HomeRouterPage />} />
                    <Route exact path="/profile/listings/edit/:step/:id" render={() => !this.isAuthenticated() ? <Redirect to="/" /> : <EditListingPage />} />
                    <Route exact path="/profile/listings/calendar/:id" render={() => !this.isAuthenticated() ? <Redirect to="/" /> : <CalendarPage />} />
                    <Route exact path="/profile/account/notifications" render={() => !this.isAuthenticated() ? <Redirect to="/" /> : <AccountNotificationsPage />} />
                    <Route exact path="/users/resetPassword/:confirm" render={() => <HomeRouterPage />} />
                    <Route path="/homes" render={() => <HomesRouterPage />} />
                    <Route path="/hotels" render={() => <HotelsRouterPage />} />
                    <Route path="/profile/listings/create" render={() => !this.isAuthenticated() ? <Redirect to="/" /> : <CreateListingPage />} />
                    <Route path="/profile/" render={() => !this.isAuthenticated() ? <Redirect to="/" /> : <ProfilePage location={this.props.location} />} />
                    <Route render={() => <HomeRouterPage />} />
                </Switch>
                <Footer />
                <AttachedFooter />
            </div>
        );
    }
}

App.propTypes = {
    // start Router props
    location: PropTypes.object,

    // start Redux props
    dispatch: PropTypes.func,
    paymentInfo: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(App));

function mapStateToProps(state) {
    const { paymentInfo } = state;
    return {
        paymentInfo
    };
}