import React from 'react';
import { NavLink } from 'react-router-dom';

import Checkbox from '../Checkbox';
import CreateListingBasicsAside from './CreateListingBasicsAside';

export default class CreateListingSafetyAmenities extends React.Component {

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
                        <Checkbox toggleCheckbox={this.props.toggleCheckbox} name="smokeDetector" label="Smoke detector" checked={smokeDetector} />
                        <Checkbox toggleCheckbox={this.props.toggleCheckbox} name="carbonMonoxideDetector" label="Carbon monoxide detector" checked={carbonMonoxideDetector} />
                        <Checkbox toggleCheckbox={this.props.toggleCheckbox} name="firstAidKit" label="First aid kit" checked={firstAidKit} />
                        <Checkbox toggleCheckbox={this.props.toggleCheckbox} name="safetyCard" label="Safety card" checked={safetyCard} />
                        <Checkbox toggleCheckbox={this.props.toggleCheckbox} name="fireExtinguisher" label="Fire extinguisher" checked={fireExtinguisher} />
                        <Checkbox toggleCheckbox={this.props.toggleCheckbox} name="lockOnBedroomDoor" label="Lock on bedroom door" checked={lockOnBedroomDoor} />
                    </div>
                </div>

                <NavLink to="/listings/create/facilities" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/location" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}