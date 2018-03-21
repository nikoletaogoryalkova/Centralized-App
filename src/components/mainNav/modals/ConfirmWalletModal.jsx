import { NotificationManager } from 'react-notifications';

import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { updateUserInfo, getCurrentLoggedInUserInfo } from '../../../requester';
import ReCAPTCHA from 'react-google-recaptcha';
import { CONFIRM_WALLET, SAVE_WALLET } from '../../../constants/modals.js';
import { MNEMONIC_LAST_CALL, WRONG_MNEMONIC_WORDS } from '../../../constants/warningMessages.js';
import { PROFILE_SUCCESSFULLY_UPDATED } from '../../../constants/successMessages.js';
import { PROFILE_UPDATE_ERROR } from '../../../constants/errorMessages.js';

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
        this.updateUser = this.updateUser.bind(this);
        this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
    }

    onChange(e) {
        const value = e.target.value.replace(/\n/g, '');
        this.setState({ [e.target.name]: value });
    }

    onWordsForget() {
        NotificationManager.warning(MNEMONIC_LAST_CALL);
        this.props.closeModal(CONFIRM_WALLET);
        this.props.openModal(SAVE_WALLET);
    }

    handleSubmit() {
        if (this.state.mnemonic.trim() !== localStorage.walletMnemonic) {
            NotificationManager.warning(WRONG_MNEMONIC_WORDS);
            this.props.closeModal(CONFIRM_WALLET);
            this.props.openModal(SAVE_WALLET);
        } else {
            this.props.closeModal(CONFIRM_WALLET);
            this.captcha.execute();
        }
    }

    updateUser(token) {
        if (this.props.userName !== '' && this.props.userToken !== '') {
            if (localStorage.getItem('walletAddress') && localStorage.getItem('walletJson')) {
                // Set user token in localstorage se getCurrentLoggedInUserInfo can fetch user info 
                localStorage[Config.getValue('domainPrefix') + '.auth.lockchain'] = this.props.userToken;
                localStorage[Config.getValue('domainPrefix') + '.auth.username'] = this.props.userName;
                getCurrentLoggedInUserInfo().then(info => {
                    let userInfo = {
                        firstName: info.firstName,
                        lastName: info.lastName,
                        phoneNumber: info.phoneNumber,
                        preferredLanguage: info.preferredLanguage,
                        preferredCurrency: info.preferredCurrency != null ? info.preferredCurrency.id : null,
                        gender: info.gender,
                        country: info.country != null ? info.country.id : null,
                        city: info.city != null ? info.city.id : null,
                        birthday: info.birthday,
                        locAddress: localStorage.getItem('walletAddress'),
                        jsonFile:  localStorage.getItem('walletJson')
                    };

                    updateUserInfo(userInfo, token).then((res) => {
                        if (res.success) {
                            NotificationManager.success(PROFILE_SUCCESSFULLY_UPDATED);
                            localStorage[Config.getValue('domainPrefix') + '.auth.lockchain'] = this.props.userToken;
                            localStorage[Config.getValue('domainPrefix') + '.auth.username'] = this.props.userName;
                        } else {
                            localStorage.removeItem(Config.getValue('domainPrefix') + '.auth.lockchain');
                            localStorage.removeItem(Config.getValue('domainPrefix') + '.auth.username');
                            NotificationManager.error(PROFILE_UPDATE_ERROR);
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

    handleEnterKeyPress(event) {
        if(event.key === 'Enter'){
            this.handleSubmit();
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(CONFIRM_WALLET, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Confirm Wallet Information</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(CONFIRM_WALLET, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Enter your wallet mnemonic words:</p>
                        <form onSubmit={(e) => { e.preventDefault(); this.handleSubmit(); }}>
                            <textarea name="mnemonic" className="form-control" onChange={this.onChange} value={this.state.mnemonic} autoFocus onKeyPress={this.handleEnterKeyPress}/>
                            <br/>
                            <button type="submit" className="btn btn-primary">Confirm Wallet</button>
                        </form>
                        <button className="btn btn-primary" onClick={this.onWordsForget}>Sorry, I did not save them</button>
                    </Modal.Body>
                </Modal>
                
                <ReCAPTCHA
                    ref={el => this.captcha = el}
                    size="invisible"
                    sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                    onChange={this.updateUser}
                />
            </div>
        );
    }
}

CreateWalletModal.propTypes = {
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    register: PropTypes.func,
    setUserInfo: PropTypes.func,
    userName: PropTypes.string,
    userToken: PropTypes.string,
    isActive: PropTypes.bool
};