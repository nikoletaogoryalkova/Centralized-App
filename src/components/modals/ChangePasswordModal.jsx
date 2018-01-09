import React from 'react';

import { Modal } from 'react-bootstrap';

import { Config } from '../../config';
import { postNewPassword } from '../../requester.js';

const modal = {
    current: 'changePassword',
    next: '',
}

export default class ChangePasswordModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            password: '',
            error: null,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit() {
        if (this.state.password !== this.state.confirmPassword) {
            alert("failiure");
            return;
        }

        
        const postObj = {
            token: this.props.recoveryToken,
            password: this.state.password,
        }
        console.log(postObj);

        postNewPassword(postObj).then((res) => {
            if (res.success) {
                this.props.closeModal(modal.current);
                alert("success");
            }
            else {
                alert("failure");
            }
        });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(modal.current, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Recover your password (3)</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(modal.current, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.error !== null ? <div className="error">{this.state.error}</div> : ''}
                        <form onSubmit={(e) => { e.preventDefault(); this.onSubmit();
                            {/* this.captcha.execute()  */}
                            }}>
                            <div className="form-group">
                                <img src={Config.getValue("basePath") + "images/login-mail.png"} alt="email" />
                                <input type="password" name="password" value={this.state.password} onChange={this.onChange} className="form-control" placeholder="New password" />
                            </div>

                            <div className="form-group">
                                <img src={Config.getValue("basePath") + "images/login-mail.png"} alt="email" />
                                <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange} className="form-control" placeholder="Confirm password" />
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