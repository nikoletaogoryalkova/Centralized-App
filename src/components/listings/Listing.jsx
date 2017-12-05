import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ListingRating from './ListingRating';
import ListingPictures from '../listings/ListingPictures';

class Listing extends React.Component {
    render() {
        return (
            <div className="list-hotel">
                <div className="list-image">
                    <ListingPictures pictures={this.props.listing.pictures} id={this.props.listing.id} />
                </div>
                <div className="list-content">
                    <h2><Link to={`/listings/${this.props.listing.id}${this.props.location.search}`}>{this.props.listing.name}</Link></h2>
                    <ListingRating rating={this.props.listing.averageRating} reviewsCount={this.props.listing.reviewsCount} />
                    <div className="clearfix"></div>
                    <div className="list-hotel-text">
                        {this.props.listing.description.substr(0, 400)}
                    </div>
                    <div className="list-hotel-comfort">
                        <div className="icon-hotel-4"></div>
                        <div className="icon-hotel-3"></div>
                        <div className="icon-hotel-2"></div>
                        <div className="icon-hotel-1"></div>
                    </div>
                </div>
                <div className="list-price">
                    <div className="list-hotel-price-bgr">Price for 1 night</div>
                    <div className="list-hotel-price-curency">&euro; {this.props.listing.defaultDailyPrice}</div>
                    <div className="list-hotel-price-loc">(LOC 1.2)</div>
                    <Link to={`/listings/${this.props.listing.id}${this.props.location.search}`} className="list-hotel-price-button btn btn-primary">Book now</Link>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default withRouter(Listing);