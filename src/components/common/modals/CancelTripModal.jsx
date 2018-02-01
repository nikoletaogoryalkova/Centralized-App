import React from 'react';

import { Modal } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import { NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';

export default class CancelTripModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cancellationText: '',
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(this.props.isActiveId, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>{this.props.title}</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(this.props.isActiveId, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.text}</p>
                        <form onSubmit={(e) => { e.preventDefault(); this.captcha.execute(); }}>
                            <div className="form-group">
                                <textarea rows="4" name="cancellationText" value={this.state.cancellationText} onChange={this.onChange} className="form-control text-area"></textarea>
                            </div>


                            <ReCAPTCHA
                                ref={el => this.captcha = el}
                                size="invisible"
                                sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                                onChange={token => { this.props.onSubmit(this.props.tripId, this.state.cancellationText, token); }}
                            />

                            <button type="submit" className="btn btn-primary">Send message</button>
                            <div className="clearfix"></div>
                        </form>
                    </Modal.Body>
                </Modal>
                <NotificationContainer />
            </div>
        );
    }
}

CancelTripModal.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    isActive: PropTypes.bool,
    closeModal: PropTypes.func,
    onSubmit: PropTypes.func,
    tripId: PropTypes.number
};