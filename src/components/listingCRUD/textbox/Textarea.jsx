import React from 'react';
import PropTypes from 'prop-types';

function Textarea({ name, value, placeholder, rows = 5, ...props }) {
  return (
    <div>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        className="form-control"
        {...props}></textarea>
    </div>
  );
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number
};

export default Textarea;