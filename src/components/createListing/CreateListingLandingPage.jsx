import React from 'react';
import NavMain from './NavMain';
import Footer from '../Footer';
import { Radio, FormControl, FormGroup } from 'react-bootstrap';

export default class CreateListingLandingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            listingType: 'home',
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div>
                <NavMain />

                <section id="new-listing-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img src="../../../images/listing-illustration.png" alt="picture"/>
                            </div>
                            <div className="col-md-6">
                                <h4>STEP ONE</h4>
                                <h3>What kind of place do you want to list?</h3>
                                <hr/>
                                <form>
                                    <FormGroup>
                                        <Radio 
                                            name="listingType"
                                            value="home"
                                            onChange={this.onChange}
                                            checked={this.state.listingType === "home"} 
                                            inline>
                                            Home
                                        </Radio>
                                        {' '}
                                        <Radio 
                                            name="listingType"
                                            value="hotel"
                                            onChange={this.onChange}
                                            checked={this.state.listingType === "hotel"} 
                                            inline>
                                            Hotel
                                        </Radio>
                                    </FormGroup>
                                    <br/>
                                    <FormGroup>
                                        <FormControl
                                            name="location"
                                            type="text" 
                                            placeholder="Enter a location"
                                            value={this.state.location} 
                                            onChange={this.onChange}/>
                                    </FormGroup>
                                    <button class="btn btn-primary" id="btn-continue">Continue</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }
}