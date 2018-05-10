import React from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

import { Config } from '../../../config';
import { getEmailFreeResponse } from '../../../requester';
import { REGISTER, CREATE_WALLET } from '../../../constants/modals.js';

import {
  INVALID_EMAIL,
  EMAIL_ALREADY_EXISTS,
  INVALID_FIRST_NAME,
  INVALID_LAST_NAME,
  PROFILE_INVALID_PASSWORD_LENGTH,
  PROFILE_PASSWORD_REQUIREMENTS
} from '../../../constants/warningMessages.js';

export default function LoginModal(props) {

  const openWalletInfo = () => {
    getEmailFreeResponse(props.signUpEmail).then(res => {
      let isEmailFree = false;
      if (res.exist) {
        isEmailFree = false;
      } else {
        isEmailFree = true;
      }

      if (!validator.isEmail(props.signUpEmail)) {
        NotificationManager.warning(INVALID_EMAIL);
      } else if (!isEmailFree) {
        NotificationManager.warning(EMAIL_ALREADY_EXISTS);
      } else if (validator.isEmpty(props.signUpFirstName)) {
        NotificationManager.warning(INVALID_FIRST_NAME);
      } else if (validator.isEmpty(props.signUpLastName)) {
        NotificationManager.warning(INVALID_LAST_NAME);
      } else if (props.signUpPassword.length < 6) {
        NotificationManager.warning(PROFILE_INVALID_PASSWORD_LENGTH);
      } else if (!props.signUpPassword.match('^([^\\s]*[a-zA-Z]+.*?[0-9]+[^\\s]*|[^\\s]*[0-9]+.*?[a-zA-Z]+[^\\s]*)$')) {
        NotificationManager.warning(PROFILE_PASSWORD_REQUIREMENTS);
      } else {
        props.closeModal(REGISTER);
        props.openModal(CREATE_WALLET);
      }
    });
  };

  return (
    <div>
      <Modal show={props.isActive} onHide={() => props.closeModal(REGISTER)} className="modal fade myModal">
        <Modal.Header>
          <h1>Sign up</h1>
          <button type="button" className="close" onClick={() => props.closeModal(REGISTER)}>&times;</button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => { e.preventDefault(); openWalletInfo(); }}>
            <div className="form-group">
              <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
              <input type="email" name="signUpEmail" value={props.signUpEmail} onChange={props.onChange} className="form-control" placeholder="Email address" autoFocus />
            </div>
            <div className="form-group">
              <img src={Config.getValue('basePath') + 'images/login-user.png'} alt="user" />
              <input type="text" required="required" name="signUpFirstName" value={props.signUpFirstName} onChange={props.onChange} className="form-control" placeholder="First Name" />
            </div>
            <div className="form-group">
              <img src={Config.getValue('basePath') + 'images/login-user.png'} alt="user" />
              <input type="text" required="required" name="signUpLastName" value={props.signUpLastName} onChange={props.onChange} className="form-control" placeholder="Last Name" />
            </div>
            <div className="form-group">
              <img src={Config.getValue('basePath') + 'images/login-pass.png'} alt="pass" />
              <input type="password" required="required" name="signUpPassword" value={props.signUpPassword} onChange={props.onChange} className="form-control" placeholder="Password" />
            </div>
            <div className="clearfix"></div>
            <button type="submit" className="btn btn-primary">Proceed</button>
          </form>
          <div className="signup-rights">
            <p>By creating an account, you are agreeing with our Terms and Conditions and Privacy Statement.</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

LoginModal.propTypes = {
  signUpEmail: PropTypes.string,
  signUpFirstName: PropTypes.string,
  signUpLastName: PropTypes.string,
  signUpPassword: PropTypes.string,
  onChange: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  isActive: PropTypes.bool
};