import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/css/components/profile/no-entries-message.css';

export default function NoEntriesMessage(props) {
  return (
    <div className="no-entries-message">
      <h4>{props.text}</h4>
      {props.children}
    </div>
  );
}

NoEntriesMessage.propTypes = {
  text: PropTypes.string
};