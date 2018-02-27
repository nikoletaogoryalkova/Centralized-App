import { NotificationContainer } from 'react-notifications';

import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Wallet } from '../../../services/blockchain/wallet.js';

const modal = {
    current: 'saveWallet',
    next: 'confirmWallet',
};

export default class SaveWalletModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            walletPassword: '',
        };

        this.onChange = this.onChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    handleFocus(e) {
        e.target.select();
    }

    handleSubmit() {
        this.props.closeModal(modal.current); 
        this.props.openModal(modal.next);
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(modal.current, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Save your wallet info.</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(modal.current, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Wallet public address:</p>
                        <input type="text" name="locAddress" className="form-control" onFocus={this.handleFocus} value={localStorage.walletAddress}/>
                        <br/>
                        <p>Wallet mnemonic words:</p>
                        <input type="text" name="mnemonic" className="form-control" onFocus={this.handleFocus} value={localStorage.walletMnemonic}/>
                        <br/>
                        <p>Wallet JSON:</p>
                        <input type="text" name="json" className="form-control" onFocus={this.handleFocus} value={localStorage.walletJson}/>
                        <br/>
                        <p>You can use the following JSON file or mnemonic phrases to decrypt the wallet from external wallet manager such as MyEtherWallet or MetaMask. Save them carefully, they are irrecoverable.</p>
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Continue</button>
                    </Modal.Body>
                </Modal>
                <NotificationContainer />
            </div>
        );
    }
}

SaveWalletModal.propTypes = {
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    isActive: PropTypes.bool
};