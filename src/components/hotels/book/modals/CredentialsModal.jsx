import { Config } from '../../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { ENTER_WALLET_PASSWORD } from '../../../../constants/modals.js';

let captcha = undefined;

export default function CredentialsModal(props) {

  return (
    <div>
      <Modal show={props.isActive} onHide={e => props.closeModal(ENTER_WALLET_PASSWORD, e)} className="modal fade myModal">
        <Modal.Header>
          <h1>Enter your wallet password</h1>
          <button type="button" className="close" onClick={(e) => props.closeModal(ENTER_WALLET_PASSWORD, e)}>&times;</button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => { e.preventDefault(); props.handleSubmit(); }}>
            <input type="password" placeholder="Wallet Password" name="walletPassword" value={props.walletPassword} className="form-control" onChange={props.onChange} />
            <button type="submit" className="btn btn-primary">Confirm</button>

            <ReCAPTCHA
              ref={el => captcha = el}
              size="invisible"
              sitekey={Config.getValue('recaptchaKey')}
              onChange={(token) => { props.handleSubmit(token); captcha.reset(); }}
            />
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

CredentialsModal.propTypes = {
  walletPassword: PropTypes.string,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  onChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isActive: PropTypes.bool
};