import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

import { PASSWORD_PROMPT } from '../../../constants/modals.js';

export default function PasswordModal(props) {

  return (
    <div>
      <Modal show={props.isActive} onHide={e => props.closeModal(PASSWORD_PROMPT, e)} className="modal fade myModal">
        <Modal.Header>
          <h1>{props.text}</h1>
          <button type="button" className="close" onClick={(e) => props.closeModal(PASSWORD_PROMPT, e)}>&times;</button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => { e.preventDefault(); props.handleSubmit(); }}>
            <input type="password" placeholder={props.placeholder} name="password" value={props.password} className="form-control" onChange={props.onChange} />
            <button type="submit" className="btn btn-primary">Confirm</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

PasswordModal.propTypes = {
  password: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  onChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isActive: PropTypes.bool
};