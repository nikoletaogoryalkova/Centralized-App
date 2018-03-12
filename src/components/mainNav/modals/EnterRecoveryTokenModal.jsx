import { NotificationContainer, NotificationManager } from 'react-notifications';

import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { sendRecoveryToken } from '../../../requester.js';
import { modals } from '../../../constants/constants.js';

export default class EnterRecoveryTokenModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        sendRecoveryToken(this.props.recoveryToken).then((res) => {
            if (res.success) {
                this.props.closeModal(modals.ENTER_RECOVERY_TOKEN);
                this.props.openModal(modals.CHANGE_PASSWORD);
            }
            else {
                NotificationManager.warning('Invalid token', 'Token');
            }
        });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(modals.ENTER_RECOVERY_TOKEN, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Recover your password (2)</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(modals.ENTER_RECOVERY_TOKEN, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        <p>A confirmation email has been sent. To enter a new password open the link from your email or enter the token in the field below. </p>
                        {this.state.error !== null ? <div className="error">{this.state.error}</div> : ''}
                        <form onSubmit={(e) => { e.preventDefault(); this.onSubmit(); }}>
                            <div className="form-group">
                                <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
                                <input type="text" name="recoveryToken" value={this.props.recoveryToken} onChange={this.props.onChange} className="form-control" placeholder="Token" />
                            </div>

                            <button type="submit" className="btn btn-primary">Proceed to Password Change</button>
                            <div className="clearfix"></div>
                        </form>
                    </Modal.Body>
                </Modal>
                <NotificationContainer />
            </div>
        );
    }
}

EnterRecoveryTokenModal.propTypes = {
    recoveryToken: PropTypes.string,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    isActive: PropTypes.bool,
    onChange: PropTypes.func
};