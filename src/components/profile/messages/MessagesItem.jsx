import { Config } from '../../../config';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

function MessagesItem(props) {
  const handleClick = () => {
    props.history.push('/profile/messages/chat/' + props.message.id);
  };

  return (
    <div className="message-box">
      <div className="col-md-1">
        <a onClick={() => props.changeMessageFlag(props.message.id, props.message.unread)}>
          {props.message.unread === 'true' ? <img className="read-flag" src={Config.getValue('basePath') + 'images/icon-star-message.png'} alt="read-flag" /> : <img src={Config.getValue('basePath') + 'images/icon-star-filter-g.png'} alt="unread-flag" />}
        </a>
      </div>
      <span onClick={handleClick} className="message-body">
        <div className="col-md-1 user-image">
          <span className="session-nav-user-thumb"><img src={`${Config.getValue('imgHost')}${props.message.userInfo.image}`} alt="user-profile" /></span>
        </div>
        <div className="col-md-2">
          <h4>{props.message.userInfo.fullName}</h4>
        </div>
        <div className="col-md-7 message-content" >
          <p>{props.message.lastMessage.currentUserSender ? 'You: ' : props.message.userInfo.fullName + ': '}{props.message.lastMessage && props.message.lastMessage.message}</p>
        </div>
        <div className="col-md-2">
          <p>{props.message.lastMessage && moment(props.message.lastMessage.createdAt, 'DD/MM/YYYY').format('DD MMM, YYYY')}</p>
        </div>
      </span>
    </div>
  );
}

export default withRouter(MessagesItem);

MessagesItem.propTypes = {
  history: PropTypes.object,
  message: PropTypes.object,
  changeMessageFlag: PropTypes.func
};