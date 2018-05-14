import { NotificationManager } from 'react-notifications';

import { Config } from '../../../config';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { deleteListing } from '../../../requester';

import '../../../styles/css/components/profile/my-listings__progress-item.css';

export default class MyListingsInProgressItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleting: false,
      deletingId: -1,
      deletingName: '',
      sending: false,
      progress: [
        {
          number: 1,
          name: 'The Basics',
          steps: [
            { text: 'Landing', stepNumber: 1 },
            { text: 'Place type', stepNumber: 2 },
            { text: 'Accomodation', stepNumber: 3 },
            { text: 'Facilities', stepNumber: 4 },
            { text: 'Safety amenities', stepNumber: 5 },
            { text: 'Location', stepNumber: 6 }
          ],
          completed: this.props.step > 6
        },
        {
          number: 2,
          name: 'Place Description',
          steps: [
            { text: 'Description', stepNumber: 7 },
            { text: 'Photos', stepNumber: 8 }
          ],
          completed: this.props.step > 8
        },
        {
          number: 3,
          name: 'Guest Settings',
          steps: [
            { text: 'House rules', stepNumber: 9 },
            { text: 'Check-in/Check-out', stepNumber: 10 },
            { text: 'Price', stepNumber: 11 }
          ]
        }
      ]
    };

    // this.onHide = this.onHide.bind(this);
    // this.onOpen = this.onOpen.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
  }

  // onHide() {
  //   this.setState(
  //     {
  //       isDeleting: false,
  //       deletingId: -1,
  //       deletingName: ''
  //     }
  //   );
  // }

  // onOpen(id, name) {
  //   this.setState(
  //     {
  //       isDeleting: true,
  //       deletingId: id,
  //       deletingName: name
  //     }
  //   );
  // }

  deleteSelected(token) {
    if (!this.state.isDeleting) {
      return;
    }

    this.setState({ sending: true });

    deleteListing(this.state.deletingId, token)
      .then(res => {
        if (res.success) {
          this.props.filterListings(this.state.deletingId);
        } else {
          NotificationManager.error('Cannot delete this property. It might have reservations or other irrevocable actions.', 'Deleting Listing');
        }
        this.setState({ sending: false });
        // this.onHide();
      });
  }

  calculateProgressPercentage(progressNumber) {
    let resultValue = 0;
    if (progressNumber <= 6) {
      resultValue = progressNumber / 6;
    }
    else if (progressNumber <= 8) {
      resultValue = (progressNumber - 6) / 2;
    }
    else if (progressNumber <= 11) {
      resultValue = (progressNumber - 8) / 3;
    }

    return resultValue * 100;
  }

  calculateProgressImage(progressNumber) {
    let resultValue = '';
    if (progressNumber <= 6) {
      resultValue = 'vector-room.png';
    }
    else if (progressNumber <= 8) {
      resultValue = 'vector-camera.png';
    }
    else if (progressNumber <= 11) {
      resultValue = 'vector-calendar.png';
    }

    return resultValue;
  }

  render() {
    return (
      <div className="my-listings__progress-item">
        <div className="my-listings__progress-item__toggle"></div>
        <div className="my-listings__progress-item__picture">
          {this.props.listing.pictures[0] && <img src={`${Config.getValue('imgHost')}${this.props.listing.pictures[0].thumbnail}`} alt="Thumbnail" />}
        </div>
        <div className="my-listings__progress-item__content">
          <div className="my-listings__progress-item__content__row">
            <h3>
              <Link to={`/profile/listings/edit/landing/${this.props.id}?progress=${this.props.step}`}>{this.props.listing.name}</Link>
            </h3>
            <button className="close" onClick={() => this.props.deleteInProgressListing(this.props.id)}>×</button>
          </div>
          {this.state.progress.map((item, i) => {
            return (
              <div key={i} className="my-listings__progress-item__content__row ">
                <div className="progress-step">
                  <div className="step-number">
                    {item.completed
                      ? <i className="fa fa-check" aria-hidden="true"></i>
                      : <span>{item.number}</span>
                    }
                  </div>

                  <div className="progress-name">{item.name}</div>
                  <div className="progress-steps">
                    {item.steps.map(function (element) { return element.text; }).join(', ')}
                  </div>

                  {item.steps.filter(s => s.stepNumber === this.props.step).length > 0 &&
                    <div className="progress-bar-outline">
                      <div className="progress-bar" style={{ height: '3px', width: `${this.calculateProgressPercentage(this.props.step)}%`, background: '#A0C5BE' }}></div>
                    </div>
                  }

                  {item.steps.filter(s => s.stepNumber === this.props.step).length > 0 &&
                    <div className="progress-continue">
                      <Link className="btn btn-primary" to={`/profile/listings/edit/landing/${this.props.id}?progress=${this.props.step}`}>Continue</Link>
                    </div>
                  }
                </div>
              </div>
            );
          })}
        </div>
        <div className="progress-image">
          <img src={Config.getValue('basePath') + 'images/' + this.calculateProgressImage(this.props.step)} alt="progress-thumbnail" />
        </div>
        <ReCAPTCHA
          ref={el => this.captcha = el}
          size="invisible"
          sitekey={Config.getValue('recaptchaKey')}
          onChange={token => this.deleteSelected(token)}
        />
      </div>
    );
  }
}

MyListingsInProgressItem.propTypes = {
  listing: PropTypes.object,
  step: PropTypes.number,
  id: PropTypes.number,
  filterListings: PropTypes.func,
  deleteInProgressListing: PropTypes.func
};