import React from 'react';
import PropTypes from 'prop-types';
import FilterCheckbox from '../../../common/filter/FilterCheckbox';
import ReactBootstrapSlider from 'react-bootstrap-slider';

const FilterPanel = (props) => (
    <div className="filter-box">
        {props.isSearchReady
            ? (
                <div>
                    <div className="form-group">
                        <label>Order By</label>

                        <div className="filter-price-box">
                            <select name={'orderBy'} className="form-control" value={props.orderBy} onChange={props.handleOrderBy}>
                                <option value=''>Order by</option>
                                <option value='asc'>Lowest price</option>
                                <option value='desc'>Highest price</option>
                            </select>
                            <div className="clearfix" />
                        </div>

                        <label>Pricing</label>

                        <div className="filter-price-box">
                            <ReactBootstrapSlider
                                value={props.priceRange}
                                slideStop={(e) => { props.handlePriceRangeSelect(e); }}
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
                        <button type="submit" onClick={props.clearFilters} className="btn btn">Clear Filters</button>
                    </div>
                </div>
            )
            : (
                <div>
                    <div className="form-group">
                        To filter, wait for all results or stop the search 
                        <button type="submit" onClick={props.handleStopSearch} className="btn btn">Stop Search</button>
                    </div>
                </div>
            )
        }
    </div>
);

FilterPanel.propTypes = {
    priceRange: PropTypes.array,
};

export default FilterPanel;