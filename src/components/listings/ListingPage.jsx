import { Route, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';
import ListingTypeNav from './ListingTypeNav';
import ListingSearchPage from './ListingSearchPage';
import PropertyPage from '../property/PropertyPage';

class ListingPage extends React.Component {
    render() {
        return (
            <div>
                <ListingTypeNav />
                <Switch>
                    <Route exact path="/listings" render={() => <ListingSearchPage />} />
                    <Route exact path="/listings/:id" render={() => <PropertyPage />} />
                </Switch>
            </div>
        );
    }
}

ListingPage.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
};

export default ListingPage;