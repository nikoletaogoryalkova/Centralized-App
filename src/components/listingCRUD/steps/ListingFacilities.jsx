import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import BasicsAside from '../aside/BasicsAside';
import ListingCrudNav from '../navigation/ListingCrudNav';
import FilterCheckbox from '../../common/filter/FilterCheckbox';

export default function CreateListingFacilities(props) {
    if (!props) {
        return null;
    }

    const facilities = [];
    props.values.categories.forEach((category, j) => {
        if (category.amenities.length > 0 && category.name !== 'Safety Amenities') {
            facilities.push(
                <div key={j} className="filter-box">
                    <h3>{category.name}</h3>
                    {category.amenities.map((item, i) => {
                        return (
                            <div key={i} onClick={() => props.toggle(item.id)}>
                                <FilterCheckbox
                                    key={i}
                                    text={item.name}
                                    checked={props.values.facilities.has(item.id)} />
                            </div>
                        );
                    })}
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
            <ListingCrudNav progress='33%' />
            <div className="container">
                <div className="row">
                    <div className="listings create">
                        <div className="col-md-3">
                            <BasicsAside routes={props.routes} />
                        </div>
                        <div className="col-md-9">
                            <div className="form-group">
                                <h2>What facilities do you offer to your guests</h2>
                                <hr />

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
                        </div>
                    </div>
                </div>
            </div>
            <div className="navigation col-md-12">
                <div className="col-md-3">
                </div>
                <div className="col-md-7">
                    <NavLink to={props.prev} className="btn btn-default btn-back" id="btn-continue">
                        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                        &nbsp;Back</NavLink>
                    <NavLink to={props.next} className="btn btn-primary btn-next" id="btn-continue" onClick={() => { props.updateProgress(3); }}>Next</NavLink>
                </div>
            </div>
        </div>
    );
}

CreateListingFacilities.propTypes = {
    values: PropTypes.any,
    updateProgress: PropTypes.func,
    prev: PropTypes.string,
    next: PropTypes.string,
};