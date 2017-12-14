import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';
import FiltersCheckbox from '../../listings/FiltersCheckbox';

import { getAmenitiesByCategory } from '../../../requester';

export default class CreateListingFacilities extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        }
    }

    componentDidMount() {
        getAmenitiesByCategory().then(data => {
            this.setState({ categories: data.content });
        });
    };

    render() {
        if (!this.props) {
            return null;
        }

        const facilities = [];
        this.state.categories.forEach((category) => {
            if (category.amenities.length > 0) {
                facilities.push( 
                    <div className="filter-box">
                        <h3>{category.name}</h3>
                        {category.amenities.map((item, i) => {
                                return <div key={i} onClick={() => this.props.toggle(item.id)}>
                                    <FiltersCheckbox
                                        key={i}
                                        text={item.name}
                                        checked={this.props.values.facilities.has(item.id)} />
                                </div>
                            })
                        }
                    </div>
                );
            }
        });

        const columns = [[], [], []];
        facilities.forEach((item, i) => {
            columns[i % 3].push(item);
        });

        return (
            <div>
                <CreateListingBasicsAside />

                <div className="col-md-9">
                    <div className="form-group">
                        <h2>What facilities do you offer to your guests</h2>
                        <hr/>

                        <div className="col-md-4">
                            {columns[0]}
                        </div>

                        <div className="col-md-4">
                            {columns[1]}
                        </div>

                        <div className="col-md-4">
                            {columns[2]}
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