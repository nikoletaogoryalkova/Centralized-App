import React from 'react';
import { NavLink } from 'react-router-dom';

import { Config } from '../../../config';

export default class CreateListingLandingPage extends React.Component {


    render() {
        const {type, country, countries} = this.props.values;
    
        return (
            <div className="listings create landing">
                <div className="col-md-6">
                    <img src={Config.getValue("basePath") + "images/listing-illustration.png"} alt="listing-creation" className="left-poster" />
                </div>
                <div className="col-md-6">
                    <div className="column-container">
                        <h4>STEP ONE</h4>
                        <h3>What kind of place do you want to list?</h3>
                        <hr />
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="house">
                                        <input 
                                            type="radio" 
                                            onChange={(e) => this.props.onChange(e)} 
                                            name="type" 
                                            checked={type === 'home'} 
                                            value="home"/>
                                        <span className="button"><img src="/images/icon-check-japonica.png" /></span>
                                        <span>Home</span>
                                    </label>
                                    <label className="hotel">
                                        <input 
                                            type="radio" 
                                            onChange={(e) => this.props.onChange(e)} 
                                            name="type" 
                                            checked={type === 'hotel'} 
                                            value="hotel"/>
                                        <span className="button"><img src="/images/icon-check-japonica.png" /></span>
                                        <span>Hotel</span>
                                    </label>
                                    <br />
                                    <select 
                                        value={country}
                                        name="country"
                                        required="required"
                                        onChange={(e) => this.props.onChange(e)}>
                                        <option disabled value="">Location</option>
                                        {countries.map((item, i) => {
                                            return <option key={i} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <NavLink 
                            to="/listings/create/placetype" 
                            className="btn btn-primary" 
                            id="btn-continue">
                            Continue
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}