import { cancelTrip, getMyTrips } from '../../../requester';
import { Config } from '../../../config';
import CancellationModal from '../../common/modals/CancellationModal';
import Pagination from '../../common/pagination/Pagination';
import { Link } from 'react-router-dom';
import HomeTripsTable from './HomeTripsTable';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';

import { withRouter } from 'react-router-dom';

class HomeTripsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: [],
      loading: true,
      totalTrips: 0,
      currentPage: 1,
      currentTripId: null,
      selectedTripId: 0,
      cancellationText: '',
      showCancelTripModal: false,
    };

    this.onPageChange = this.onPageChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onTripCancel = this.onTripCancel.bind(this);
    this.onTripSelect = this.onTripSelect.bind(this);
  }

  componentDidMount() {
    let search = this.props.location.search.split('?');
    let id = null;
    if (search.length > 1) {
      let pairs = search[1].split('&');
      for (let pair of pairs) {
        let tokens = pair.split('=');
        if (tokens[0] === 'id') {
          id = Number(tokens[1]);
          break;
        }
      }
    }
    getMyTrips('?page=0').then((data) => {
      this.setState({ trips: data.content, totalTrips: data.totalElements, loading: false, currentTripId: id });
      if (id) {
        NotificationManager.success('Booking Request Sent Successfully, your host will get back to you with additional questions.', 'Reservation Operations');
      }
    });
  }

  onTripCancel() {
    this.cancelCaptcha.execute();
  }

  cancelTrip(captchaToken) {
    const id = this.state.selectedTripId;
    const message = this.state.cancellationText;
    let messageObj = { message: message };
    cancelTrip(id, messageObj, captchaToken)
      .then(response => {
        if (response.success) {
          this.componentDidMount();
          NotificationManager.success(response.message, 'Reservation Operations');
        } else {
          NotificationManager.error(response.message, 'Reservation Operations');
        }
      });
  }

  setTripIsAccepted(tripId, isAccepted) {
    const trips = this.state.trips.map(trip => {
      if (trip.id === tripId) {
        trip.accepted = isAccepted;
      }
      return trip;
    });
    this.setState({ trips: trips });
  }

  onPageChange(page) {
    window.scrollTo(0, 0);

    this.setState({
      currentPage: page,
      loading: true
    });

    getMyTrips(`?page=${page - 1}`).then(data => {
      this.setState({
        trips: data.content,
        totalTrips: data.totalElements,
        loading: false
      });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  openModal(name) {
    this.setState({ [name]: true });
  }

  closeModal(name) {
    this.setState({ [name]: false });
  }

  onTripSelect(id) {
    this.setState({ selectedTripId: id });
  }

  render() {
    if (this.state.loading) {
      return <div className="loader"></div>;
    }

    return (
      <div className="my-reservations">
        <ReCAPTCHA
          ref={el => this.cancelCaptcha = el}
          size="invisible"
          sitekey={Config.getValue('recaptchaKey')}
          onChange={token => { this.cancelTrip(token); this.cancelCaptcha.reset(); }} />

        <CancellationModal
          name={'showCancelTripModal'}
          value={this.state.cancellationText}
          title={'Cancel Trip'}
          text={'Tell your host why do you want to cancel your trip.'}
          onChange={this.onChange}
          isActive={this.state.showCancelTripModal}
          onClose={this.closeModal}
          onSubmit={this.onTripCancel} />

        <section id="profile-my-reservations">
          <div>
            <h2>Upcoming Trips ({this.state.totalTrips})</h2>
            <hr />
            <HomeTripsTable
              trips={this.state.trips}
              currentTripId={this.state.currentTripId}
              onTripSelect={this.onTripSelect}
              onTripCancel={() => this.openModal('showCancelTripModal')} />

            <Pagination
              loading={this.state.totalListings === 0}
              onPageChange={this.onPageChange}
              currentPage={this.state.currentPage}
              totalElements={this.state.totalTrips}
            />

            <div className="my-listings">
              <Link className="btn btn-primary create-listing" to="#">Print this page</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

HomeTripsPage.propTypes = {
  location: PropTypes.object
};

export default withRouter(HomeTripsPage);