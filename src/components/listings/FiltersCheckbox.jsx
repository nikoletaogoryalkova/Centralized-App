import PropTypes from 'prop-types';
import React from 'react';

const FiltersCheckbox = (props) => (
    <label className={`filter-check-label${props.checked ? ' active' : ''}`}>
        <span className="filter-check"></span>
        <span className="filter-check-text">{props.text}</span>
        <span className="filter-check-count">{props.count}</span>
    </label>
);

FiltersCheckbox.propTypes = {
    checked: PropTypes.bool,
    text: PropTypes.string,
    count: PropTypes.number
};

export default FiltersCheckbox;