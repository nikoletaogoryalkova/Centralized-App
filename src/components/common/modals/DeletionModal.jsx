import { Config } from '../../../config';
import React from 'react';
import {Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {deleteListing} from '../../../requester';
import ReCAPTCHA from 'react-google-recaptcha';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default class DeletionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sending: false
        };
        this.deleteSelected = this.deleteSelected.bind(this);
    }

    deleteSelected(token) {
        if (!this.props.isDeleting) {
            return;
        }

        this.setState({sending: true});

        deleteListing(this.props.deletingId, token)
            .then(res => {
                if (res.success) {
                    this.props.filterListings(this.props.deletingId);
                    NotificationManager.success('Property deleted successfully', 'Deleting Listing');
                } else {
                    NotificationManager.error('Cannot delete this property. It might have reservations or other irrevocable actions.', 'Deleting Listing');
                }
                this.setState({sending: false});
                this.props.onHide();
            });
    }

    render() {
        return (
            <div>
                <NotificationContainer />
                <Modal show={this.props.isDeleting} onHide={this.props.onHide} className="modal fade myModal">
                    <Modal.Header>
                        <button type="button" className="close" onClick={this.props.onHide}>&times;</button>
                        <h2>Delete <b>{this.props.deletingName.substring(0, 20)}</b>?</h2>
                        {this.state.sending &&
                        <div className="loader"></div>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            this.captcha.execute();
                        }}>

                            <ReCAPTCHA
                                ref={el => this.captcha = el}
                                size="invisible"
                                sitekey={Config.getValue('recaptchaKey')}
                                onChange={token => this.deleteSelected(token)}
                            />

                            <button type="submit" className="btn btn-danger">Yes, delete it!</button>
                        </form>
                        <button onClick={this.props.onHide} className="btn btn-info">No, go back!</button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

DeletionModal.propTypes = {
    isDeleting: PropTypes.bool,
    deletingId: PropTypes.number,
    deletingName: PropTypes.string,
    onHide: PropTypes.func,
    onOpen: PropTypes.func,
    filterListings: PropTypes.func,
};