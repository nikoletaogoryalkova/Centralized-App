import React from 'react';
import PropTypes from 'prop-types';

function Label({htmlFor, label}) {
    return (
        <label htmlFor={htmlFor}>
            {label}
        </label>
    );
}

Label.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

export default Label;