import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { ENTER_RECOVERY_TOKEN } from '../../../constants/modals.js';

export default function EnterRecoveryTokenModal(props) {

  return (
    <div>
      <Modal show={props.isActive} onHide={e => props.closeModal(ENTER_RECOVERY_TOKEN, e)} className="modal fade myModal">
        <Modal.Header>
          <h1>Recover your password (2)</h1>
          <button type="button" className="close" onClick={(e) => props.closeModal(ENTER_RECOVERY_TOKEN, e)}>&times;</button>
        </Modal.Header>
        <Modal.Body>
          <p>A confirmation email has been sent. To enter a new password open the link from your email or enter the token in the field below. </p>
          <form onSubmit={(e) => { e.preventDefault(); props.handleSubmitRecoveryToken(); }}>
            <div className="form-group">
              <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
              <input type="text" name="recoveryToken" value={props.recoveryToken} onChange={props.onChange} className="form-control" placeholder="Token" />
            </div>

            <button type="submit" className="btn btn-primary">Proceed to Password Change</button>
            <div className="clearfix"></div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

EnterRecoveryTokenModal.propTypes = {
  recoveryToken: PropTypes.string,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  isActive: PropTypes.bool,
  onChange: PropTypes.func,
  handleSubmitRecoveryToken: PropTypes.func
};