import React from 'react';

import { Modal, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { Config } from '../../config';
import { postRecoveryEmail } from '../../requester.js';

export default class SendRecoveryEmailModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            recoveryEmail: '',
            error: null,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit() {
        postRecoveryEmail({email: this.state.recoveryEmail}).then((res) => {
            if (res.success) {
                console.log("success");
            }
            else {
                console.log("failure");
            }
        });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(e, "sendRecoveryEmail")} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Recover your password</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(e, "sendRecoveryEmail")}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.error !== null ? <div className="error">{this.state.error}</div> : ''}
                        <form onSubmit={(e) => { e.preventDefault(); 
                            {/* this.captcha.execute()  */}
                            }}>
                            <div className="form-group">
                                <img src={Config.getValue("basePath") + "images/login-mail.png"} alt="email" />
                                <input type="email" name="recoveryEmail" value={this.state.recoveryEmail} onChange={this.onChange} className="form-control" placeholder="Email address" />
                            </div>

                            <button type="submit" onClick={this.onSubmit} className="btn btn-primary">Send email</button>
                            <div className="clearfix"></div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}