import { NotificationManager } from 'react-notifications';

import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Wallet } from '../../../services/blockchain/wallet.js';
import { updateUserInfo, getCurrentLoggedInUserInfo } from '../../../requester';
import ReCAPTCHA from 'react-google-recaptcha';

const modal = {
    current: 'confirmWallet',
    prev: 'saveWallet',
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
        this.onWordsForget = this.onWordsForget.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onWordsForget() {
        NotificationManager.warning('Last call for saving your mnemonic words!');
        this.props.closeModal(modal.current);
        this.props.openModal(modal.prev);
    }

    handleSubmit(token) {
        if (this.state.mnemonic.trim() !== localStorage.walletMnemonic) {
            NotificationManager.warning('Wrong mnemonic words. Last call for saving them!');
            this.props.closeModal(modal.current);
            this.props.openModal(modal.prev);
        } 
        // else if (this.state.jsonFile.trim() !== localStorage.walletJson) {
        //     NotificationManager.warning("Wrong json file. You need to create a new wallet.");
        //     this.props.closeModal(modal.current);
        //     this.props.openModal(modal.prev);
        // }
         else {
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
                        <p>Enter your wallet mnemonic words:</p>
                        <textarea name="mnemonic" className="form-control" onChange={this.onChange} onFocus={this.handleFocus} value={this.state.mnemonic}/>
                        <br/>
                        {/* <p>Enter your wallet JSON:</p>
                        <input type="text" name="jsonFile" className="form-control" onChange={this.onChange} onFocus={this.handleFocus} value={this.state.jsonFile}/>
                        <br/> */}
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Confirm Wallet</button>
                        <button className="btn btn-primary" onClick={this.onWordsForget}>Sorry, I did not save them</button>
                    </Modal.Body>
                </Modal>
                
                <ReCAPTCHA
                    ref={el => this.captcha = el}
                    size="invisible"
                    sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                    onChange={token => {
                        console.log(this.props);
                        console.log("items");
                        console.log(localStorage);
                        if (this.props.userName != '' && this.props.userToken != '') {
                            if (localStorage.getItem('walletAddress') && localStorage.getItem('walletJson')) {
                                localStorage[Config.getValue('domainPrefix') + '.auth.lockchain'] = this.props.userToken;
                                localStorage[Config.getValue('domainPrefix') + '.auth.username'] = this.props.userName;
                                getCurrentLoggedInUserInfo().then(info => {
                                    let userInfo = {
                                        firstName: info.firstName,
                                        lastName: info.lastName,
                                        phoneNumber: info.phoneNumber,
                                        preferredLanguage: info.preferredLanguage,
                                        preferredCurrency: info.preferredCurrency.id,
                                        gender: info.gender,
                                        country: info.country.id,
                                        city: info.city.id,
                                        birthday: info.birthday,
                                        locAddress: localStorage.getItem('walletAddress'),
                                        jsonFile:  localStorage.getItem('walletJson')
                                    };

                                    updateUserInfo(userInfo, token).then((res) => {
                                        if (res.success) {
                                            NotificationManager.success('Successfully updated your profile', 'Update user profile');
                                            localStorage[Config.getValue('domainPrefix') + '.auth.lockchain'] = this.props.userToken;
                                            localStorage[Config.getValue('domainPrefix') + '.auth.username'] = this.props.userName;
                                        } else {
                                            localStorage.removeItem(Config.getValue('domainPrefix') + '.auth.lockchain');
                                            localStorage.removeItem(Config.getValue('domainPrefix') + '.auth.username');
                                            NotificationManager.error('Error!', 'Update user profile');
                                        }

                                        this.props.setUserInfo();
                                    });
                                });
                            }
                        } else { 
                            this.props.register(token); 
                        }
                        this.captcha.reset(); 
                    }
                    }
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