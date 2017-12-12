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


import Counter from './Counter';
import Dropdown from './Dropdown';
import LabeledBedroomCounter from './LabeledBedroomCounter';


export default class CreateListingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            placeType: {
                listingType: '',
                propertyType: '',
                reservationType: '',
                dedicatedSpace: '',
                propertySize: '',

            },

            accommodations: {
                guests: 1,
                bedroomCount: 1,
                bedrooms: [
                    this.createBedroom(),
                ],
                bathrooms: 1,
            },

            safetyAmenities: {
                smokeDetector: false,
                carbonMonoxideDetector: false,
                firstAidKit: false,
                safetyCard: false,
                fireExtinguisher: false,
                lockOnBedroomDoor: false,
            }
        };

        this.onChange = this.onChange.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.updateCounter = this.updateCounter.bind(this);
        this.updateBedrooms = this.updateBedrooms.bind(this);
        this.updateBedCount = this.updateBedCount.bind(this);
    }

    onChange(page, event) {
        const pageValues = Object.assign({}, this.state[page]);
        const name = event.target.name;
        const value = event.target.value;
        
        pageValues[name] = value;
        
        this.setState({ [page]: pageValues });
    }

    toggleCheckbox(page, event) {
        const pageValues = Object.assign({}, this.state[page]);
        const name = event.target.name;
        const checked = event.target.checked;
        
        pageValues[name] = checked;
        
        this.setState({ [page]: pageValues });
    }

    updateCounter(page, event) {
        const pageValues = Object.assign({}, this.state[page]);
        const name = event.target.name;
        let value = Number(event.target.value);
        
        if (value < 1) { value = 1; }

        pageValues[name] = value;
        
        this.setState({ [page]: pageValues });
    }
    
    updateBedrooms(page, event) {
        const pageValues = Object.assign({}, this.state[page]);
        let oldbedroomCount = pageValues.bedroomCount;
        let value = Number(event.target.value);
        if (value < 0) { value = 0; }
        if (value > 9) { value = 9; }
        let newBedrooms = Array.from(JSON.parse(JSON.stringify(pageValues.bedrooms)));

        if (value > oldbedroomCount) {
            for(let i = oldbedroomCount; i < value; i++) {
                newBedrooms.push(this.createBedroom());
            }
        } else {
            newBedrooms = newBedrooms.slice(0, value);
        }

        pageValues.bedroomCount = value;
        pageValues.bedrooms = newBedrooms;

        this.setState({
            [page]: pageValues
         });
    }

    updateBedCount(page, bedroom, e) {
        const pageValues = Object.assign({}, this.state[page]);
        console.log(page);
        console.log(pageValues);
        const name = e.target.name;
        let value = Number(e.target.value);
        if (value < 0) { value = 0; }
        if (value > 9) { value = 9; }
        // let bedrooms = JSON.parse(JSON.stringify(pageValues.bedrooms));
        pageValues.bedrooms[bedroom][name] = value;
        this.setState({
            [page]: pageValues
        })
    }

    createBedroom() {
        return {
            singleBed: 0,
            doubleBed: 0,
            kingBed: 0,
        };
    }

    render() {
        let smokeDetector = this.state.smokeDetector;

        return (
            <div>
                <NavMain />
                <NavCreateListing />
                
                <div className="container">
                    <div className="row">
                        <Switch>
                            <Redirect exact path="/listings/create/" to="/listings/create/landing" />
                            
                            <Route exact path="/listings/create/landing" render={() => 
                                <CreateListingLandingPage />} 
                            />
                            
                            <Route exact path="/listings/create/placetype" render={() => 
                                <CreateListingPlaceType 
                                    values={this.state.placeType} 
                                    toggleCheckbox={this.toggleCheckbox} 
                                    onChange={this.onChange} />} 
                            />

                            <Route exact path="/listings/create/accommodation" render={() => 
                                <CreateListingAccommodation 
                                    values={this.state.accommodations}
                                    updateCounter={this.updateCounter}
                                    updateBedrooms={this.updateBedrooms}
                                    updateBedCount={this.updateBedCount}
                                    />} />
                            
                            <Route exact path="/listings/create/facilities" render={() => <CreateListingFacilities />} />
                            
                            <Route exact path="/listings/create/safetyamenities" render={() => 
                            <CreateListingSafetyAmenities 
                                values={this.state.safetyAmenities} 
                                toggleCheckbox={this.toggleCheckbox} />} />
                            
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