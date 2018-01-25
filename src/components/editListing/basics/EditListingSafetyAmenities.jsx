import React from 'react';
import { NavLink } from 'react-router-dom';

import FiltersCheckbox from '../../listings/FiltersCheckbox';
import NavEditListing from '../NavEditListing';
import EditListingBasicsAside from './EditListingBasicsAside';

export default class EditListingSafetyAmenities extends React.Component {

    render() {
        const category = this.props.values.categories.filter(category => category.name === "Safety Amenities");
        const safetyAmenities = [];
        const { amenities, listingId, isInProgress } = this.props.values;
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
                                    checked={amenities.has(item.id)} />
                            </div>
                        })
                        }
                    </div>
                );
            }
        });

        return (
            <div>
                <NavEditListing progress='33%' />
                <div className="container">
                    <div className="row">
                        <div className="listings create">
                            <div className="col-md-3">
                                <EditListingBasicsAside listingId={listingId} />
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
                        <NavLink to={`/profile/listings/edit/facilities/${listingId}`} className="btn btn-default btn-back" id="btn-continue">
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            &nbsp;Back</NavLink>
                        <NavLink to={`/profile/listings/edit/location/${listingId}`} className="btn btn-primary btn-next" id="btn-continue" onClick={() => { if (isInProgress) { this.props.updateProgress(5) }}} >Next</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}