import PropTypes from 'prop-types';
import React from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import moment from 'moment';
import { Config } from '../../../config';

TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

export default function MessagesChat(props) {
  let messageCreatedAt = moment(props.message.createdAt, 'DD/MM/YYYY HH:mm:ss');
  return (
    <div className={(props.sender ? 'to' : 'from') + ' message'}>
      {!props.queueMessage ? <ul className="user">
        {props.sender ? null : <li className="thumb" style={{ backgroundImage: 'url(' + Config.getValue('imgHost') + props.message.sender.image + ')' }}></li>}
        <li className="name"><span>{props.message.sender.fullName}</span></li>
        <li className="when"><span>{messageCreatedAt < moment().add('-1', 'days') ? messageCreatedAt.format('HH:mm') : timeAgo.format(new Date(messageCreatedAt))}</span></li>
        {!props.sender ? null : <li className="thumb" style={{ backgroundImage: 'url(' + Config.getValue('imgHost') + props.message.sender.image + ')' }}></li>}
      </ul> : null}
      {props.children}
    </div>
  );
}

MessagesChat.propTypes = {
  message: PropTypes.object,
  sender: PropTypes.object,
  queueMessage: PropTypes.bool,
  children: PropTypes.object
};