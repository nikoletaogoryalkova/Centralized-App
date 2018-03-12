import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Wallet } from '../../../services/blockchain/wallet.js';
import { modals } from '../../../constants/constants.js';

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
        if (this.state.walletPassword.length < 9) {
            NotificationManager.warning('Password should be at least 9 symbols');
        } else {
            try {
                NotificationManager.info('We are creating your wallet through the ethereum network. The screen might be unavailable for about 10 seconds...');
                setTimeout(() => {
                    Wallet.createFromPassword(this.state.walletPassword).then((wallet) => {
                        localStorage.setItem('walletAddress', wallet.address);
                        localStorage.setItem('walletMnemonic', wallet.mnemonic);
                        localStorage.setItem('walletJson', JSON.stringify(wallet.jsonFile));
                        this.props.closeModal(modals.CREATE_WALLET);
                        this.props.openModal(modals.SAVE_WALLET);
                    });
                }, 1000);
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(modals.CREATE_WALLET, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Enter your wallet password</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(modals.CREATE_WALLET, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => { e.preventDefault(); this.submitPassword(); }}>
                            <div className="form-group">
                                <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
                                <input type="password" name="walletPassword" value={this.state.recoveryEmail} onChange={this.onChange} className="form-control" placeholder="Password" />
                            </div>

                            <div className="login-sign">
                                <p><b>This password will be used to encrypt and decrypt your newly created ETH/LOC wallet. Save it carefully or remember it, because it is irrecoverable.</b></p>
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