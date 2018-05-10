import { NotificationManager } from 'react-notifications';
import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { CONFIRM_WALLET, SAVE_WALLET } from '../../../constants/modals.js';
import { MNEMONIC_LAST_CALL, WRONG_MNEMONIC_WORDS } from '../../../constants/warningMessages.js';

let captcha = undefined;

export default function CreateWalletModal(props) {

  const onWordsForget = () => {
    NotificationManager.warning(MNEMONIC_LAST_CALL);
    props.closeModal(CONFIRM_WALLET);
    props.openModal(SAVE_WALLET);
  };

  const handleSubmit = () => {
    if (props.mnemonicWords.trim() !== localStorage.walletMnemonic) {
      NotificationManager.warning(WRONG_MNEMONIC_WORDS);
      props.closeModal(CONFIRM_WALLET);
      props.openModal(SAVE_WALLET);
    } else {
      props.closeModal(CONFIRM_WALLET);
      captcha.execute();
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div>
      <Modal show={props.isActive} onHide={e => props.closeModal(CONFIRM_WALLET, e)} className="modal fade myModal">
        <Modal.Header>
          <h1>Confirm Wallet Information</h1>
          <button type="button" className="close" onClick={(e) => props.closeModal(CONFIRM_WALLET, e)}>&times;</button>
        </Modal.Header>
        <Modal.Body>
          <p>Enter your wallet mnemonic words:</p>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <textarea name="mnemonicWords" className="form-control" onChange={props.handleMnemonicWordsChange} value={props.mnemonicWords} autoFocus onKeyPress={handleEnterKeyPress} />
            <br />
            <button type="submit" className="btn btn-primary">Confirm Wallet</button>
          </form>
          <button className="btn btn-primary" onClick={onWordsForget}>Sorry, I did not save them</button>
        </Modal.Body>
      </Modal>

      <ReCAPTCHA
        ref={el => captcha = el}
        size="invisible"
        sitekey={Config.getValue('recaptchaKey')}
        onChange={(token) => { props.handleConfirmWallet(token); captcha.reset(); }}
      />
    </div>
  );
}

CreateWalletModal.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  handleConfirmWallet: PropTypes.func,
  handleMnemonicWordsChange: PropTypes.func,
  mnemonicWords: PropTypes.string,
  isActive: PropTypes.bool
};