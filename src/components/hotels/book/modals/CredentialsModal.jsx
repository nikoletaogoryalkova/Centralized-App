import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

export default class CredentialsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            walletPassword: '',
            jsonFile: '',
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(this.props.modalId, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Enter your wallet password</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(this.props.modalId, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="password" placeholder="Wallet Password" name={'walletPassword'} className="form-control"  value={this.state.walletPassword} onChange={this.onChange} />
                        <button className="btn btn-primary" onClick={() => this.props.handleSubmit(this.state.walletPassword)}>Confirm</button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

CredentialsModal.propTypes = {
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    isActive: PropTypes.bool
};