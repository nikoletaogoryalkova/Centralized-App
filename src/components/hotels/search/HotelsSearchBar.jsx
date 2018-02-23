import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../../DatePicker';
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
                        <div className="form-group has-feedback has-feedback-left" id="location">
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
                
                        <DatePicker
                            startDate={props.startDate}
                            endDate={props.endDate}
                            onApply={props.handleDatePick}
                            search={true}
                            nights={calculateNights(props.startDate, props.endDate)} />
                
                        <div className="form-group has-feedback has-feedback-left" id="guests">
                            <i className="icon icon-guest form-control-feedback"></i>

                            <input type="number"
                                name="rooms"
                                className="form-control"
                                style={{ display: 'inline-block' }}
                                onChange={props.handleRoomsChange}
                                placeholder="Rooms"
                                value={rooms.length} 
                            />
                            
                        </div>
                        <button className="btn btn-primary">Search</button>
                    </div>
                    {props.rooms.map((room, roomIndex) => {
                        return (
                            <div key={roomIndex} className="row">
                                <input type="number"
                                    name={`adults${roomIndex}`}
                                    className="form-control"
                                    style={{ width: '10%', marginRight: '5px', display: 'inline-block' }}
                                    onChange={(e) => handleAdultsChange(e, roomIndex)}
                                    required
                                    placeholder="Adults"
                                    value={room.adults} 
                                />
                            
                                <input type="number"
                                    name={`children${roomIndex}`}
                                    className="form-control"
                                    style={{ width: '10%', display: 'inline-block' }}
                                    onChange={(e) => handleChildrenChange(e, roomIndex)}
                                    placeholder="Children"
                                    value={childrenCount} 
                                />

                                {(room.children.length > 0) &&
                                    room.children.map((age, childIndex) => {
                                        return (
                                            <input key={childIndex} type="number"
                                                name={`child${childIndex}`}
                                                className="form-control"
                                                style={{ width: '8%', display: 'inline-block' }}
                                                onChange={(e) => handleChildAgeChange(e, roomIndex, childIndex)}
                                                required
                                                placeholder="Age"
                                                value={room.children[childIndex]} 
                                            />
                                        );
                                    })
                                }
                            </div>
                        );
                    })}
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