import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import FilterCheckbox from '../../common/filter/FilterCheckbox';
import BasicsAside from '../aside/BasicsAside';
import ListingCrudNav from '../navigation/ListingCrudNav';

export default function CreateListingSafetyAmenities(props) {
    const category = props.values.categories.filter(category => category.name === 'Safety Amenities');
    const safetyAmenities = [];
    category.forEach((c, j) => {
        if (c.amenities.length > 0) {
            safetyAmenities.push(
                <div key={j} className="filter-box">
                    <h3>{c.name}</h3>
                    {c.amenities.map((item, i) => {
                        return <div key={i} onClick={() => props.toggle(item.id)}>
                            <FilterCheckbox
                                key={i}
                                text={item.name}
                                checked={props.values.facilities.has(item.id)} />
                        </div>;
                    })}
                </div>
            );
        }
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
                    <NavLink to={props.prev} className="btn btn-default btn-back" id="btn-continue">
                        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                        &nbsp;Back</NavLink>
                    <NavLink to={props.next} className="btn btn-primary btn-next" id="btn-continue" onClick={() => { props.updateProgress(4); }}>Next</NavLink>
                </div>
            </div>
        </div>
    );
}

CreateListingSafetyAmenities.propTypes = {
    values: PropTypes.any,
    updateProgress: PropTypes.func,
    prev: PropTypes.string,
    next: PropTypes.string,
};