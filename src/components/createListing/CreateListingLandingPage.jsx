import React from 'react';
import { NavLink } from 'react-router-dom';

import { Config } from '../../config';
import { Radio, FormControl, FormGroup } from 'react-bootstrap';

export default class CreateListingLandingPage extends React.Component {

    render() {
        return (
            <div>
                <section id="new-listing-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img src={Config.getValue("basePath") + "images/listing-illustration.png"} alt="listing-creation" />
                            </div>
                            <div className="col-md-6">
                                <h4>STEP ONE</h4>
                                <h3>What kind of place do you want to list?</h3>
                                <hr />
                                <form>
                                    <FormGroup>
                                        <Radio
                                            name="listingType"
                                            value={1}
                                            onChange={this.props.onChange}
                                            inline>
                                            Home
                                        </Radio>
                                        {' '}
                                        <Radio
                                            name="listingType"
                                            value={2}
                                            onChange={this.props.onChange}
                                            inline>
                                            Hotel
                                        </Radio>
                                    </FormGroup>
                                    <br />
                                    <FormGroup>
                                        <FormControl
                                            name="location"
                                            type="text"
                                            placeholder="Enter a location"
                                            value={this.state.location}
                                            onChange={this.props.onChange} />
                                    </FormGroup>
                                    <NavLink onClick={this.props.stepNext} to="/listings/create/2" className="btn btn-primary" id="btn-continue">Continue</NavLink>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}