import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';
import NavCreateListing from '../NavCreateListing';
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
                <NavCreateListing progress='33%' />
                <div className="container">
                    <div className="row">
                        <div className="listings create">
                            <div className="col-md-3">
                                <CreateListingBasicsAside />
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
                        <NavLink to="/profile/listings/create/accommodation" className="btn btn-default btn-back" id="btn-continue">
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            &nbsp;Back</NavLink>
                        <NavLink to="/profile/listings/create/safetyamenities" className="btn btn-primary btn-next" id="btn-continue" onClick={(e) => { this.props.updateProgress(3); }}>Next</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}