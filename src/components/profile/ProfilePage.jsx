import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavLocalization from './NavLocalization';
import NavProfile from './NavProfile';
import MyTripsPage from './trips/MyTripsPage';
import DashboardPage from './dashboard/DashboardPage';
import MyListingsPage from './listings/MyListingsPage';
import CalendarPage from './calendar/CalendarPage';
import MyReservationsPage from './reservations/MyReservationsPage';
import MessagesPage from './messages/MessagesPage';
import MessagesChatPage from './messages/MessagesChatPage';
import ProfileEditPage from './me/ProfileEditPage';
import ListingsAdminPage from './admin/ListingsAdminPage';

import PropTypes from 'prop-types';

export default class ProfilePage extends React.Component {
    render() {
        return (
            <div>
                <NavLocalization />
                <NavProfile />
                <Switch>
                    <Route exact path="/profile/dashboard" render={() => <DashboardPage />} />
                    <Route exact path="/profile/listings" render={() => <MyListingsPage />} />
                    <Route exact path="/profile/listings/calendar/:id" render={() => <CalendarPage />} />
                    <Route exact path="/profile/reservations" render={() => <MyReservationsPage />} />
                    <Route exact path="/profile/trips" render={() => <MyTripsPage location={this.props.location} />} />
                    <Route exact path="/profile/messages" render={() => <MessagesPage />} />
                    <Route exact path="/profile/messages/chat/:id" render={() => <MessagesChatPage />} />
                    <Route path="/profile/me/edit" render={() => <ProfileEditPage />} />
                    <Route path="/profile/admin" render={() => <ListingsAdminPage />} />
                </Switch>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    location: PropTypes.object,
};