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

import ProfilePage from '../profile/ProfilePage';
import PropTypes from 'prop-types';

import { HotelReservation } from '../../services/blockchain/hotelReservation.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        BigCalendar.setLocalizer(
            BigCalendar.momentLocalizer(moment)
        );


        // let jsonFile = '{ "version": 3, "id": "1ddf0087-79e0-48d9-a84b-5d364075a804", "address": "627306090abaB3A6e1400e9345bC60c78a8BEf57", "Crypto": { "ciphertext": "6d845d338f2cfc526adc5d49b5f95c13690b59ef56c9eb2c79e4ff7740adcc77", "cipherparams": { "iv": "f506358d43a8cd8bea70b34b3bd97190" }, "cipher": "aes-128-ctr", "kdf": "scrypt", "kdfparams": { "dklen": 32, "salt": "e15ccf22e4e35a5a321885c562e265d9fd7d0fbede7894e9195108bbf40563a2", "n": 1024, "r": 8, "p": 1 }, "mac": "2295347e6e31672df9e9e651f6d6593d769c848e9ceb2b15dd5e09fd2aaa4992" } }'
        let jsonFile = '{"version":3,"id":"baf57050-4349-45c9-894f-ad18fa370f38","address":"6524083c3a4b06cac3bb2d13c7c2bc3aeb50c680","Crypto":{"ciphertext":"39eca1a673e934972e4cc0c508f25f0606425d7df269a37caa9a8b2fb1c75add","cipherparams":{"iv":"c65fc6284df3104992d101d7ba543f78"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"77a5a81b34ca83a2c05d4d5278822f39647b05fd3ca10f1e997e47861f3ebd60","n":8192,"r":8,"p":1},"mac":"cd6c41f594ede562a2d0a79c62730361bb39f26d3b1ade5d3561fcddbeba2e0d"}}'
        let password = '123456789';

        const currentTimestamp = Date.now() / 1000 | 0;
        const day = 24 * 60 * 60;

        const hotelReservationId = 'udri10412123123892457';
        const reservationCostLOC = '1000';
        const reservationStartDate = currentTimestamp + (day * 1);
        const reservationEndDate = currentTimestamp + (day * 2);
        const daysBeforeStartForRefund = '1';
        const refundPercantage = '10';
        const hotelId = "hotelId1";
        const roomId = "roomId1";
        const numberOfTravelers = '2';

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
        //     numberOfTravelers).then(result => {
        //         console.log(result);
        //     });

        HotelReservation.getReservation(hotelReservationId);

        // HotelReservation.cancelReservation(jsonFile, password, hotelReservationId);
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