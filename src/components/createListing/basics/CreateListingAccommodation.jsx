import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';
import Counter from '../Counter';
import Dropdown from '../Dropdown';
import LabeledBedroomCounter from '../LabeledBedroomCounter';

export default class CreateListingAccommodation extends React.Component {
    constructor(props) {
        super(props);
    }

    createBedroom() {
        return {
            singleBed: 0,
            doubleBed: 0,
            kingBed: 0,
        };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const {guests, bedroomCount, bedrooms, bathrooms} = this.props.values;
        console.log(bedrooms);
        const bedroomRows = bedrooms.map((bedroom, i) => {
            return <div key={i}>
                <h3>Bedroom {i + 1} (What type of beds are available in this room)?</h3>
                <LabeledBedroomCounter
                    label="Single Bed"
                    name="singleBed"
                    bedroom={i}
                    value={bedrooms[i].singleBed}
                    onChange={this.props.updateBedCount}
                    />

                <LabeledBedroomCounter
                    label="Double Bed"
                    name="doubleBed"
                    bedroom={i}
                    value={bedrooms[i].doubleBed}
                    onChange={this.props.updateBedCount}
                    />

                <LabeledBedroomCounter
                    label="King Bed"
                    name="kingBed"
                    bedroom={i}
                    value={bedrooms[i].kingBed}
                    onChange={this.props.updateBedCount}
                    />
                </div>
        });

        return (
            <div>
                <CreateListingBasicsAside />
                <div className="reservation-hotel-review-room col-md-9">
                    
                    <div>
                        <h2>Accommodation</h2>
                        <hr />
                    </div>

                    <div>
                        <h3>How many guests can stay in your place?</h3>
                        <label>Guests:</label>
                        <Counter
                            name="guests"
                            value={guests}
                            onChange={this.props.updateCounter}/>
                    </div>

                    <br/>

                    <div>
                        <h3>How many bedrooms can your guests use?</h3>
                        <Dropdown 
                            name="bedroomCount" 
                            options={[ 1, 2, 3, 4, 5 ]} 
                            value={bedroomCount}
                            onChange={this.props.updateBedrooms} />
                    </div>
                    
                    <div>
                        <h2>Sleeping arrangement</h2>
                        <hr/>
                        {bedroomRows}
                    </div>

                    <div>
                        <h2>Bathrooms</h2>
                        <hr/>
                        <h3>How many bathrooms can your guests use?</h3>
                        
                        <label>Bathrooms:</label>
                        <Counter
                            name="bathrooms"
                            value={bathrooms}
                            onChange={this.props.updateCounter}/>
                    </div>

                    <br/>

                    <NavLink to="/listings/create/placetype" className="btn btn-default" id="btn-continue">Back</NavLink>
                    <NavLink to="/listings/create/facilities" className="btn btn-primary" id="btn-continue">Continue</NavLink>
                </div>
            </div>
        );
    }
}