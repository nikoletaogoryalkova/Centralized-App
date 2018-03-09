import { NotificationContainer } from 'react-notifications';

import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { modals } from '../../../constants/modals.js';

export default class LoginModal extends React.Component {

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={() => this.props.closeModal(modals.REGISTER)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Sign up</h1>
                        <button type="button" className="close" onClick={() => this.props.closeModal(modals.REGISTER)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => { e.preventDefault(); this.captcha.execute(); }}>
                            <div className="form-group">
                                <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
                                <input type="email" name="signUpEmail" value={this.props.signUpEmail} onChange={this.props.onChange} className="form-control" placeholder="Email address" />
                            </div>
                            <div className="form-group">
                                <img src={Config.getValue('basePath') + 'images/login-user.png'} alt="user" />
                                <input type="text" required="required" name="signUpFirstName" value={this.props.signUpFirstName} onChange={this.props.onChange} className="form-control" placeholder="First Name" />
                            </div>
                            <div className="form-group">
                                <img src={Config.getValue('basePath') + 'images/login-user.png'} alt="user" />
                                <input type="text" required="required" name="signUpLastName" value={this.props.signUpLastName} onChange={this.props.onChange} className="form-control" placeholder="Last Name" />
                            </div>
                            <div className="form-group">
                                <img src={Config.getValue('basePath') + 'images/login-pass.png'} alt="pass" />
                                <input type="password" required="required" name="signUpPassword" value={this.props.signUpPassword} onChange={this.props.onChange} className="form-control" placeholder="Password" />
                            </div>

                            <ReCAPTCHA
                                ref={el => this.captcha = el}
                                size="invisible"
                                sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                                onChange={token => { this.register(token); this.captcha.reset(); }}
                            />
                            <div className="clearfix"></div>
                        </form>
                        <button className="btn btn-primary" onClick={this.props.openWalletInfo}>Proceed</button>
                        <div className="signup-rights">
                            <p>By creating an account, you are agreeing with our Terms and Conditions and Privacy Statement.</p>
                        </div>
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