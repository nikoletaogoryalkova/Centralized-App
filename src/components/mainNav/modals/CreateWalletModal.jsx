import { NotificationManager } from 'react-notifications';
import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Wallet } from '../../../services/blockchain/wallet.js';
import { CREATE_WALLET, SAVE_WALLET } from '../../../constants/modals.js';
import { WALLET_INVALID_PASSWORD_LENGTH } from '../../../constants/warningMessages.js';
import { SCREEN_FREEZE } from '../../../constants/infoMessages.js';

export default function CreateWalletModal(props) {

  const submitPassword = () => {
    if (props.walletPassword.length < 9) {
      NotificationManager.warning(WALLET_INVALID_PASSWORD_LENGTH);
    } else {
      try {
        NotificationManager.info(SCREEN_FREEZE);
        setTimeout(() => {
          Wallet.createFromPassword(props.walletPassword).then((wallet) => {
            localStorage.setItem('walletAddress', wallet.address);
            localStorage.setItem('walletMnemonic', wallet.mnemonic);
            localStorage.setItem('walletJson', JSON.stringify(wallet.jsonFile));
            props.closeModal(CREATE_WALLET);
            props.openModal(SAVE_WALLET);
          });
        }, 1000);

      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Modal show={props.isActive} onHide={e => props.closeModal(CREATE_WALLET, e)} className="modal fade myModal">
        <Modal.Header>
          <h1>Enter your wallet password</h1>
          <button type="button" className="close" onClick={(e) => props.closeModal(CREATE_WALLET, e)}>&times;</button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => { e.preventDefault(); submitPassword(); }}>
            <div className="form-group">
              <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
              <input autoFocus type="password" name="walletPassword" value={props.walletPassword} onChange={props.onChange} className="form-control" placeholder="Password" />
            </div>

            <div className="login-sign">
              <p>This password will be used to encrypt and decrypt your newly created ETH/LOC wallet. Save it carefully or remember it, because it is irrecoverable.</p>
            </div>

            <button type="submit" className="btn btn-primary">Submit password</button>
            <div className="clearfix"></div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

CreateWalletModal.propTypes = {
  walletPassword: PropTypes.string,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  onChange: PropTypes.func,
  isActive: PropTypes.bool
};