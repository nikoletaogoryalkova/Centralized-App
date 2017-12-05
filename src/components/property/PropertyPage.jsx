import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../Header';
import ListingRating from '../listings/ListingRating';
import Footer from '../Footer';
import { getPropertyById } from '../../requester';

class PropertyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    };

    componentDidMount() {
        getPropertyById(this.props.match.params.id).then(res => {
            this.setState({ data: res });
            console.log(res);
        });
    };

    render() {

        if (this.state.data === null) {
            console.log('undefined');
            return <div>Loading...</div>;
        }
        return (
            <div key={1}>
                <Header />
                <section className="hotel-gallery">
                    <div className="hotel-gallery-bgr" style={{'backgroundImage': 'url(' + this.state.data.pictures[0].original + ')'}}>
                        <div className="container">
                            <div className="hotel-gallery-social-button">
                                <a className="btn btn-social btn-dark-blue">
                                    <span>Share</span>
                                </a>
                                <a className="btn btn-save btn-dark-blue">
                                    <span>Save</span>
                                </a>
                            </div>
                            <a className="btn btn-primary btn-gallery">Open Gallery</a>
                        </div>
                    </div>
                </section>

                <nav id="hotel-nav">
                    <div className="container">
                        <ul className="nav navbar-nav">

                            <li>
                                <a href="#overview">Overview</a>
                            </li>
                            <li>
                                <a href="#facilities">Facilities</a>
                            </li>
                            <li>
                                <a href="#room-types">Room types</a>
                            </li>
                            <li>
                                <a href="#reviews">User Reviews</a>
                            </li>
                            <li>
                                <a href="#location">Location</a>
                            </li>

                        </ul>


                    </div>
                </nav>

                <section id="hotel-info">
                    <div className="container">
                        <div className="hotel-content">
                            <h1> { this.state.data.name } </h1>
                            <ListingRating rating={this.state.data.averageRating} reviewsCount={this.state.data.reviews.length}/>
                            <div className="clearfix"></div>
                            <div className="list-hotel-description">
                                {this.state.data.descriptionText}
                            </div>

                            <div id="facilities">
                                <h2>Facilities</h2>
                                <hr />
                                <h3>Most Popular Facilities</h3>

                                <div className="icon-facilities icon-beach-b">
                                    <span className="icon-image"></span>
                                    <span className="icon-text">beach</span>
                                </div>
                                <div className="icon-facilities icon-pool-b">
                                    <span className="icon-image"></span>
                                    <span className="icon-text">pool</span>
                                </div>
                                <div className="icon-facilities icon-spa-b">
                                    <span className="icon-image"></span>
                                    <span className="icon-text">spa</span>
                                </div>
                                <div className="icon-facilities icon-parking-b">
                                    <span className="icon-image"></span>
                                    <span className="icon-text">parking</span>
                                </div>
                                <div className="icon-facilities icon-breakfast-b">
                                    <span className="icon-image"></span>
                                    <span className="icon-text">breakfast</span>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="clearfix"></div>

                            <div className="hotel-extras">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="hotel-extras-title"><span className="icon-extras icon-living-area-s"></span>Living Area</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Dining area</div>
                                        <div className="hotel-extras-list">Sofa</div>
                                        <div className="hotel-extras-list">Sitting area</div>
                                        <div className="hotel-extras-title"><span className="icon-extras icon-bedroom-s"></span>Bedroom</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Wardrobe/Closet</div>
                                        <div className="hotel-extras-list">Walk-in closet</div>
                                        <div className="hotel-extras-title"><span className="icon-extras icon-kitchen-s"></span>Kitchen</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Dining table</div>
                                        <div className="hotel-extras-list">Coffee machine</div>
                                        <div className="hotel-extras-list">Oven</div>
                                        <div className="hotel-extras-list">Dryer</div>
                                        <div className="hotel-extras-list">Electric kettle</div>
                                        <div className="hotel-extras-list">Microwave</div>
                                        <div className="hotel-extras-list">Refrigerator</div>
                                        <div className="hotel-extras-title"><span className="icon-extras icon-bathroom-s"></span>Bathroom</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Linens</div>
                                        <div className="hotel-extras-list">Towels</div>
                                        <div className="hotel-extras-list">Toilet</div>
                                        <div className="hotel-extras-list">Shower</div>
                                    </div>
                                    <div className="col-md-4">

                                        <div className="hotel-extras-title"><span className="icon-extras icon-outdoors-s"></span>Outdoors</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Outdoor furniture</div>
                                        <div className="hotel-extras-list">Sun Deck</div>
                                        <div className="hotel-extras-list">Balcony</div>
                                        <div className="hotel-extras-list">Grounds</div>
                                        <div className="hotel-extras-title"><span className="icon-extras icon-view-s"></span>Outdoors &amp; View</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Pool view</div>
                                        <div className="hotel-extras-list">Garden view</div>
                                        <div className="hotel-extras-list">Sea view</div>
                                        <div className="hotel-extras-list">View</div>
                                        <div className="hotel-extras-title"><span className="icon-extras icon-pool-s"></span>Pool &amp; Spa</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Indoor Pool (seasonal)</div>
                                        <div className="hotel-extras-title"><span className="icon-extras icon-food-s"></span>Food &amp; Drink</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Tea/Coffee maker</div>
                                        <div className="hotel-extras-list">Minibar</div>
                                        <div className="hotel-extras-title"><span className="icon-extras icon-pets-s"></span>Pets</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Pets are not allowed</div>
                                    </div>
                                    <div className="col-md-4">

                                        <div className="hotel-extras-title"><span className="icon-extras icon-miscellaneous-s"></span>Miscellaneous</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Air Conditioning</div>
                                        <div className="hotel-extras-list">Heating</div>
                                        <div className="hotel-extras-list">Elevator</div>
                                        <div className="hotel-extras-list">Family Rooms</div>
                                        <div className="hotel-extras-list">Non-Smoking Rooms</div>
                                        <div className="hotel-extras-title"><span className="icon-extras icon-media-s"></span>Media &amp; Tehnology</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Flat-screen TV</div>
                                        <div className="hotel-extras-list">Cable channels</div>
                                        <div className="hotel-extras-list">DVD Player</div>
                                        <div className="hotel-extras-title"><span className="icon-extras icon-activities-s"></span>Activities</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Hiking</div>
                                        <div className="hotel-extras-list">Fishing</div>
                                        <div className="hotel-extras-title"><span className="icon-extras icon-cleaning-services-s"></span>Cleaning Services</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Daily Housekeeping</div>
                                        <div className="hotel-extras-list">Laundry</div>
                                        <div className="hotel-extras-title"><span className="icon-extras icon-transport-s"></span>Transportation</div>
                                        <div className="clearfix"></div>
                                        <div className="hotel-extras-list">Car Rental</div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>

                                <div id="room-types">
                                    <h2>Room Types</h2>
                                    <hr />

                                    <div className="list-hotel">
                                        <div className="list-image">
                                            <div id="myCarousel-1" className="carousel slide" data-ride="carousel">
                                                <div className="carousel-inner">
                                                    <div className="item active">
                                                        <a href="images/img-hotel.jpg" className="fancybox" data-fancybox-group="group-1"><img src="../../../../images/img-hotel.jpg" alt="" /></a>
                                                    </div>
                                                    <div className="item">
                                                        <a href="images/img-hotel.jpg" className="fancybox" data-fancybox-group="group-1"><img src="images/img-hotel.jpg" alt="" /></a>
                                                    </div>
                                                    <div className="item">
                                                        <a href="images/img-hotel.jpg" className="fancybox" data-fancybox-group="group-1"><img src="images/img-hotel.jpg" alt="" /></a>
                                                    </div>
                                                </div>

                                                <a className="left-carousel" href="#myCarousel-1" data-slide="prev"> </a>
                                                <a className="right-carousel" href="#myCarousel-1" data-slide="next"> </a>
                                            </div>
                                        </div>
                                        <div className="list-content">
                                            <h2>Two Bedroom Apartment</h2>

                                            <div className="clearfix"></div>
                                            <div className="list-hotel-text">
                                                Studios and apartments feature a balcony with sea views, a flat-screen TV with cable channels and a private bathroom with free toiletries, a hairdryer and a bath or shower. ..
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

                                    <div className="list-hotel">
                                        <div className="list-image">
                                            <div id="myCarousel-1" className="carousel slide" data-ride="carousel">
                                                <div className="carousel-inner">
                                                    <div className="item active">
                                                        <a href="images/img-hotel.jpg" className="fancybox" data-fancybox-group="group-1"><img src="images/img-hotel.jpg" alt="" /></a>
                                                    </div>
                                                    <div className="item">
                                                        <a href="images/img-hotel.jpg" className="fancybox" data-fancybox-group="group-1"><img src="images/img-hotel.jpg" alt="" /></a>
                                                    </div>
                                                    <div className="item">
                                                        <a href="images/img-hotel.jpg" className="fancybox" data-fancybox-group="group-1"><img src="images/img-hotel.jpg" alt="" /></a>
                                                    </div>
                                                </div>

                                                <a className="left-carousel" href="#myCarousel-1" data-slide="prev"> </a>
                                                <a className="right-carousel" href="#myCarousel-1" data-slide="next"> </a>
                                            </div>
                                        </div>
                                        <div className="list-content">
                                            <h2>Two Bedroom Apartment</h2>

                                            <div className="clearfix"></div>
                                            <div className="list-hotel-text">
                                                Studios and apartments feature a balcony with sea views, a flat-screen TV with cable channels and a private bathroom with free toiletries, a hairdryer and a bath or shower. ..
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

                                </div>
                                <div className="clearfix"></div>

                                <div id="hotel-rules">
                                    <h2>Hotel Rules</h2>
                                    <hr />

                                </div>
                                <div className="clearfix"></div>

                                <div id="cancellation">
                                    <h2>Cancellation</h2>
                                    <hr />

                                </div>
                                <div className="clearfix"></div>

                                <div id="children">
                                    <h2>Children &amp; Extra Beds</h2>
                                    <hr />

                                </div>
                                <div className="clearfix"></div>

                                <div id="reviews">
                                    <h2>User Rating &amp; Reviews</h2>
                                    <hr />

                                </div>
                                <div className="clearfix"></div>

                                <div id="location">
                                    <h2>Location</h2>
                                    <hr />

                                </div>
                                <div className="clearfix"></div>

                            </div>

                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default withRouter(PropertyPage)