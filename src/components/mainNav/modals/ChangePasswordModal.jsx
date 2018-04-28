import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { CHANGE_PASSWORD } from '../../../constants/modals.js';

let captcha = undefined;

export default function ChangePasswordModal(props) {

    return (
        <div>
            <Modal show={props.isActive} onHide={e => props.closeModal(CHANGE_PASSWORD, e)} className="modal fade myModal">
                <Modal.Header>
                    <h1>Recover your password (3)</h1>
                    <button type="button" className="close" onClick={(e) => props.closeModal(CHANGE_PASSWORD, e)}>&times;</button>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => { e.preventDefault(); captcha.execute(); }}>
                        <div className="form-group">
                            <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
                            <input type="password" name="newPassword" value={props.newPassword} onChange={props.onChange} className="form-control" placeholder="New password" />
                        </div>

                        <div className="form-group">
                            <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
                            <input type="password" name="confirmNewPassword" value={props.confirmNewPassword} onChange={props.onChange} className="form-control" placeholder="Confirm password" />
                        </div>

                        <button type="submit" className="btn btn-primary">Save Password</button>
                        <div className="clearfix"></div>
                    </form>
                </Modal.Body>
            </Modal>
            
            <ReCAPTCHA
                ref={el => captcha = el}
                size="invisible"
                sitekey={Config.getValue('recaptchaKey')}
                onChange={(token) => { props.handlePasswordChange(token); captcha.reset(); }}
            />
        </div>
    );
}

ChangePasswordModal.propTypes = {
    newPassword: PropTypes.string,
    confirmNewPassword: PropTypes.string,
    onChange: PropTypes.func,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    handlePasswordChange: PropTypes.func,
    isActive: PropTypes.bool
};