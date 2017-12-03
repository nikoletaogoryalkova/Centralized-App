import React from 'react';
import { withRouter } from 'react-router-dom';

class Listing extends React.Component {
    render() {
        return (
            <div className="list-hotel">
                <div className="list-image">
                    <div id={`myCarousel-${this.props.id}`} className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="item">
                                <a href="images/img-hotel.jpg" className="fancybox" data-fancybox-group="group-1">
                                    <img src="images/img-hotel.jpg" alt="" />
                                </a>
                            </div>
                            <div className="item">
                                <a href="images/img-hotel.jpg" className="fancybox" data-fancybox-group="group-1">
                                    <img src="images/img-hotel.jpg" alt="" />
                                </a>
                            </div>
                            <div className="item">
                                <a href="images/img-hotel.jpg" className="fancybox" data-fancybox-group="group-1">
                                    <img src="images/img-hotel.jpg" alt="" />
                                </a>
                            </div>
                        </div>

                        <a className="left-carousel" href="#myCarousel-1" data-slide="prev"> </a>
                        <a className="right-carousel" href="#myCarousel-1" data-slide="next"> </a>
                    </div>
                </div>
                <div className="list-content">
                    <h2>{this.props.name}</h2>
                    <div className="list-hotel-rating">
                        <div className="list-hotel-rating-count">Excellent 4.1/5</div>
                        <div className="list-hotel-rating-stars">
                            <span className="full-star"></span>
                            <span className="full-star"></span>
                            <span className="full-star"></span>
                            <span className="full-star"></span>
                            <span className="empty-star"></span>
                        </div>
                        <div className="list-hotel-rating-review">73 Reviews</div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="list-hotel-text">
                        Studios and apartments feature a balcony with sea views, a flat-screen TV with cable
                    channels and a private bathroom with free toiletries, a hairdryer and a bath or shower.
                    ..
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
                    <div className="list-hotel-price-curency">$350</div>
                    <div className="list-hotel-price-loc">(LOC 1.2)</div>
                    <a className="list-hotel-price-button btn btn-primary">Book now</a>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default withRouter(Listing);