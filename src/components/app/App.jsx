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

import { HotelReservation } from '../../services/blockchain/hotelReservation.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        BigCalendar.setLocalizer(
            BigCalendar.momentLocalizer(moment)
        );

        // let jsonFile = '{"version":3,"id":"d44f162d-1f91-4ade-9d5f-414661295df0","address":"b63df2068d209f8ff3925c4c9dbbabfd31301825","Crypto":{"ciphertext":"2d40317fc74b4ea71930a0a6681507addc103e127e65a663cf731537ef79726d","cipherparams":{"iv":"f90df4df3a67d85e7e34f84a7c0b15fd"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"473b462c67127e8260fea0ff7fe716d17b6792278160937a29d8875294d0f92a","n":8192,"r":8,"p":1},"mac":"b94eada113e11314895cb559bd79e72c0dc27eb15ed4ebb666ffb80977859f13"}}'
        let password = '123456789';
        let jsonFile = '{"version":3,"id":"a8dfc521-54c3-4e3f-88e6-d6dda4dfc2a8","address":"c600f06141cd6685c59a5f346cdd3c967b18d8df","Crypto":{"ciphertext":"a77da4feab489f01057e9268aa0a423cf0832533cc26e08607a29114f4368d5b","cipherparams":{"iv":"47f5be03585de2a99709eec69c7fc332"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"216bb226a925e96a3c3bd79c3a1081c681d7c005156601979c6bbd6e25e45240","n":1024,"r":8,"p":1},"mac":"125d69531321d8c733bd1af01d7d06fefca65c45a6efd13b3ae5cda536c7c831"}}'
        // let jsonFile = '{ "version": 3, "id": "1ddf0087-79e0-48d9-a84b-5d364075a804", "address": "627306090abaB3A6e1400e9345bC60c78a8BEf57", "Crypto": { "ciphertext": "6d845d338f2cfc526adc5d49b5f95c13690b59ef56c9eb2c79e4ff7740adcc77", "cipherparams": { "iv": "f506358d43a8cd8bea70b34b3bd97190" }, "cipher": "aes-128-ctr", "kdf": "scrypt", "kdfparams": { "dklen": 32, "salt": "e15ccf22e4e35a5a321885c562e265d9fd7d0fbede7894e9195108bbf40563a2", "n": 1024, "r": 8, "p": 1 }, "mac": "2295347e6e31672df9e9e651f6d6593d769c848e9ceb2b15dd5e09fd2aaa4992" } }'

        const currentTimestamp = Date.now() / 1000 | 0;
        const day = 24 * 60 * 60;

        const hotelReservationId = 'udri20';
        const reservationCostLOC = '10';
        const reservationStartDate = currentTimestamp + (day * 1);
        const reservationEndDate = currentTimestamp + (day * 2);
        const daysBeforeStartForRefund = ['1'];
        const refundPercantage = ['90'];
        const hotelId = "hotelId1";
        const roomId = "roomId1";
        const numberOfTravelers = '2';
        const start = '1518685200';
        const end = '1519722000';

        HotelReservation.createReservation(jsonFile,
            password,
            hotelReservationId,
            reservationCostLOC,
            reservationStartDate,
            reservationEndDate,
            daysBeforeStartForRefund,
            refundPercantage,
            hotelId,
            roomId,
            numberOfTravelers).then(function (txHash) {
                console.log(txHash)
            });

        // HotelReservation.getReservation(hotelReservationId).then(function (txHash) {
        //     console.log(txHash)
        // });

        // HotelReservation.cancelReservation(jsonFile, password, hotelReservationId).then(function (txHash) {
        //     console.log(txHash)
        // });
        // HotelReservation.disputeReservation(jsonFile, password, hotelReservationId).then(function (txHash) {
        //     console.log(txHash)
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