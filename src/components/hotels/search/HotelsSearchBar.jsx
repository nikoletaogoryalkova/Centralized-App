import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../../DatePicker';
import moment from 'moment';

import Select from 'react-select';

const SearchBar = (props) => (
    <section id="search-bar">
        <div className="container">
            <form id="search" onSubmit={props.handleSearch}>
                <div className="form-group has-feedback has-feedback-left" id="location">
                    {/* <i className="icon icon-map form-control-feedback"></i>
                    {props.countries && 
                        <select onChange={props.onChange}
                            value={props.countryId}
                            className="form-control"
                            id="location-select"
                            name="countryId"
                            required="required">
                            <option disabled value="">Country</option>
                            {props.countries.map((item, i) => {
                                return <option key={i} value={item.id}>{item.name}</option>;
                            })}
                        </select>
                    }
                    {props.cities && 
                        <select onChange={props.onChange}
                            value={props.cityId}
                            className="form-control"
                            id="location-select"
                            name="cityId"
                            required="required">
                            <option disabled value="">City</option>
                            {props.cities.map((item, i) => {
                                return <option key={i} value={item.id}>{item.name}</option>;
                            })}
                        </select>
                    } */}
                
                    {props.countries && 
                        <Select
                            name="country"
                            placeholder="Country"
                            className="form-control form-control-select"
                            style={{ border: 'none', boxShadow: 'none' }}
                            arrowRenderer={null}
                            clearable={false}
                            value={props.country && props.country.value}
                            onChange={props.handleSelectCountry}
                            options={props.countries.map((c) => {
                                return { value: c.id, label: c.name };
                            })}
                        />
                    }

                    {props.cities && 
                        <Select
                            name="city"
                            placeholder="City"
                            className="form-control form-control-select"
                            style={{ border: 'none', boxShadow: 'none' }}
                            arrowRenderer={null}
                            clearable={false}
                            value={props.city && props.city.value}
                            onChange={props.handleSelectCity}
                            options={props.cities.map((c) => {
                                return { value: c.id, label: c.name };
                            })}
                        />
                    }
                </div>

        
                <DatePicker
                    startDate={props.startDate}
                    endDate={props.endDate}
                    onApply={props.handleDatePick}
                    search={true}
                    nights={calculateNights(props.startDate, props.endDate)} />
        
                <div className="form-group has-feedback has-feedback-left" id="guests">
                    <i className="icon icon-guest form-control-feedback"></i>
                    <input type="text"
                        name="adults"
                        className="form-control"
                        style={{ width: '49%', marginRight: '5px', display: 'inline-block' }}
                        onChange={props.onChange}
                        required
                        placeholder="Adults"
                        value={props.adults} 
                    />
                    
                    <input type="text"
                        name="children"
                        className="form-control"
                        style={{ width: '48%', display: 'inline-block' }}
                        onChange={props.onChange}
                        required
                        placeholder="Children"
                        value={props.children} 
                    />
                </div>
                <button className="btn btn-primary">Search</button>
            </form>
        </div>
    </section>
);

const calculateNights = (startDate, endDate) => {
    const checkIn = moment(startDate, 'DD/MM/YYYY');
    const checkOut = moment(endDate, 'DD/MM/YYYY');
    return (checkOut > checkIn) ? checkOut.diff(checkIn, 'days') : 0;
};

SearchBar.propTypes = {
    countryId: PropTypes.string,
    countries: PropTypes.array,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    guests: PropTypes.string,
    onChange: PropTypes.func,
    handleSearch: PropTypes.func,
    handleDatePick: PropTypes.func,
};

export default SearchBar;