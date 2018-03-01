import { NotificationManager } from 'react-notifications';

import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

export default class ChildrenModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(this.props.modalId, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Children</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(this.props.modalId, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.rooms && this.props.rooms.map((room, roomIndex) => {
                            return (
                                <div key={roomIndex}>
                                    <div className="row">
                                        <div className="col col-md-4">
                                            <span className="children-select-label">Room {roomIndex + 1}: </span>
                                        </div>
                                        <div className="col col-md-8">
                                            <select name={`children${roomIndex}`} className="form-control children-select" value={this.props.rooms[roomIndex].children.length} onChange={(e) => this.props.handleChildrenChange(e, roomIndex)}>
                                                <option value="0">No children</option>
                                                <option value="1">1 child</option>
                                                <option value="2">2 children</option>
                                                <option value="3">3 children</option>
                                                <option value="4">4 children</option>
                                                <option value="5">5 children</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            );
                        })}
                        <button className="btn btn-primary" onClick={this.props.handleSubmit}>Search</button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ChildrenModal.propTypes = {
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    isActive: PropTypes.bool
};