import React from 'react';
import NavMain from './NavMain';
import Footer from '../Footer';

export default class CreateListingPlaceType extends React.Component {
    render() {
        return (
            <div>
                 <NavMain />

                 <section id="reservation-content-box">
    <div className="container">

        <div className="row">
            <div className="col-md-3">
                <div className="host-step">Place Type</div>
                <div className="host-step active">Accommodation</div>
                <div className="host-step">Facilities</div>
                <div className="host-step">Safety amenities</div>
                <div className="host-step">Location</div>
            </div>
            <div className="col-md-8">
                <div className="reservation-hotel-review-room">
                    <h2>What kind of place do you want to list?</h2>
                    <hr />

                    <form method="POST" id="billing-form">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="listing-type">What are you listing?</label>
                                    <select className="form-control" name="listing-type" required="required"
                                            id="listing-type">
                                        <option value="Home">Home</option>
                                        <option value="Hotel">Hotel</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="property-type">What type of property is this?</label>
                                    <select className="form-control" name="property-type" required="required"
                                            id="property-type">
                                        <option value="Apartment">Apartment</option>
                                        <option value="Condominium">Condominium</option>
                                        <option value="Guesthouse">Guesthouse</option>
                                        <option value="House">House</option>
                                        <option value="In-law">In-law</option>
                                        <option value="Guest suite">Guest suite</option>
                                        <option value="Townhouse">Townhouse</option>
                                        <option value="Vacation home">Vacation home</option>
                                        <option value="Boat">Boat</option>
                                        <option value="Bungalow">Bungalow</option>
                                        <option value="Cabin">Cabin</option>
                                        <option value="Castle">Castle</option>
                                        <option value="Cave">Cave</option>
                                        <option value="Chalet">Chalet</option>
                                        <option value="Dorm">Dorm</option>
                                        <option value="Earth House">Earth House</option>
                                        <option value="Hut">Hut</option>
                                        <option value="Igloo">Igloo</option>
                                        <option value="Island">Island</option>
                                        <option value="Lighthouse">Lighthouse</option>
                                        <option value="Loft">Loft</option>
                                        <option value="Plane">Plane</option>
                                        <option value="Camper/RV">Camper/RV</option>
                                        <option value="Tent">Tent</option>
                                        <option value="Tipi">Tipi</option>
                                        <option value="Train">Train</option>
                                        <option value="Treehouse">Treehouse</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Yurt">Yurt</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>What will your guests have?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <input type="radio" className="host-step-radio" id="entire-place"
                                               name="reservation-type" />
                                        <div className="radio-input-group">
                                            <div className="host-img-box">
                                                <img src="images/icon-home.png" alt="icon home" />
                                            </div>
                                            <label for="entire-place">Entire Place</label>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <input type="radio" className="host-step-radio" id="private-room"
                                               name="reservation-type" />
                                        <div className="radio-input-group">
                                            <div className="host-img-box">
                                                <img src="images/icon-home.png" alt="icon home" />
                                            </div>
                                            <label for="private-room">Private room</label>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <input type="radio" className="host-step-radio" id="shared-room"
                                               name="reservation-type" />
                                        <div className="radio-input-group">
                                            <div className="host-img-box">
                                                <img src="images/icon-home.png" alt="icon home" />
                                            </div>
                                            <label for="shared-room">Shared Room</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Is this set up as dedicated guest space?</label>

                                    <input type="checkbox" name="dedicated-space" id="dedicated-space-yes"
                                           className="checkbox"/>
                                    <label for="dedicated-space-yes">Yes, it's primarily set up for guests</label>
                                    <input type="checkbox" name="dedicated-space" id="dedicated-space-no"
                                           className="checkbox"/>
                                    <label for="dedicated-space-no">No, I keep my personal belongings here</label>
                                </div>
                            </div>

                            <div className="clearfix"></div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="property-size">Please enter the size of your property</label>
                                    <div className="input-group">
                                        <input type="number" className="form-control" id="property-size"/>
                                        <span className="input-group-addon">m&sup2;</span>
                                    </div>
                                </div>
                            </div>


                            <div className="clearfix"></div>
                        </div>
                    </form>

                </div>
            </div>

        </div>

    </div>

</section>

                <Footer />
            </div>
        )
    }
}