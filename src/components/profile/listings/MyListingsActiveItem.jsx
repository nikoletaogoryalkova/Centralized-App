import React from 'react';
import { Link } from 'react-router-dom'

import RatingFeedback from '../RatingFeedback';

export default class MyListingsPage extends React.Component {
    render() {
        return (
            <ul className="profile-mylistings-active">
                <li className="toggle off"></li>
                <li className="thumb"><span></span></li> {/* pls add style="background-image: url(...)" on the span */}
                <li className="details">
                    <Link to="#">Heaven - Junior Suite with view</Link>
                    <RatingFeedback />
                </li>
                <li className="price">
                    <span>$1.050</span>
                </li>
                <li className="edit">
                    <Link to="#">Edit Listing</Link>
                </li>
                <li className="calendar">
                <input type="button" className="button" value="View Calendar"/>
                </li>
                <li className="remove">
                    <span></span>
                </li>
            </ul>
        );
    }
}