import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../Header';
import ListingRating from '../listings/ListingRating';
import Footer from '../Footer';
import { getPropertyById } from '../../requester';
import PropertyReservation from './PropertyReservation';

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
        });
    };

    render() {

        if (this.state.data === null) {
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
                                <div className="icon-facilities">
                                    <span className="icon-image">beach</span>
                                </div>
                                <div className="icon-facilities">
                                    <span className="icon-image">pool</span>
                                </div>
                                <div className="icon-facilities">
                                    <span className="icon-image">spa</span>
                                </div>
                                <div className="icon-facilities">
                                    <span className="icon-image">parking</span>
                                </div>
                                <div className="icon-facilities">
                                    <span className="icon-image">breakfast</span>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="clearfix"></div>

                            <div className="hotel-extras">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="hotel-extras-list">Dining area</div>
                                        <div className="hotel-extras-list">Sofa</div>
                                        <div className="hotel-extras-list">Sitting area</div>
                                        <div className="hotel-extras-list">Wardrobe/Closet</div>
                                        <div className="hotel-extras-list">Walk-in closet</div>
                                        <div className="hotel-extras-list">Dining table</div>
                                        <div className="hotel-extras-list">Coffee machine</div>
                                        <div className="hotel-extras-list">Oven</div>
                                        <div className="hotel-extras-list">Dryer</div>
                                        <div className="hotel-extras-list">Electric kettle</div>
                                        <div className="hotel-extras-list">Microwave</div>
                                        <div className="hotel-extras-list">Refrigerator</div>
                                        <div className="hotel-extras-list">Linens</div>
                                        <div className="hotel-extras-list">Towels</div>
                                        <div className="hotel-extras-list">Toilet</div>
                                        <div className="hotel-extras-list">Shower</div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="hotel-extras-list">Outdoor furniture</div>
                                        <div className="hotel-extras-list">Sun Deck</div>
                                        <div className="hotel-extras-list">Balcony</div>
                                        <div className="hotel-extras-list">Grounds</div>
                                        <div className="hotel-extras-list">Pool view</div>
                                        <div className="hotel-extras-list">Garden view</div>
                                        <div className="hotel-extras-list">Sea view</div>
                                        <div className="hotel-extras-list">View</div>
                                        <div className="hotel-extras-list">Indoor Pool (seasonal)</div>
                                        <div className="hotel-extras-list">Tea/Coffee maker</div>
                                        <div className="hotel-extras-list">Minibar</div>
                                        <div className="hotel-extras-list">Pets are not allowed</div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="hotel-extras-list">Air Conditioning</div>
                                        <div className="hotel-extras-list">Heating</div>
                                        <div className="hotel-extras-list">Elevator</div>
                                        <div className="hotel-extras-list">Family Rooms</div>
                                        <div className="hotel-extras-list">Non-Smoking Rooms</div>
                                        <div className="hotel-extras-list">Flat-screen TV</div>
                                        <div className="hotel-extras-list">Cable channels</div>
                                        <div className="hotel-extras-list">DVD Player</div>
                                        <div className="hotel-extras-list">Hiking</div>
                                        <div className="hotel-extras-list">Fishing</div>
                                        <div className="hotel-extras-list">Daily Housekeeping</div>
                                        <div className="hotel-extras-list">Laundry</div>
                                        <div className="hotel-extras-list">Car Rental</div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>

                                <div id="hotel-rules">
                                    <h2>Access info</h2>
                                    <p>there is access info from listing </p>
                                    <hr />
                                </div>
                                <div className="clearfix"></div>

                                <div id="reviews">
                                    <h2>User Rating &amp; Reviews</h2>
                                    <p>there are reviews from old version jquery. for now use royal algorithm</p>
                                    <hr />
                                </div>
                                <div className="clearfix"></div>

                                <div id="location">
                                    <h2>Location</h2>
                                    <p>there is location google maps. ref: old version jquery </p>
                                    <hr />
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <PropertyReservation listing={this.state.data} currency={this.props.currency} currencySign={this.props.currencySign} />
                        <div className="clearfix"></div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default withRouter(PropertyPage)