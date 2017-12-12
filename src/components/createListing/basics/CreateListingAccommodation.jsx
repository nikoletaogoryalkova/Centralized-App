import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingBasicsAside from './CreateListingBasicsAside';
import Counter from '../Counter';
import Dropdown from '../Dropdown';
import DropdownCounter from '../DropdownCounter';

export default class CreateListingAccommodation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            bedCount: 1,
            dropdownValue: '1',
            dropdownCount: 1,
        }
    }    

    updateCounter = event => {
        const value = Number(event.target.value);
        this.setState({ [event.target.name]: value });
    }

    updateDropdown = event => {
        this.setState({
            dropdownValue: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <CreateListingBasicsAside />
                <div className="reservation-hotel-review-room col-md-9">
                    <h2>Accommodation</h2>
                    <hr />

                    <div>
                        {/* <label>Guests:</label>
                        <Counter
                            name="guests"
                            value={this.state.guests}
                            onChange={this.updateCounter}/> */}
                    </div>

                    <br/>

                    {/* <div>
                        <Dropdown 
                            name="beds" 
                            options={['1', '2']} 
                            value={this.state.dropdown}
                            onChange={this.updateDropdown} />
                    </div>

                    <br/>

                    <div>
                        <DropdownCounter 
                            options={['1', '2']} 
                            dropdownValue={this.state.dropdownValue} 
                            count={this.state.dropdownCount} 
                            updateDropdown={this.updateDropdown} 
                            updateCount={this.updateCounter} />
                    </div> */}

                </div>
                <NavLink to="/listings/create/placetype" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/facilities" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}