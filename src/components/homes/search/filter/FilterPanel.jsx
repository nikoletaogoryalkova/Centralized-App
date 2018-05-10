import React from 'react';
import PropTypes from 'prop-types';
import FilterCheckbox from '../../../common/filter/FilterCheckbox';
import ReactBootstrapSlider from 'react-bootstrap-slider';

const FilterPanel = (props) => (
  <div className="filter-box">
    <div className="form-group">
      <label>City</label>
      <div className="filter-check-box">
        {props.cities.map((item, i) => {
          return (
            <div key={i} onClick={(e) => { props.toggleFilter('cities', item.text); props.handleSearch(e); }}>
              <FilterCheckbox
                key={i}
                text={item.text}
                count={item.count}
                checked={props.citiesToggled.has(item.text)} />
            </div>
          );
        })}
      </div>
    </div>
    <div className="clearfix" />

    <div className="form-group">
      <label>Pricing</label>

      <div className="filter-price-box">
        <ReactBootstrapSlider
          value={props.priceValue}
          slideStop={(e) => { props.setPriceValue(e); props.handleSearch(e); }}
          step={5}
          max={5000}
          min={1}
          orientation="horizontal"
          range={true} />
        <div className="clearfix" />
      </div>
    </div>
    <div className="clearfix" />

    <div className="form-group">
      <label>Property Type</label>
      <div className="filter-check-box">
        {props.propertyTypes.map((item, i) => {
          return (
            <div key={i} onClick={(e) => { props.toggleFilter('propertyTypes', item.text); props.handleSearch(e); }}>
              <FilterCheckbox
                key={i}
                text={item.text}
                count={item.count}
                checked={props.propertyTypesToggled.has(item.text)} />
            </div>
          );
        })}
      </div>
    </div>
    <div className="clearfix" />

    <div className="form-group">
      <button type="submit" onClick={props.clearFilters} className="btn btn">Clear Filters</button>
    </div>
  </div>
);

FilterPanel.propTypes = {
  cities: PropTypes.array,
  citiesToggled: PropTypes.any,
  propertyTypes: PropTypes.array,
  propertyTypesToggled: PropTypes.any,
  priceValue: PropTypes.array,
  setPriceValue: PropTypes.func,
  countryId: PropTypes.string,
  handleSearch: PropTypes.func,
  toggleFilter: PropTypes.func,
  clearFilters: PropTypes.func,
};

export default FilterPanel;