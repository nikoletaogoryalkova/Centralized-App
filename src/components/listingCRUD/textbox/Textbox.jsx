import React from 'react';
import PropTypes from 'prop-types';

function Textbox({ name, value, placeholder, ...props }) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      {...props} />
  );
}

Textbox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Textbox;