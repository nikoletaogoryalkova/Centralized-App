import React from 'react';
import NavMain from './NavMain';
import Footer from '../Footer';
import { Radio, FormControl, FormGroup } from 'react-bootstrap';

export default class CreateListingLandingPage extends React.Component {
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
                                        <Radio name="radioGroup" inline>
                                        Home
                                        </Radio>
                                        {' '}
                                        <Radio name="radioGroup" inline>
                                        Hotel
                                        </Radio>
                                    </FormGroup>
                                    <br/>
                                    <FormGroup>
                                        <FormControl type="text" placeholder="Enter a location" />
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