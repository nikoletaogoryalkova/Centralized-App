import { Route, Redirect, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';
import ListingsAdminNav from './ListingsAdminNav';
import AllPublishedListings from './AllPublishedListings';
import AllUnpublishedListings from './AllUnpublishedListings';

class ListingsAdminPage extends React.Component {
  render() {
    return (
      <div className="my-reservations">
        <section id="profile-my-reservations">
          <div className="container">
            <ListingsAdminNav />
            <hr />
            <Switch>
              <Redirect exact path="/profile/admin/listings" to="/profile/admin/listings/published" />
              <Route exact path="/profile/admin/listings/published" render={() => <AllPublishedListings />} />
              <Route exact path="/profile/admin/listings/unpublished" render={() => <AllUnpublishedListings />} />
            </Switch>
          </div>
        </section>
      </div>
    );
  }
}

ListingsAdminPage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default ListingsAdminPage;