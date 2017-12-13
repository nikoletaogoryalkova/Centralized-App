import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingGuestSettingsAside from './CreateListingGuestSettingsAside';
import Textbox from '../Textbox';

export default class CreateListingHouseRules extends React.Component {

    render() {
        const {suitableForChildren, suitableForInfants, suitableForPets, smokingAllowed, eventsAllowed, otherHouseRules} = this.props.values;
        return (
            <div>
                <CreateListingGuestSettingsAside />
                <div className="col-md-9">
                    <h2>House Rules</h2>
                    <hr/>
                    <div className="form-group">
                        <div className="row">  
                            <div className="col-md-9">
                                Is your place suitable for children (2-12 years)?
                            </div>
                                
                            <div className="col-md-3">
                                <label>
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        name="suitableForChildren" 
                                        checked={suitableForChildren === 'true'} 
                                        value="true"/>
                                    Yes
                                </label>
                                {' '}
                                <label>
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        name="suitableForChildren" 
                                        checked={suitableForChildren === 'false'} 
                                        value="false"/>
                                    No
                                </label>
                            </div>
                        </div>

                        <div className="row">  
                            <div className="col-md-9">
                                Is your place suitable for infants (Under 2 years)?
                            </div>
                                
                            <div className="col-md-3">
                                <label>
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        name="suitableForInfants" 
                                        checked={suitableForInfants === 'true'} 
                                        value="true"/>
                                    Yes
                                </label>
                                {' '}
                                <label>
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        name="suitableForInfants" 
                                        checked={suitableForInfants === 'false'} 
                                        value="false"/>
                                    No
                                </label>
                            </div>
                        </div>

                        <div className="row">  
                            <div className="col-md-9">
                                Is your place suitable for pets?
                            </div>
                                
                            <div className="col-md-3">
                                <label>
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        name="suitableForPets" 
                                        checked={suitableForPets === 'true'} 
                                        value="true"/>
                                    Yes
                                </label>
                                {' '}
                                <label>
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        name="suitableForPets" 
                                        checked={suitableForPets === 'false'} 
                                        value="false"/>
                                    No
                                </label>
                            </div>
                        </div>

                        <div className="row">  
                            <div className="col-md-9">
                                Smoking allowed?
                            </div>
                                
                            <div className="col-md-3">
                                <label>
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        name="smokingAllowed" 
                                        checked={smokingAllowed === 'true'} 
                                        value="true"/>
                                    Yes
                                </label>
                                {' '}
                                <label>
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        name="smokingAllowed" 
                                        checked={smokingAllowed === 'false'} 
                                        value="false"/>
                                    No
                                </label>
                            </div>
                        </div>

                        <div className="row">  
                            <div className="col-md-9">
                                Events or parties allowed?
                            </div>
                                
                            <div className="col-md-3">
                                <label>
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        name="eventsAllowed" 
                                        checked={eventsAllowed === 'true'} 
                                        value="true"/>
                                    Yes
                                </label>
                                {' '}
                                <label>
                                    <input 
                                        type="radio" 
                                        onChange={(e) => this.props.onChange(e)} 
                                        name="eventsAllowed" 
                                        checked={eventsAllowed === 'false'} 
                                        value="false"/>
                                    No
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-9">
                                <label htmlFor="">
                                    Anything else?
                                    <Textbox 
                                        />
                                </label>
                            </div>
                                    
                            <div className="col-md-3">
                                <input type="button" value="Add" onClick={this.props.addRule}/>
                            </div>

                        </div>

                        <div >
                            {Array.from(otherHouseRules).map((item, i) => 
                                <div key={i} className="row">
                                    <div className="col-md-9">
                                        {item}
                                    </div>
                                    <div className="col-md-3">
                                        <input type="button" value="Remove" onClick={this.props.removeRule}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <NavLink to="/listings/create/photos" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/checking" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}