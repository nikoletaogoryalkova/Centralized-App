import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

export default function MessagesChatPage(props) {
  return (
    <div className="stamp">
      <hr />
      <span>{moment(props.date, 'DD/MM/YYYY').format('dddd, D MMM, YYYY')}</span>
    </div>
  );
}

MessagesChatPage.propTypes = {
  date: PropTypes.string
};