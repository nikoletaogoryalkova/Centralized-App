import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavProfile from './NavProfile';
import TripsRouter from './trips/TripsRouter';
import DashboardPage from './dashboard/DashboardPage';
import MyListingsPage from './listings/MyListingsPage';
import CalendarPage from './calendar/CalendarPage';
import MyGuestsPage from './guests/MyGuestsPage';
import MessagesPage from './messages/MessagesPage';
import MessagesChatPage from './messages/MessagesChatPage';
import ProfileEditPage from './me/ProfileEditPage';
import WalletPage from './wallet/WalletIndexPage';
import ListingsAdminPage from './admin/ListingsAdminPage';

import PropTypes from 'prop-types';

export default class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        <NavProfile />
        <Switch>
          <Route exact path="/profile/dashboard" render={() => <DashboardPage />} />
          <Route exact path="/profile/listings" render={() => <MyListingsPage />} />
          <Route exact path="/profile/listings/calendar/:id" render={() => <CalendarPage />} />
          <Route exact path="/profile/messages" render={() => <MessagesPage />} />
          <Route exact path="/profile/messages/chat/:id" render={() => <MessagesChatPage />} />
          <Route path="/profile/trips" render={() => <TripsRouter location={this.props.location} />} />
          <Route path="/profile/reservations" render={() => <MyGuestsPage />} />
          <Route path="/profile/me/edit" render={() => <ProfileEditPage />} />
          <Route path="/profile/wallet" render={() => <WalletPage />} />
          <Route path="/profile/admin" render={() => <ListingsAdminPage />} />
        </Switch>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  location: PropTypes.object,
};