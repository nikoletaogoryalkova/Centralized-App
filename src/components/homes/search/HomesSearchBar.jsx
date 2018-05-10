import React from 'react';
import PropTypes from 'prop-types';
import HomesSearchBarDatePicker from './HomesSearchBarDatePicker';
import moment from 'moment';

const SearchBar = (props) => (
  <div className="source-panel">
    <div className="source-panel-select source-panel-item">
      {/* <i className="icon icon-map form-control-feedback"></i> */}
      {props.countries &&
        <select onChange={props.onChange}
          value={props.countryId}
          // className="form-control"
          id="location-select"
          name="countryId"
          required="required">
          <option disabled value="">Choose a location</option>
          {props.countries.map((item, i) => {
            return <option key={i} value={item.id}>{item.name}</option>;
          })}
        </select>
      }
    </div>

    <div className="check-wrap source-panel-item">
      <div className="check">
        <HomesSearchBarDatePicker
          startDate={props.startDate}
          endDate={props.endDate}
          onApply={props.handleDatePick}
          search={true}
          nights={calculateNights(props.startDate, props.endDate)} />
      </div>

      <div className="days-of-stay">
        <span className="icon-moon"></span>
        <span>{calculateNights(props.startDate, props.endDate)} nights</span>
      </div>
    </div>

    <div className="source-panel-select source-panel-item">
      <select onChange={props.onChange}
        value={props.guests}
        // className="form-control"
        id="location-select"
        name="guests"
        required="required">
        <option value={1}>Guests: 1</option>
        <option value={2}>Guests: 2</option>
        <option value={3}>Guests: 3</option>
        <option value={4}>Guests: 4</option>
        <option value={5}>Guests: 5</option>
        <option value={6}>Guests: 6</option>
        <option value={7}>Guests: 7</option>
        <option value={8}>Guests: 8</option>
        <option value={9}>Guests: 9</option>
        <option value={10}>Guests: 10</option>
      </select>
    </div>
    {/* <div className="form-group has-feedback has-feedback-left" id="guests">
      <i className="icon icon-guest form-control-feedback"></i>
      <input type="text"
        name="guests"
        className="form-control"
        onChange={props.onChange}
        required
        placeholder="Guests"
        value={props.guests} />
    </div> */}
    <button className="btn btn-primary" onClick={props.handleSearch}>Search</button>
  </div>
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