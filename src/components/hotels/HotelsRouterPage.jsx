import { Route, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';
import HotelsHomePage from './HotelsHomePage';
import HotelsSearchPage from './search/HotelsSearchPage';
import HotelDetailsPage from './details/HotelDetailsPage';
import HotelBookingPage from './book/HotelBookingPage';
import HotelBookingConfirmPage from './book/HotelBookingConfirmPage';

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
                    <Route exact path="/hotels/listings/:id" render={() => <HotelDetailsPage />} />
                    <Route exact path="/hotels/listings/book/:id" render={() => <HotelBookingPage />} />
                    <Route exact path="/hotels/listings/book/confirm/:id" render={() => <HotelBookingConfirmPage />} />
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