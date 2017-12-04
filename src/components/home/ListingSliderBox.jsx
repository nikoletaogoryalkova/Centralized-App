import React from 'react';

export default class ListingSliderBox extends React.Component {
    render() {
        return (
            <div className="item">
                <div className="list-property-small">
                    <div id="myCarousel-0" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="item active">
                                <a><img src="images/img-hotel.jpg" alt="" /></a>
                            </div>
                            <div className="item">
                                <a><img src="images/img-hotel.jpg" alt="" /></a>
                            </div>
                            <div className="item">
                                <a><img src="images/img-hotel.jpg" alt="" /></a>
                            </div>
                        </div>

                        <a className="left-carousel" href="#myCarousel-0" data-slide="prev"> </a>
                        <a className="right-carousel" href="#myCarousel-1" data-slide="next"> </a>
                    </div>
                    <div className="popular-list-data">
                        <h3><a>{this.props.name}</a></h3>
                        <div className="list-hotel-rating">
                            <div className="list-hotel-rating-count">Excellent 4.1/5</div>
                            <div className="list-hotel-rating-stars">
                                <span className="full-star"></span>
                                <span className="full-star"></span>
                                <span className="full-star"></span>
                                <span className="full-star"></span>
                                <span className="empty-star"></span>
                            </div>
                            <div className="list-hotel-rating-review">73</div>
                        </div>

                    </div>

                    <div className="list-property-price">&#36;350 <span>(LOC 1.2)</span></div>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}