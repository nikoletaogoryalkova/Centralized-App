import React from 'react';
import { NavLink } from 'react-router-dom';
import { Config } from '../../../config';

export default class CalendarAsideStatic extends React.Component {
    render() {
        return <div className="col-md-4">
        
            <div>
                <NavLink to="/profile/listings/" className="btn btn-primary btn-next" style={{ margin: '10px 0', display: 'block'}}>My Listings</NavLink>
            </div>
            <div className="col-md-12 calendar-aside-static">
                <h2>Adjust Your Prices</h2>
                <img src={Config.getValue("basePath") + "images/price-statistic.png"} alt="price-statistic" />
                <p>
                    Adjust your price for the night can help you make more money over time.
                </p>
            </div>
        </div>
    }
}