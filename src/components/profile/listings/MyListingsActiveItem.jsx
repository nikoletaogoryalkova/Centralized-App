import React from 'react';
import { Link } from 'react-router-dom'
import ListingRating from '../../listings/ListingRating';

import RatingFeedback from '../RatingFeedback';

export default class MyListingsPage extends React.Component {
    render() {
        return (
            <ul className="profile-mylistings-active">
                <li className="toggle off"></li>
                <li className="thumb"><span style={{backgroundImage: `url(${this.props.listing.thumbnail})`}}></span></li>
                <li className="details">
                    <Link to={"/listings/" + this.props.listing.id}>{this.props.listing.name}</Link>

                    <ListingRating  rating={this.props.listing.averageRating} reviewsCount={this.props.listing.reviewsCount} />
                </li>
                <li className="price">
                    <span>{this.props.listing.defaultDailyPrice} {this.props.listing.currencyCode}</span>
                </li>
                {/* <li className="edit">
                    <Link to={`/profile/listings/edit/${this.props.listing.id}`}>Edit Listing</Link>
                </li> */}
                <li className="calendar">
                {/* <input type="button" className="button" value="View Calendar"/> */}
                <Link to={"/profile/listings/calendar/" + this.props.listing.id}>View Calendar</Link>
                </li>
                <li className="remove">
                    <span></span>
                </li>
            </ul>
        );
    }
}