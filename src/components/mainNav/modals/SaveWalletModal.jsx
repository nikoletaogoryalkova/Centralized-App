import { NotificationContainer } from 'react-notifications';

import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { SAVE_WALLET, CONFIRM_WALLET } from '../../../constants/modals.js';

export default function SaveWalletModal(props) {

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleSubmit = () => {
    props.closeModal(SAVE_WALLET);
    props.openModal(CONFIRM_WALLET);
  };

  return (
    <div>
      <Modal show={props.isActive} onHide={e => props.closeModal(SAVE_WALLET, e)} className="modal fade myModal">
        <Modal.Header>
          <h1>Save your wallet info.</h1>
          <button type="button" className="close" onClick={(e) => props.closeModal(SAVE_WALLET, e)}>&times;</button>
        </Modal.Header>
        <Modal.Body>
          <p>Wallet public address:</p>
          <input type="text" name="locAddress" className="form-control" onFocus={handleFocus} value={localStorage.walletAddress} />
          <br />
          <p>Wallet mnemonic words:</p>
          <textarea name="mnemonic" className="form-control" onFocus={handleFocus} value={localStorage.walletMnemonic} />
          <br />
          <input type="hidden" name="json" className="form-control" onFocus={handleFocus} value={localStorage.walletJson} />
          <p><b>You can use the mnemonic phrases to decrypt the wallet from external wallet manager such as MyEtherWallet or MetaMask. Save them carefully, they are irrecoverable.</b></p>
          <button className="btn btn-primary" onClick={handleSubmit}>Continue</button>
        </Modal.Body>
      </Modal>
      <NotificationContainer />
    </div>
  );
}

SaveWalletModal.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  isActive: PropTypes.bool
};