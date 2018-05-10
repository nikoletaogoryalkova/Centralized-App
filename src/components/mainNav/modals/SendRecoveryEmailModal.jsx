import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { SEND_RECOVERY_EMAIL, ENTER_RECOVERY_TOKEN } from '../../../constants/modals.js';

let captcha = undefined;

export default function SendRecoveryEmailModal(props) {

  return (
    <div>
      <Modal show={props.isActive} onHide={e => props.closeModal(SEND_RECOVERY_EMAIL, e)} className="modal fade myModal">
        <Modal.Header>
          <h1>Recover your password</h1>
          <button type="button" className="close" onClick={(e) => props.closeModal(SEND_RECOVERY_EMAIL, e)}>&times;</button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => { e.preventDefault(); captcha.execute(); }}>
            <div className="form-group">
              <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
              <input type="email" name="recoveryEmail" value={props.recoveryEmail} onChange={props.onChange} className="form-control" placeholder="Email address" />
            </div>

            <div className="login-sign">
              <p>Already sent an email? Enter your security <a onClick={(e) => { e.preventDefault(); props.closeModal(SEND_RECOVERY_EMAIL); props.openModal(ENTER_RECOVERY_TOKEN); }}>token</a>.</p>
            </div>

            <button type="submit" className="btn btn-primary">Send email</button>
            <div className="clearfix"></div>
          </form>
        </Modal.Body>
      </Modal>

      <ReCAPTCHA
        ref={el => captcha = el}
        size="invisible"
        sitekey={Config.getValue('recaptchaKey')}
        onChange={token => { props.handleSubmitRecoveryEmail(token); captcha.reset(); }}
      />
    </div>
  );
}

SendRecoveryEmailModal.propTypes = {
  recoveryEmail: PropTypes.string,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  onChange: PropTypes.func,
  handleSubmitRecoveryEmail: PropTypes.func,
  isActive: PropTypes.bool
};