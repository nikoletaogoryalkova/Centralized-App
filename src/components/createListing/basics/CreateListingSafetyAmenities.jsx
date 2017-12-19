import React from 'react';
import { NavLink } from 'react-router-dom';

import FiltersCheckbox from '../../listings/FiltersCheckbox';
import CreateListingBasicsAside from './CreateListingBasicsAside';

export default class CreateListingSafetyAmenities extends React.Component {

    render() {
        const category = this.props.values.categories.filter(category => category.name === "Safety Amenities");
        const safetyAmenities = [];
        category.forEach((c, j) => {
            if (c.amenities.length > 0) {
                safetyAmenities.push( 
                    <div key={j} className="filter-box">
                        <h3>{c.name}</h3>
                        {c.amenities.map((item, i) => {
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

        return (
            <div>
                <CreateListingBasicsAside />

                <div class="col-md-9">
                <h2>What safety amenities do you offer to your guests?</h2>
                <hr/>
                
                <div className="form-group">
                    <h3>Safety Amenities</h3>
                    <div className="filter-check-box">
                        {safetyAmenities}
                    </div>
                </div>

                <NavLink to="/listings/create/facilities" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/location" className="btn btn-primary" id="btn-continue">Continue</NavLink>
                </div>
            </div>
        );
    }
}