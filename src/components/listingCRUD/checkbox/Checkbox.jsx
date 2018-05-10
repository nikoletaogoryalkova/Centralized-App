import React from 'react';
import PropTypes from 'prop-types';

function Checkbox({ name, label, checked, toggleCheckbox, ...props }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(event) => toggleCheckbox(event)}
        // {...props}
        />
        {label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
};

export default Checkbox;