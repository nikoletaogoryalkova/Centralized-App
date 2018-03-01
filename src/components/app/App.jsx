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
import { TokenTransactions } from "../../services/blockchain/tokenTransactions";
import { HotelReservation } from "../../services/blockchain/hotelReservation";

class App extends React.Component {
	constructor(props) {
		super(props);
		BigCalendar.setLocalizer(
			BigCalendar.momentLocalizer(moment)
		);

		let jsonFile = '{ "version": 3, "id": "1ddf0087-79e0-48d9-a84b-5d364075a804", "address": "627306090abab3a6e1400e9345bc60c78a8bef57", "Crypto": { "ciphertext": "6d845d338f2cfc526adc5d49b5f95c13690b59ef56c9eb2c79e4ff7740adcc77", "cipherparams": { "iv": "f506358d43a8cd8bea70b34b3bd97190" }, "cipher": "aes-128-ctr", "kdf": "scrypt", "kdfparams": { "dklen": 32, "salt": "e15ccf22e4e35a5a321885c562e265d9fd7d0fbede7894e9195108bbf40563a2", "n": 1024, "r": 8, "p": 1 }, "mac": "2295347e6e31672df9e9e651f6d6593d769c848e9ceb2b15dd5e09fd2aaa4992" } }'
		let password = '123456789';

		var currentTimestamp = Date.now() / 1000 | 0;
		const day = 24 * 60 * 60;

		const hotelReservationId = 'id6';
		const reservationCostLOC = '10000000000';
		const reservationStartDate = currentTimestamp + day;
		const reservationEndDate = currentTimestamp + (day * 3);
		const daysBeforeStartForRefund = '10';
		const refundPercantage = '20';
		const hotelId = "hotelId1";
		const roomId = "roomId1";

		HotelReservation.createReservation(jsonFile,
			password,
			hotelReservationId,
			reservationCostLOC,
			reservationStartDate,
			reservationEndDate,
			daysBeforeStartForRefund,
			refundPercantage,
			hotelId,
			roomId);
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
				<MainNav/>
				<Switch>
					<Route exact path="/" render={() => <HomeRouterPage/>}/>
					<Route exact path="/profile/listings/edit/:step/:id"
					       render={() => !this.isAuthenticated() ? <Redirect to="/"/> : <EditListingPage/>}/>
					<Route exact path="/profile/listings/calendar/:id"
					       render={() => !this.isAuthenticated() ? <Redirect to="/"/> : <CalendarPage/>}/>
					<Route exact path="/profile/account/notifications"
					       render={() => !this.isAuthenticated() ? <Redirect to="/"/> : <AccountNotificationsPage/>}/>
					<Route exact path="/users/resetPassword/:confirm" render={() => <HomeRouterPage/>}/>
					<Route path="/homes" render={() => <HomesRouterPage/>}/>
					<Route path="/hotels" render={() => <HotelsRouterPage/>}/>
					<Route path="/profile/listings/create"
					       render={() => !this.isAuthenticated() ? <Redirect to="/"/> : <CreateListingPage/>}/>
					<Route path="/profile/" render={() => !this.isAuthenticated() ? <Redirect to="/"/> :
						<ProfilePage location={this.props.location}/>}/>
					<Route render={() => <HomeRouterPage/>}/>
				</Switch>
				<Footer/>
				<AttachedFooter/>
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
	const {paymentInfo} = state;
	return {
		paymentInfo
	};
}