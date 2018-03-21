import { NotificationContainer, NotificationManager } from 'react-notifications';

import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { postNewPassword } from '../../../requester.js';
import { LOGIN, CHANGE_PASSWORD } from '../../../constants/modals.js';
import { PASSWORDS_DONT_MATCH, INVALID_PASSWORD } from '../../../constants/warningMessages';
import { PASSWORD_SUCCESSFULLY_CHANGED } from '../../../constants/successMessages';
import { NOT_FOUND } from '../../../constants/errorMessages';

export default class ChangePasswordModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            error: null,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.submitPassword.bind(this);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitPassword(captchaToken) {
        if (this.state.password !== this.state.confirmPassword) {
            NotificationManager.warning(PASSWORDS_DONT_MATCH);
            this.captcha.reset();
            return;
        }

        if (this.state.password.length < 6) {
            NotificationManager.warning(INVALID_PASSWORD);
            this.captcha.reset();
            return;
        }

        const postObj = {
            token: this.props.recoveryToken,
            password: this.state.password,
        };

        postNewPassword(postObj, captchaToken).then((res) => {
            if (res.success) {
                this.props.closeModal(CHANGE_PASSWORD);
                this.props.openModal(LOGIN);
                NotificationManager.success(PASSWORD_SUCCESSFULLY_CHANGED);
            }
            else {
                NotificationManager.error(NOT_FOUND);
                this.captcha.reset();
            }
        });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(CHANGE_PASSWORD, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Recover your password (3)</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(CHANGE_PASSWORD, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.error !== null ? <div className="error">{this.state.error}</div> : ''}
                        <form onSubmit={(e) => { e.preventDefault(); this.captcha.execute(); }}>
                            <div className="form-group">
                                <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
                                <input type="password" name="password" value={this.state.password} onChange={this.onChange} className="form-control" placeholder="New password" />
                            </div>

                            <div className="form-group">
                                <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
                                <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange} className="form-control" placeholder="Confirm password" />
                            </div>

                            <ReCAPTCHA
                                ref={el => this.captcha = el}
                                size="invisible"
                                sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                                onChange={token => this.submitPassword(token)}
                            />

                            <button type="submit" className="btn btn-primary">Save Password</button>
                            <div className="clearfix"></div>
                        </form>
                    </Modal.Body>
                </Modal>
                <NotificationContainer />
            </div>
        );
    }
}

ChangePasswordModal.propTypes = {
    recoveryToken: PropTypes.string,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    isActive: PropTypes.bool
};