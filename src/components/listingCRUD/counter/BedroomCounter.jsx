import PropTypes from 'prop-types';
import React from 'react';

export default function BedroomCounter(props) {
  const increment = (e) => {
    e.target.name = props.name;
    e.target.value = props.value + 1;
    props.onChange(props.bedroom, e);
  };

  const decrement = (e) => {
    e.target.name = props.name;
    e.target.value = props.value - 1;
    props.onChange(props.bedroom, e);
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <span className="counter" onClick={(e) => decrement(e)}>&#8722;</span>

      <span
        style={{ margin: '10px', padding: '10px' }}>
        {props.value}
      </span>

      <span className="counter" onClick={(e) => increment(e)}>&#43;</span>
    </div>
  );
}

BedroomCounter.propTypes = {
  name: PropTypes.string.isRequired,
  bedroom: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
};