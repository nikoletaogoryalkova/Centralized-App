import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingGuestSettingsAside from './CreateListingGuestSettingsAside';
import Textbox from '../Textbox';

export default class CreateListingHouseRules extends React.Component {

    render() {
        const { suitableForChildren, suitableForInfants, suitableForPets, smokingAllowed, eventsAllowed, otherHouseRules, otherRuleText } = this.props.values;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="listings create">
                            <div className="col-md-3">
                                <CreateListingGuestSettingsAside />
                            </div>
                            <div className="col-md-9">
                                <h2>House Rules</h2>
                                <hr />
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <p>Is your place suitable for children (2-12 years)?</p>
                                        </div>

                                        <div className="col-md-3">
                                            <label>
                                                <input
                                                    type="radio"
                                                    onChange={(e) => this.props.onChange(e)}
                                                    name="suitableForChildren"
                                                    checked={suitableForChildren === 'true'}
                                                    value="true" />Yes</label>
                                            {' '}
                                            <label>
                                                <input
                                                    type="radio"
                                                    onChange={(e) => this.props.onChange(e)}
                                                    name="suitableForChildren"
                                                    checked={suitableForChildren === 'false'}
                                                    value="false" />No</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-9">
                                            <p>Is your place suitable for infants (Under 2 years)?</p>
                                        </div>

                                        <div className="col-md-3">
                                            <label>
                                                <input
                                                    type="radio"
                                                    onChange={(e) => this.props.onChange(e)}
                                                    name="suitableForInfants"
                                                    checked={suitableForInfants === 'true'}
                                                    value="true" />Yes</label>
                                            {' '}
                                            <label>
                                                <input
                                                    type="radio"
                                                    onChange={(e) => this.props.onChange(e)}
                                                    name="suitableForInfants"
                                                    checked={suitableForInfants === 'false'}
                                                    value="false" />No</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-9">
                                            <p>Is your place suitable for pets?</p>
                                        </div>

                                        <div className="col-md-3">
                                            <label>
                                                <input
                                                    type="radio"
                                                    onChange={(e) => this.props.onChange(e)}
                                                    name="suitableForPets"
                                                    checked={suitableForPets === 'true'}
                                                    value="true" />Yes</label>
                                            {' '}
                                            <label>
                                                <input
                                                    type="radio"
                                                    onChange={(e) => this.props.onChange(e)}
                                                    name="suitableForPets"
                                                    checked={suitableForPets === 'false'}
                                                    value="false" />No</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-9">
                                            <p>Smoking allowed?</p>
                                        </div>

                                        <div className="col-md-3">
                                            <label>
                                                <input
                                                    type="radio"
                                                    onChange={(e) => this.props.onChange(e)}
                                                    name="smokingAllowed"
                                                    checked={smokingAllowed === 'true'}
                                                    value="true" />Yes</label>
                                            {' '}
                                            <label>
                                                <input
                                                    type="radio"
                                                    onChange={(e) => this.props.onChange(e)}
                                                    name="smokingAllowed"
                                                    checked={smokingAllowed === 'false'}
                                                    value="false" />No</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-9">
                                            <p>Events or parties allowed?</p>
                                        </div>

                                        <div className="col-md-3">
                                            <label>
                                                <input
                                                    type="radio"
                                                    onChange={(e) => this.props.onChange(e)}
                                                    name="eventsAllowed"
                                                    checked={eventsAllowed === 'true'}
                                                    value="true" />Yes</label>
                                            {' '}
                                            <label>
                                                <input
                                                    type="radio"
                                                    onChange={(e) => this.props.onChange(e)}
                                                    name="eventsAllowed"
                                                    checked={eventsAllowed === 'false'}
                                                    value="false" />No</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <p>Anything else?</p>
                                        </div>
                                    </div>
                                    <div className="col-md-9 other-rules">
                                        <div className="form-group">
                                            <input onChange={this.props.onChange} placeholder="Type rule here" id="other-rules" className="form-control" name="otherRuleText" value={otherRuleText} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="button" className="btn btn-primary" value="Add" onClick={() => this.props.addRule()} />
                                    </div>

                                    <div>
                                        {Array.from(otherHouseRules).map((item, i) =>
                                            <div key={i} className="row">
                                                <div className="col-md-9">
                                                    {item}
                                                </div>
                                                <div className="col-md-3">
                                                    <input type="button" value="Remove" onClick={() => this.props.removeRule(item)} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navigation col-md-12">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-7">
                        <NavLink to="/listings/create/photos" className="btn btn-default btn-back" id="btn-continue">
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            &nbsp;Back</NavLink>
                        <NavLink to="/listings/create/checking" className="btn btn-primary btn-next" id="btn-continue">Next</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}