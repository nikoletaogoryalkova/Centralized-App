import React from 'react';
import PropTypes from 'prop-types';

function Textbox({name, value, placeholder, ...props}) {
    return (
        <input type="text" name={name} value={value} placeholder={placeholder} />
    )
}

Textbox.propTypes ={
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Textbox;