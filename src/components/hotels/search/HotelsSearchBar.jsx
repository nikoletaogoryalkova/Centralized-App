import React from 'react';
import PropTypes from 'prop-types';
import HotelsSearchBarDatePicker from './HotelsSearchBarDatePicker';
import moment from 'moment';

// import Autocomplete from 'react-google-autocomplete';

import Select from 'react-select';
import { getRegionsBySearchParameter } from '../../../requester';

function SearchBar(props) {

    // const getAddressComponents = (place) => {
    //     let components = place.address_components;
    //     let result = [];
    //     for (let i = 0; i < components.length; i++) {
    //         let addressComponent = {
    //             name: components[i].long_name,
    //             shortName: components[i].short_name,
    //             type: components[i].types[0]
    //         };
    //         result.push(addressComponent);
    //     }
    //     return result;
    // };

    // const setAddressComponents = (addressComponentsMap) => {
    //     let addressCountry = addressComponentsMap.filter(x => x.type === 'country')[0];
    //     let addressCityName = addressComponentsMap.filter(x => x.type === 'locality')[0];
    //     let addressStateName = addressComponentsMap.filter(x => x.type === 'administrative_area_level_1')[0];

    //     props.onChange({ target: { name: 'country', value: addressCountry ? addressCountry.name : '' }});
    //     props.onChange({ target: { name: 'city', value: addressCityName ? addressCityName.name : '' }});
    //     props.onChange({ target: { name: 'state', value: addressStateName ? addressStateName.name : '' }});
    //     props.onChange({ target: { name: 'countryCode', value: addressCountry ? addressCountry.shortName : '' }});
    // };

    // const handlePlaceSelect = (place) => {
    //     console.log(place);
    //     if (place.address_components !== undefined) {
    //         let addressComponentsMap = getAddressComponents(place);
    //         setAddressComponents(addressComponentsMap);
    //     }
    // };

    const getRegions = (param) => {
        if (!param) {
            return Promise.resolve({ options: [] });
        }

        // if (query.length < 3) {
        //     return Promise.resolve({ options: [] });
        // }

        return getRegionsBySearchParameter(param)
            .then((json) => {
                return { options: json };
            });
    };

    const { startDate, endDate, rooms, adults, childrenCount, childrenAges } = props;
    const { onChange, handleDatePick, handleAdultsChange, handleChildrenChange, handleChildAgeChange } = props;

    return (
        <section id="search-bar">
            <div className="container">
                <form id="search" onSubmit={props.handleSearch}>
                    <div className="row">
                        <div className="form-group has-feedback has-feedback-left search-region" id="location">
                            {/* <Autocomplete
                                className="form-control"
                                onPlaceSelected={handlePlaceSelect}
                            /> */}

                            <Select.Async
                                className="form-control"
                                placeholder="Region..."
                                required
                                style={{ boxShadow: 'none', border: 'none', fontSize: '15px', top: '5px' }}
                                value={props.region} 
                                onChange={props.handleSelectRegion} 
                                valueKey={"id"} 
                                labelKey={"query"} 
                                loadOptions={getRegions}
                                backspaceRemoves={true}
                                arrowRenderer={null}
                            />
				
                        </div>
                
                        <HotelsSearchBarDatePicker
                            startDate={props.startDate}
                            endDate={props.endDate}
                            onApply={props.handleDatePick}
                            search={true}
                            nights={calculateNights(props.startDate, props.endDate)} />
                
                        <div className="form-group has-feedback has-feedback-left search-dropdown" id="rooms">
                            <select name={'rooms'} className="form-control" value={rooms.length} onChange={props.handleRoomsChange}>
                                <option value="1">1 room</option>
                                <option value="2">2 rooms</option>
                                <option value="3">3 rooms</option>
                                <option value="4">4 rooms</option>
                                <option value="5">5 rooms</option>
                            </select>
                        </div>

                        <div className="form-group has-feedback has-feedback-left search-dropdown" id="adults">
                            <select name={'adults'} className="form-control" value={props.adults} onChange={props.onChange}>
                                <option value="1">1 adult</option>
                                <option value="2">2 adults</option>
                                <option value="3">3 adults</option>
                                <option value="4">4 adults</option>
                                <option value="5">5 adults</option>
                                <option value="6">6 adult</option>
                                <option value="7">7 adults</option>
                                <option value="8">8 adults</option>
                                <option value="9">9 adults</option>
                                <option value="10">10 adults</option>
                            </select>
                        </div>

                        <div className="form-group has-feedback has-feedback-left search-dropdown" id="childrenCount">
                            <select name={'childrenCount'} className="form-control" value={props.childrenCount} onChange={props.onChange}>
                                <option value="0">No children</option>
                                <option value="1">1 child</option>
                                <option value="2">2 children</option>
                                <option value="3">3 children</option>
                                <option value="4">4 children</option>
                                <option value="5">5 children</option>
                            </select>
                        </div>
                        <button className="btn btn-primary">Search</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

const calculateNights = (startDate, endDate) => {
    const checkIn = moment(startDate, 'DD/MM/YYYY');
    const checkOut = moment(endDate, 'DD/MM/YYYY');
    return (checkOut > checkIn) ? checkOut.diff(checkIn, 'days') : 0;
};

SearchBar.propTypes = {
    place: PropTypes.string,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    guests: PropTypes.string,
    onChange: PropTypes.func,
    handleSearch: PropTypes.func,
    handleDatePick: PropTypes.func,
};

export default SearchBar;