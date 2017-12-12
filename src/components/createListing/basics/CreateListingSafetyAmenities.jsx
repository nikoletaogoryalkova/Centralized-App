import React from 'react';
import { NavLink } from 'react-router-dom';

import Checkbox from '../Checkbox';
import FiltersCheckbox from '../../listings/FiltersCheckbox';
import CreateListingBasicsAside from './CreateListingBasicsAside';

export default class CreateListingSafetyAmenities extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {smokeDetector, carbonMonoxideDetector, firstAidKit, safetyCard, fireExtinguisher, lockOnBedroomDoor} = this.props.values;
        return (
            <div>
                <CreateListingBasicsAside />

                <h2>What safety amenities do you offer to your guests?</h2>
                <hr/>
                
                <div className="form-group">
                    <h3>Safety Amenities</h3>
                    <div className="filter-check-box">
                        <Checkbox toggleCheckbox={(e) => this.props.toggleCheckbox(e)} name="smokeDetector" text="Smoke detector" checked={smokeDetector} />
                        <Checkbox toggleCheckbox={(e) => this.props.toggleCheckbox(e)} name="carbonMonoxideDetector" text="Carbon monoxide detector" checked={carbonMonoxideDetector} />
                        <Checkbox toggleCheckbox={(e) => this.props.toggleCheckbox(e)} name="firstAidKit" text="First aid kit" checked={firstAidKit} />
                        <Checkbox toggleCheckbox={(e) => this.props.toggleCheckbox(e)} name="safetyCard" text="Safety card" checked={safetyCard} />
                        <Checkbox toggleCheckbox={(e) => this.props.toggleCheckbox(e)} name="fireExtinguisher" text="Fire extinguisher" checked={fireExtinguisher} />
                        <Checkbox toggleCheckbox={(e) => this.props.toggleCheckbox(e)} name="lockOnBedroomDoor" text="Lock on bedroom door" checked={lockOnBedroomDoor} />
                    </div>
                </div>

                <NavLink to="/listings/create/facilities" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/location" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}