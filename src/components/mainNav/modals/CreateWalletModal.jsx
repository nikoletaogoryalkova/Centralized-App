import { NotificationContainer } from 'react-notifications';

import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Wallet } from '../../../services/blockchain/wallet.js';

const modal = {
    current: 'createWallet',
    next: 'saveWallet',
};

export default class CreateWalletModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            walletPassword: '',
        };

        this.onChange = this.onChange.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitPassword() {
        try {
            Wallet.createFromPassword(this.state.walletPassword).then((wallet) => {
                localStorage.setItem('walletAddress', wallet.address);
                localStorage.setItem('walletMnemonic', wallet.mnemonic);
                localStorage.setItem('walletJson', JSON.stringify(wallet.jsonFile));
                this.props.closeModal(modal.current);
                this.props.openModal(modal.next);
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(modal.current, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Enter yor wallet password</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(modal.current, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.error !== null ? <div className="error">{this.state.error}</div> : ''}
                        <form onSubmit={(e) => { e.preventDefault(); this.submitPassword(); }}>
                            <div className="form-group">
                                <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
                                <input type="password" name="walletPassword" value={this.state.recoveryEmail} onChange={this.onChange} className="form-control" placeholder="Password" />
                            </div>

                            <div className="login-sign">
                                <p>This password will be used to encrypt and decrypt your newly created ETH/LOC wallet. Save it carefully or remember it, because it is irrecoverable.</p>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit password</button>
                            <div className="clearfix"></div>
                        </form>
                    </Modal.Body>
                </Modal>
                <NotificationContainer />
            </div>
        );
    }
}

CreateWalletModal.propTypes = {
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    isActive: PropTypes.bool
};