import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavMain from './NavMain';
import NavCreateListing from './NavCreateListing';
import CreateListingLandingPage from './basics/CreateListingLandingPage';
import CreateListingPlaceType from './basics/CreateListingPlaceType';
import CreateListingAccommodation from './basics/CreateListingAccommodation';
import CreateListingFacilities from './basics/CreateListingFacilities';
import CreateListingSafetyAmenities from './basics/CreateListingSafetyAmenities';
import CreateListingLocation from './basics/CreateListingLocation';
import CreateListingTitle from './placeDescription/CreateListingTitle';
import CreateListingDescription from './placeDescription/CreateListingDescription';
import CreateListingPhotos from './placeDescription/CreateListingPhotos';
import CreateListingHouseRules from './guestSettings/CreateListingHouseRules';
import CreateListingChecking from './guestSettings/CreateListingChecking';
import CreateListingCancellation from './guestSettings/CreateListingCancellation';
import CreateListingPrice from './guestSettings/CreateListingPrice';
import Footer from '../Footer';


export default class CreateListingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavMain />
                <NavCreateListing />
                
                <div className="container">
                    <div className="row">
                        <Switch>
                            <Redirect exact path="/listings/create/" to="/listings/create/landing" />
                            <Route exact path="/listings/create/landing" render={() => <CreateListingLandingPage />} />
                            <Route exact path="/listings/create/placetype" render={() => <CreateListingPlaceType />} />
                            <Route exact path="/listings/create/accommodation" render={() => <CreateListingAccommodation />} />
                            <Route exact path="/listings/create/facilities" render={() => <CreateListingFacilities />} />
                            <Route exact path="/listings/create/safetyamenities" render={() => <CreateListingSafetyAmenities />} />
                            <Route exact path="/listings/create/location" render={() => <CreateListingLocation />} />
                            <Route exact path="/listings/create/title" render={() => <CreateListingTitle />} />
                            <Route exact path="/listings/create/description" render={() => <CreateListingDescription />} />
                            <Route exact path="/listings/create/photos" render={() => <CreateListingPhotos />} />
                            <Route exact path="/listings/create/houserules" render={() => <CreateListingHouseRules />} />
                            <Route exact path="/listings/create/checking" render={() => <CreateListingChecking />} />
                            <Route exact path="/listings/create/cancellation" render={() => <CreateListingCancellation />} />
                            <Route exact path="/listings/create/price" render={() => <CreateListingPrice />} />
                        </Switch>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}