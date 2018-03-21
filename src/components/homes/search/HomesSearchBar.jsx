import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../../DatePicker';
import moment from 'moment';

const SearchBar = (props) => (
    <section id="search-bar">
        <form id="search" onSubmit={props.handleSearch}>
            <div className="form-group has-feedback has-feedback-left" id="location">
                <i className="icon icon-map form-control-feedback"></i>
                {props.countries &&
                    <select onChange={props.onChange}
                        value={props.countryId}
                        className="form-control"
                        id="location-select"
                        name="countryId"
                        required="required">
                        <option disabled value="">Location</option>
                        {props.countries.map((item, i) => {
                            return <option key={i} value={item.id}>{item.name}</option>;
                        })}
                    </select>
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
                    name="guests"
                    className="form-control"
                    onChange={props.onChange}
                    required
                    placeholder="Guests"
                    value={props.guests} />
            </div>
            <button className="btn btn-primary">Search</button>
        </form>
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