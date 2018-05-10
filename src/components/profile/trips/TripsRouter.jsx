import { Route, Redirect, Switch } from 'react-router-dom';

import React from 'react';
import TripsNav from './TripsNav';
import HotelTripsPage from './HotelTripsPage';
import HomeTripsPage from './HomeTripsPage';

export default function TripsRouter() {
  return (
    <div className="my-reservations">
      <section id="profile-my-reservations">
        <div className="container">
          <TripsNav />
          <hr />
          <Switch>
            <Route exact path="/profile/trips/hotels" render={() => <HotelTripsPage />} />
            <Route exact path="/profile/trips/homes" render={() => <HomeTripsPage />} />
            <Redirect from="/profile/trips" to="/profile/trips/hotels" />
          </Switch>
        </div>
      </section>
    </div>
  );
}