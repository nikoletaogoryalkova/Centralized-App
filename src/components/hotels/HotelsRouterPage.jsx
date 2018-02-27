import { Route, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';
import HotelsHomePage from './HotelsHomePage';
import HotelsSearchPage from './search/HotelsSearchPage';
import HotelDetailsPage from './details/HotelDetailsPage';
import { getCountries } from '../../requester';

class HotelsRouterPage extends React.Component {
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
                <Switch>
                    <Route exact path="/hotels" render={() => <HotelsHomePage countries={this.state.countries} />} />
                    <Route exact path="/hotels/listings" render={() => <HotelsSearchPage countries={this.state.countries} />} />*/
                    <Route exact path="/hotels/listings/:id" render={() => <HotelDetailsPage countries={this.state.countries} />} />}
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