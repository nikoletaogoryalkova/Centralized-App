import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import ListingRating from './ListingRating';
import { React_Bootstrap_Carousel } from 'react-bootstrap-carousel';

class Listing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {leftIcon: <span className="left-carousel"> </span>,
                      rightIcon: <span className="right-carousel"> </span>};
    }

    render() {
        return (
            <div className="list-hotel">
                <div className="list-image">
                    <div id={`myCarousel-${this.props.listing.id}`} className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <React_Bootstrap_Carousel
                                animation={true}
                                slideshowSpeed={7000}
                                leftIcon={this.state.leftIcon}
                                rightIcon={this.state.rightIcon}
                                onSelect={this.onSelect}
                                indicators={false}
                                ref={r => this.slider = r}
                                className="carousel-fade"    >
                                {this.props.listing.pictures.map((item, i) => {
                                    return (
                                        <div className="item" key={i}>
                                            <Link to={`/listings/${this.props.listing.id}`}>
                                                <img src={item.thumbnail} alt="" />
                                            </Link>
                                        </div>
                                    )
                                })}

                            </React_Bootstrap_Carousel>
                        </div>
                    </div>
                </div>
                <div className="list-content">
                    <h2><Link to={`/listings/${this.props.listing.id}`}>{this.props.listing.name}</Link></h2>
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
                    <Link to={`/listings/${this.props.listing.id}`} className="list-hotel-price-button btn btn-primary">Book now</Link>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default withRouter(Listing);