import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

export default function ChildrenModal(props) {

  const areChildrenAgesValid = () => {
    const rooms = props.rooms;
    for (let i = 0; i < rooms.length; i++) {
      const children = rooms[i].children;
      for (let j = 0; j < children.length; j++) {
        const age = Number(children[i].age);
        if (age < 1 || age > 17) {
          return false;
        }
      }
    }

    return true;
  };

  return (
    <div>
      <Modal show={props.isActive} onHide={e => props.closeModal(props.modalId, e)} className="modal fade myModal">
        <Modal.Header>
          <h1>Children</h1>
          <button type="button" className="close" onClick={(e) => props.closeModal(props.modalId, e)}>&times;</button>
        </Modal.Header>
        <Modal.Body>
          {props.rooms && props.rooms.map((room, roomIndex) => {
            return (
              <div key={roomIndex}>
                <div className="children-modal">
                  <div className="row">
                    <div className="col col-md-4">
                      <span className="children-select-label">Room {roomIndex + 1}</span>
                    </div>
                    <div className="col col-md-8">
                      <select name={`children${roomIndex}`} className="form-control children-select" value={props.rooms[roomIndex].children.length} onChange={(e) => props.handleChildrenChange(e, roomIndex)}>
                        <option value="0">No children</option>
                        <option value="1">1 child</option>
                        <option value="2">2 children</option>
                        <option value="3">3 children</option>
                        <option value="4">4 children</option>
                        <option value="5">5 children</option>
                        <option value="6">6 children</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    {room.children.map((child, childIndex) => {
                      return (
                        <div key={childIndex} className="col col-md-2">
                          <select name={`children${roomIndex}age`} className="form-control children-age-select" value={props.rooms[roomIndex].children[childIndex].age} onChange={(e) => props.handleChildAgeChange(e, roomIndex, childIndex)}>
                            <option value="" selected disabled required>Age</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr className="room-break" />
              </div>
            );
          })}
          {areChildrenAgesValid() ?
            <button className="btn btn-primary" onClick={props.handleSubmit}>Search</button> :
            <button className="btn btn-primary" disabled>Search</button>
          }
        </Modal.Body>
      </Modal>
    </div>
  );
}

ChildrenModal.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  isActive: PropTypes.bool
};