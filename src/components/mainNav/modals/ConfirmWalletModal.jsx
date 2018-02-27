import { NotificationManager } from 'react-notifications';

import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Wallet } from '../../../services/blockchain/wallet.js';
import ReCAPTCHA from 'react-google-recaptcha';

const modal = {
    current: 'confirmWallet',
    prev: 'createWallet',
    next: 'showLoginModal',
};

export default class CreateWalletModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mnemonic: '',
            jsonFile: '',
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(token) {
        if (this.state.mnemonic.trim() !== localStorage.walletMnemonic) {
            NotificationManager.warning("Wrong mnemonic words. You need to create a new wallet.");
            this.props.closeModal(modal.current);
            this.props.openModal(modal.prev);
        } else if (this.state.jsonFile.trim() !== localStorage.walletJson) {
            NotificationManager.warning("Wrong json file. You need to create a new wallet.");
            this.props.closeModal(modal.current);
            this.props.openModal(modal.prev);
        } else {
            this.props.closeModal(modal.current);
            this.captcha.execute();
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(modal.current, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Confirm Wallet Information</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(modal.current, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.error !== null ? <div className="error">{this.state.error}</div> : ''}
                        <p>Enter your wallet mnemonic word:</p>
                        <input type="text" name="mnemonic" className="form-control" onChange={this.onChange} onFocus={this.handleFocus} value={this.state.mnemonic}/>
                        <br/>
                        <p>Enter your wallet JSON:</p>
                        <input type="text" name="jsonFile" className="form-control" onChange={this.onChange} onFocus={this.handleFocus} value={this.state.jsonFile}/>
                        <br/>
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Confirm Wallet</button>
                    </Modal.Body>
                </Modal>
                
                <ReCAPTCHA
                    ref={el => this.captcha = el}
                    size="invisible"
                    sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                    onChange={token => { this.props.register(token); this.captcha.reset(); }}
                />
            </div>
        );
    }
}

CreateWalletModal.propTypes = {
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    isActive: PropTypes.bool
};