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

            // landing page and place type
            listingType: '',
            location: '',
            propertyType: '',
            reservationType: '',
            dedicatedSpace: '',
            propertySize: '',

            // accommodations
            guests: 1,
            bedroomCount: 1,
            bedrooms: [
                this.createBedroom(),
            ],
            bathrooms: 1,

            // safety amenities
            smokeDetector: false,
            carbonMonoxideDetector: false,
            firstAidKit: false,
            safetyCard: false,
            fireExtinguisher: false,
            lockOnBedroomDoor: false,

            // facilities
            facilities: new Set(),
        };

        this.onChange = this.onChange.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.updateCounter = this.updateCounter.bind(this);
        this.updateBedrooms = this.updateBedrooms.bind(this);
        this.updateBedCount = this.updateBedCount.bind(this);
        this.toggleFacility = this.toggleFacility.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    toggleCheckbox(event) {
        this.setState({ 
            [event.target.name]: event.target.checked 
        });
    }

    updateCounter(event) {
        const name = event.target.name;
        let value = Number(event.target.value);
        if (value < 1) { value = 1; }
        this.setState({ [name]: value });
    }
    
    updateBedrooms(event) {
        let bedroomCount = this.state.bedroomCount;
        let value = Number(event.target.value);
        if (value < 0) { value = 0; }
        if (value > 9) { value = 9; }
        let newBedrooms = JSON.parse(JSON.stringify(this.state.bedrooms));

        if (value > bedroomCount) {
            for(let i = bedroomCount; i < value; i++) {
                newBedrooms.push(this.createBedroom());
            }
        } else {
            newBedrooms = newBedrooms.slice(0, value);
        }

        this.setState({
            bedroomCount: value,
            bedrooms: newBedrooms,
         });
    }

    updateBedCount(bedroom, e) {
        const bedrooms = JSON.parse(JSON.stringify(this.state.bedrooms));
        const name = e.target.name;
        let value = Number(e.target.value);
        if (value < 0) { value = 0; }
        if (value > 9) { value = 9; }
        bedrooms[bedroom][name] = value;
        this.setState({
            bedrooms: bedrooms,
        })
    }

    toggleFacility(item) {
        let fac = this.state.facilities;
        if (fac.has(item)) {
            fac.delete(item);
        } else {
            fac.add(item);
        }

        this.setState({
            facilities: fac,
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
        return (
            <div>
                <NavMain />
                <NavCreateListing />
                
                <div className="container">
                    <div className="row">
                        <Switch>
                            <Redirect exact path="/listings/create/" to="/listings/create/landing" />
                            
                            <Route exact path="/listings/create/landing" render={() => 
                                <CreateListingLandingPage
                                    values={this.state}
                                    onChange={this.onChange}/>} 
                            />
                            
                            <Route exact path="/listings/create/placetype" render={() => 
                                <CreateListingPlaceType 
                                    values={this.state} 
                                    toggleCheckbox={this.toggleCheckbox} 
                                    onChange={this.onChange} />} 
                            />

                            <Route exact path="/listings/create/accommodation" render={() => 
                                <CreateListingAccommodation 
                                    values={this.state}
                                    updateCounter={this.updateCounter}
                                    updateBedrooms={this.updateBedrooms}
                                    updateBedCount={this.updateBedCount}
                                    />} />
                            
                            <Route exact path="/listings/create/facilities" render={() => 
                                <CreateListingFacilities 
                                    values={this.state}
                                    toggle={this.toggleFacility}/>} />
                            
                            <Route exact path="/listings/create/safetyamenities" render={() => 
                                <CreateListingSafetyAmenities 
                                    values={this.state} 
                                    toggleCheckbox={this.toggleCheckbox} />} />
                            
                            <Route exact path="/listings/create/location" render={() => 
                                <CreateListingLocation 
                                    values={this.state}
                                    updateDropdown={this.onChange}
                                    updateTextbox={this.onChange}/>} />
                            
                            <Route exact path="/listings/create/title" render={() => 
                                <CreateListingTitle 
                                    values={this.state}
                                    updateTextbox={this.onChange}/>} />

                            <Route exact path="/listings/create/description" render={() => 
                                <CreateListingDescription 
                                    values={this.state}
                                    updateTextarea={this.onChange}/>} />
                                    
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