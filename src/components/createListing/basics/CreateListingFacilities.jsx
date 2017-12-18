import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';
import FiltersCheckbox from '../../listings/FiltersCheckbox';

export default class CreateListingFacilities extends React.Component {
    render() {
        if (!this.props) {
            return null;
        }

        const facilities = [];
        this.props.values.categories.forEach((category, j) => {
            if (category.amenities.length > 0 && category.name !== "Safety Amenities") {
                facilities.push( 
                    <div key={j} className="filter-box">
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