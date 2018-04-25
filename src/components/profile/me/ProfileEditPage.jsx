import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProfileNav from './ProfileNav';
import ProfileEditForm from './ProfileEditForm';
import ProfilePhotosPage from './ProfilePhotosPage';

export default class ProfileEditPage extends React.Component {
  render() {
    return (
      <div>
        <section id="profile-edit">
          <div className="container">
            <div className="row">
              <div className="after-header" />
              <div className="col-md-3">
                <ProfileNav />
              </div>
              <div className="col-md-8">
                <Switch>
                  <Route exact path="/profile/me/edit" render={() => <ProfileEditForm />} />
                  <Route exact path="/profile/me/edit/photos" render={() => <ProfilePhotosPage />} />
                </Switch>
              </div>
              <div className="before-footer clear-both" />
            </div>
          </div>
        </section>
      </div>
    );
  }
}