import { Route, Switch, Redirect } from 'react-router-dom';

import React from 'react';
import HotelsHomePage from '../hotels/HotelsHomePage';
import HomesHomePage from '../homes/HomesHomePage';

class HomePageRouter extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/homes" render={() => <HomesHomePage />} />
          <Route exact path="/hotels" render={() => <HotelsHomePage />} />
          <Route exact path="/users/resetPassword/:confirm" render={() => <HotelsHomePage />} />
          <Redirect from="/" to="/hotels" />
        </Switch>
      </div>
    );
  }
}

export default HomePageRouter;