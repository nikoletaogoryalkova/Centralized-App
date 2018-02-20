import { Route, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';
import HotelsHomePage from './HotelsHomePage';
import HotelsSearchPage from './search/HotelsSearchPage';
// import HotelsDetailsPage from './details/HotelsDetailsPage';
import { getCountries } from '../../requester';

class HotelsRouterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: undefined
        };
    }
    
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/hotels" render={() => <HotelsHomePage />} />
                    <Route exact path="/hotels/listings" render={() => <HotelsSearchPage />} />
                    {/* <Route exact path="/hotels/listings/:id" render={() => <HotelsDetailsPage />} /> */}
                </Switch>
            </div>
        );
    }
}

HotelsRouterPage.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
};

export default HotelsRouterPage;