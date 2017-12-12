import React from 'react';
import PropTypes from 'prop-types';

function Dropdown({name, options, value, updateDropdown, ...props}) {
    return (
        <select name={name} value={value} onChange={(e) => updateDropdown(e)} {...props}>
            {
                options.map((option) => <option key={option} value={option}>{option}</option>)
            }
        </select>
    )
}

Dropdown.propTypes ={
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Dropdown;