import { Route, Switch, Redirect } from 'react-router-dom';

import React from 'react';
import HotelsHomePage from './HotelsHomePage';
import HomesHomePage from './HomesHomePage';

class HomePageRouter extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/hotels" render={() => <HotelsHomePage />} />
                    <Route exact path="/homes" render={() => <HomesHomePage />} />
                    <Redirect to="/hotels" />
                </Switch>
            </div>
        );
    }
}

export default HomePageRouter;