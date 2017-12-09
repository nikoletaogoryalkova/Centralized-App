import React from 'react';
import { Link } from 'react-router-dom';
import ListingRating from '../listings/ListingRating';
import ListingPictures from '../listings/ListingPictures';
import { getLocRate } from '../../requester';

export default class ListingSliderBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locRate: null,
            loading: true
        }
    }

    componentDidMount() {
        getLocRate().then((data) => {
            this.setState({ locRate: data.loc, loading: false });
        })
    }

    render() {
        const listingPrice = this.props.listing.prices && parseInt(this.props.listing.prices[this.props.currency], 10).toFixed(2);

        if (this.state.loading) {
            return <div className="loader"></div>;
        }

        return (
            <div className="item active">
                <div className="list-property-small">
                    <div className="list-property-pictures">
                        <ListingPictures pictures={this.props.listing.pictures} id={this.props.listing.id} />
                    </div>
                    <div className="popular-list-data">
                        <h3><Link to={`/listings/${this.props.listing.id}`}>{this.props.listing.name}</Link></h3>
                        <ListingRating rating={this.props.listing.averageRating} reviewsCount={this.props.listing.reviewsCount} />
                    </div>
                    <div className="list-property-price">{this.props.currencySign}{listingPrice} <span>(LOC {(this.props.listing.defaultDailyPrice / this.state.locRate).toFixed(2)})</span></div>
                    <div className="clearfix">
                    </div>
                </div>
            </div>);
    }
}