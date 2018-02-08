import { Route, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';
import TypeNav from './TypeNav';
import ListingSearchPage from './ListingSearchPage';
import PropertyPage from '../property/PropertyPage';
import { getCountries } from '../../requester';

class ListingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: undefined
        };
    }
    
    componentDidMount() {
        getCountries(true).then(data => {
            this.setState({ countries: data.content });
        });
    }

    render() {
        return (
            <div>
                <TypeNav />
                <Switch>
                    <Route exact path="/listings" render={() => <ListingSearchPage countries={this.state.countries} />} />
                    <Route exact path="/listings/:id" render={() => <PropertyPage countries={this.state.countries} />} />
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