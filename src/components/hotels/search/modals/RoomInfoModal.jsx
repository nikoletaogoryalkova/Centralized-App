import { NotificationManager } from 'react-notifications';

import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

export default class RoomInfoModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mnemonic: '',
            json: '',
        };

        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    prev() {
        this.props.closeModal(`roomInfo${this.props.roomId}`);
        this.props.openModal(`roomInfo${this.props.roomId - 1}`);
    }

    next() {
        this.props.closeModal(`roomInfo${this.props.roomId}`);
        this.props.openModal(`roomInfo${this.props.roomId + 1}`);
    }

    handleSubmit() {
        this.props.closeModal(`roomInfo${this.props.roomId}`);
        this.props.handleSearch();
    }

    render() {
        if (!this.props.room) {
            return null;
        }

        return (
            <div>
                <Modal show={this.props.isActive} onHide={e => this.props.closeModal(this.props.modalId, e)} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Room {this.props.roomId + 1}</h1>
                        <button type="button" className="close" onClick={(e) => this.props.closeModal(this.props.modalId, e)}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        <select name={`adults${this.props.roomId}`} className="form-control"  value={this.props.room.adults} onChange={(e) => this.props.handleAdultsChange(e, this.props.roomId)}>
                            <option value="1" disabled selected>Adults</option>
                            <option value="1">Adults: 1</option>
                            <option value="2">Adults: 2</option>
                            <option value="3">Adults: 3</option>
                            <option value="4">Adults: 4</option>
                            <option value="5">Adults: 5</option>
                        </select>
                        <br/>

                        <select name={`children${this.props.roomId}`} className="form-control"  value={this.props.room.childrenCount} onChange={(e) => this.props.handleChildrenChange(e, this.props.roomId)}>
                            <option value="0" disabled selected>Children</option>
                            <option value="0">Children: 0</option>
                            <option value="1">Children: 1</option>
                            <option value="2">Children: 2</option>
                            <option value="3">Children: 3</option>
                            <option value="4">Children: 4</option>
                            <option value="5">Children: 5</option>
                        </select>
                        <br/>

                        {(this.props.room.children.length > 0) &&
                            this.props.room.children.map((age, childIndex) => {
                                return (
                                    <div key={childIndex} >
                                        <select name={`child${childIndex}`} className="form-control"  value={this.props.room.children[childIndex]} onChange={(e) => this.props.handleChildAgeChange(e, this.props.roomId, childIndex)}>
                                            <option value="" disabled selected>Child {childIndex + 1} Age</option>
                                            <option value="1">Child {childIndex + 1} age: 1</option>
                                            <option value="2">Child {childIndex + 1} age: 2</option>
                                            <option value="3">Child {childIndex + 1} age: 3</option>
                                            <option value="4">Child {childIndex + 1} age: 4</option>
                                            <option value="5">Child {childIndex + 1} age: 5</option>
                                        </select>
                                        <br/>
                                    </div>
                                );
                            })
                        }
                        {this.props.roomId > 0 && <button className="btn btn-primary" onClick={this.prev}>Prev</button>}
                        {this.props.roomId < this.props.rooms.length - 1 ? 
                            <button className="btn btn-primary" onClick={this.next}>Next</button> : 
                            <button className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Search</button>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

RoomInfoModal.propTypes = {
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    isActive: PropTypes.bool
};