import PropTypes from 'prop-types';
import React from 'react';

function Dropdown({ name, options, value, onChange, ...props }) {
  return (
    <select name={name} value={value} onChange={(e) => onChange(e)} {...props}>
      {
        options.map((option) => <option key={option} value={`${option}`}>{option}</option>)
      }
    </select>
  );
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;