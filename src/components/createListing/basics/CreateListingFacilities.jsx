import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';
import FiltersCheckbox from '../../listings/FiltersCheckbox';

export default class CreateListingFacilities extends React.Component {
    render() {
        // const {
        //     diningArea,
        //     sofa,
        //     sittingArea,
        //     desk,
        //     wardrobeClosset,
        //     walkInCloset,
        //     diningTable,
        //     toaster,
        //     oven,
        //     electricTable,
        //     kitchenette,
        //     kitchenware,
        //     microwave,
        //     refrigerator,
        //     coffeeMachine,
        //     toiletPaper,
        //     bathtub,
        //     bathrobe,
        //     outdoorFurniture,
        //     outdoorDiningArea,

        // } = this.props.values;

        return (
            <div>
                <CreateListingBasicsAside />

                <div className="col-md-9">
                    <div className="form-group">
                        <h2>What facilities do you offer to your guests</h2>
                        <hr/>

                        <div className="col-md-4">
                            <div className="filter-box">
                                <h3>Living Area</h3>
                                {
                                    CreateListingFacilities.livingArea.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>

                            <div className="filter-box">
                                <h3>Bedroom</h3>
                                {
                                    CreateListingFacilities.bedroom.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>
                            
                            <div className="filter-box">
                                <h3>Kitchen</h3>
                                {
                                    CreateListingFacilities.kitchen.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>

                            <div className="filter-box">
                                <h3>Bathroom</h3>
                                {
                                    CreateListingFacilities.bathroom.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        
                        <div className="col-md-4">
                            <div className="filter-box">
                                <h3>Outdoors</h3>
                                {
                                    CreateListingFacilities.outdoors.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>

                            <div className="filter-box">
                                <h3>Outdoor &amp; View</h3>
                                {
                                    CreateListingFacilities.outdoorAndView.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>

                            <div className="filter-box">
                                <h3>Pool &amp; Spa</h3>
                                {
                                    CreateListingFacilities.poolAndSpa.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>

                            <div className="filter-box">
                                <h3>Food &amp; Drink</h3>
                                {
                                    CreateListingFacilities.foodAndDrink.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="filter-box">
                                <h3>Miscellaneous</h3>
                                {
                                    CreateListingFacilities.miscellaneous.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>

                            <div className="filter-box">
                                <h3>Media</h3>
                                {
                                    CreateListingFacilities.media.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>
                            
                            
                            <div className="filter-box">
                                <h3>Activities</h3>
                                {
                                    CreateListingFacilities.activities.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>
                            
                            <div className="filter-box">
                                <h3>Cleaning Services</h3>
                                {
                                    CreateListingFacilities.cleaningServices.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>

                            <div className="filter-box">
                                <h3>Transportation</h3>
                                {
                                    CreateListingFacilities.transportation.map((item, i) => {
                                        return <div key={i} onClick={() => this.props.toggle(item)}>
                                            <FiltersCheckbox
                                                key={i}
                                                text={item}
                                                checked={this.props.values.facilities.has(item)} />
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    
                    <NavLink to="/listings/create/accommodation" className="btn btn-default" id="btn-continue">Back</NavLink>
                    <NavLink to="/listings/create/safetyamenities" className="btn btn-primary" id="btn-continue">Continue</NavLink>
                </div>

            </div>
        );
    }
}

CreateListingFacilities.livingArea = [
    'Dining area',
    'Sofa',
    'Sitting area',
    'Desk',
];

CreateListingFacilities.bedroom = [
    'Wardrobe/Closet',
    'Walk-in Closet',
];

CreateListingFacilities.kitchen = [
    'Dining table',
    'Toaster',
    'Oven',
    'Electric Table',
    'Kitchenette',
    'Kitchenware',
    'Microwave',
    'Refrigerator',
    'Coffee machine',
];

CreateListingFacilities.bathroom = [
    'Toilet paper',
    'Bathtub',
    'Bathrobe',
    'bidet',
    'Hairdryer',
    'Shower',
    'Slippers',
    'Hot tub / Jacuzzi',
];

CreateListingFacilities.outdoors = [
    'Outdoor furniture',
    'Outdoor dining area',
    'Barbecue',
    'Sun deck',
    'Balcony',
    'Terrace',
];

CreateListingFacilities.outdoorAndView = [
    'City view',
    'Garden view',
    'Lake view',
    'Landmark view',
    'Mountain view',
    'Pool view',
    'River view',
    'Sea view',
];

CreateListingFacilities.poolAndSpa = [
    'Indoor pool (seasonal)',
    'Outdoor pool',
    'Spa',
    'Sauna',
    'Fitness center',
    'Solarium',
];

CreateListingFacilities.foodAndDrink = [
    'Minibar',
    'Tea/Coffee maker',
    'Restaurant',
];

CreateListingFacilities.miscellaneous = [
    'Air Conditioner',
    'Fan',
    'Fireplace',
    'Heating',
    'Iron',
    'Safe',
    'Elevator',
];

CreateListingFacilities.media = [
    'Computer',
    'Game console',
    'Laptop',
    'Cable channel',
    'Flat-screen TV',
    'Satellite channels',
    'Telephone',
    'TV',
    'Video games',
];

CreateListingFacilities.activities = [
    'Hiking',
    'Fishing',
    'Tennis',
];

CreateListingFacilities.cleaningServices = [
    'Housekeeping',
    'Laundry',
];

CreateListingFacilities.transportation = [
    'Car rental',
    'Airport shuttle',
];