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
                <div className="container">
                    <div className="row">
                        <div className="listings create">
                            <div className="col-md-3">
                                <CreateListingBasicsAside />
                            </div>

                            <div className="col-md-9">
                                <h2>What safety amenities do you offer to your guests?</h2>
                                <hr />
                                
                                <div className="form-group">
                                    <div className="filter-check-box">
                                        {safetyAmenities}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navigation col-md-12">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-7">
                        <NavLink to="/profile/listings/edit/facilities" className="btn btn-default btn-back" id="btn-continue">
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            &nbsp;Back</NavLink>
                        <NavLink to="/profile/listings/edit/location" className="btn btn-primary btn-next" id="btn-continue">Next</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}