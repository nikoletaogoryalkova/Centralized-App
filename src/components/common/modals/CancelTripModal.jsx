import React from 'react';

import { Modal } from 'react-bootstrap';
import { NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';

export default function CancelTripModal(props) {
    let captcha;
    return (
        <div>
            <Modal show={props.isActive} onHide={e => props.onClose(props.name, e)} className="modal fade myModal">
                <Modal.Header>
                    <h1>{props.title}</h1>
                    <button type="button" className="close" onClick={(e) => props.onClose(props.name, e)}>&times;</button>
                </Modal.Header>
                <Modal.Body>
                    <p>{props.text}</p>
                    <form onSubmit={(e) => { e.preventDefault(); props.onSubmit(); props.onClose(props.name); }}>
                        <div className="form-group">
                            <textarea rows="4" name="cancellationText" value={props.value} onChange={props.onChange} className="form-control text-area"></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">Send message</button>
                        <div className="clearfix"></div>
                    </form>
                </Modal.Body>
            </Modal>
            <NotificationContainer />
        </div>
    );
}

CancelTripModal.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    isActive: PropTypes.bool,
    closeModal: PropTypes.func,
    onSubmit: PropTypes.func,
    selectedId: PropTypes.number
};