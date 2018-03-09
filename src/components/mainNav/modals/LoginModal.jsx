import { NotificationContainer, NotificationManager } from 'react-notifications';

import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { postNewPassword } from '../../../requester.js';

const modal = {
    current: 'showLoginModal',
    next: 'showSignUpModal',
};

export default class LoginModal extends React.Component {

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={() => this.props.closeModal(modal.current)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Login</h1>
                        <button type="button" className="close" onClick={() => this.props.closeModal(modal.current)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => { e.preventDefault(); this.captcha.execute(); }}>
                            <div className="form-group">
                                <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="mail" />
                                <input type="email" name="loginEmail" value={this.props.loginEmail} onChange={this.props.onChange} className="form-control" placeholder="Email address" />
                            </div>
                            <div className="form-group">
                                <img src={Config.getValue('basePath') + 'images/login-pass.png'} alt="pass" />
                                <input type="password" name="loginPassword" value={this.props.loginPassword} onChange={this.props.onChange} className="form-control" placeholder="Password" />
                            </div>
                            <div className="checkbox login-checkbox pull-left">
                                <label><input type="checkbox" value="" id="login-remember" />Remember me</label>
                            </div>

                            <ReCAPTCHA
                                ref={el => this.captcha = el}
                                size="invisible"
                                sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                                onChange={token => { this.props.login(token); this.captcha.reset(); }}
                            />

                            <button type="submit" className="btn btn-primary">Login</button>
                            <div className="clearfix"></div>
                        </form>

                        <hr />
                        <div className="login-sign">Don’t have an account? <a onClick={(e) => { this.props.closeModal(modal.current); this.openModal(modal.next); }}>Sign up</a>. Forgot your password? <a onClick={(e) => { this.closeLogIn(e); this.openModal('sendRecoveryEmail', e); }}>Recover</a></div>
                    </Modal.Body>
                </Modal>
                <NotificationContainer />
            </div>
        );
    }
}

LoginModal.propTypes = {
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    isActive: PropTypes.bool
};