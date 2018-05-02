import { Config } from '../../../config';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { withRouter } from 'react-router-dom';

const modal = {
  current: 'showContactHostModal',
};

class ContactHostModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <Modal show={this.props.isActive} onHide={e => this.props.closeModal(modal.current, e)} className="modal fade myModal">
          <Modal.Header>
            <h1>Contact Host</h1>
            <button type="button" className="close" onClick={(e) => this.props.closeModal(modal.current, e)}>&times;</button>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => { e.preventDefault(); this.captcha.execute(); }}>
              <div className="form-group">
                <textarea rows="4" name="message" value={this.state.message} onChange={this.onChange} className="form-control text-area"></textarea>
              </div>


              <ReCAPTCHA
                ref={el => this.captcha = el}
                size="invisible"
                sitekey={Config.getValue('recaptchaKey')}
                onChange={token => { this.props.sendMessageToHost(this.props.id, this.state.message, token); }}
              />

              <button type="submit" className="btn btn-primary">Send message</button>
              <div className="clearfix"></div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ContactHostModal);

ContactHostModal.propTypes = {
  isActive: PropTypes.bool,
  closeModal: PropTypes.func,
  sendMessageToHost: PropTypes.func,
  match: PropTypes.object,
  id: PropTypes.string
};