import React from 'react';

import { Modal } from 'react-bootstrap';

import { Config } from '../../config';
import { sendRecoveryToken } from '../../requester.js';

export default class EnterRecoveryTokenModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            recoveryToken: '',
            error: null,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit() {
        sendRecoveryToken({token: this.state.recoveryToken}).then((res) => {
            if (res.success) {
                console.log("success");
            }
            else {
                console.log("failure");
            }
        });
    }

    render() {
        const modal = "enterRecoveryToken";
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(modal, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Recover your password</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(modal, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        <p>A confirmation email... </p>
                        {this.state.error !== null ? <div className="error">{this.state.error}</div> : ''}
                        <form onSubmit={(e) => { e.preventDefault(); this.onSubmit();
                            {/* this.captcha.execute()  */}
                            }}>
                            <div className="form-group">
                                <img src={Config.getValue("basePath") + "images/login-mail.png"} alt="email" />
                                <input type="email" name="recoveryEmail" value={this.state.recoveryEmail} onChange={this.onChange} className="form-control" placeholder="Token" />
                            </div>

                            <button type="submit" className="btn btn-primary">Send email</button>
                            <div className="clearfix"></div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}