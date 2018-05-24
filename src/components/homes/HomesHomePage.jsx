import { getListings, getCountries } from '../../requester';

import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import PopularListingsCarousel from '../common/listing/PopularListingsCarousel';
import PropTypes from 'prop-types';
import HomesHeroComponent from './HomesHeroComponent';

class HomesHomePage extends React.Component {
  constructor(props) {
    super(props);

    let startDate = moment();
    let endDate = moment().add(1, 'day');

    this.state = {
      countryId: '',
      countries: undefined,
      startDate: startDate,
      endDate: endDate,
      guests: '2',
      listings: undefined
    };

    this.onChange = this.onChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDatePick = this.handleDatePick.bind(this);
  }

  componentDidMount() {
    getListings().then(data => {
      this.setState({ listings: data.content });
    });

    getCountries(true).then(data => {
      this.setState({ countries: data.content });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSearch(e) {
    e.preventDefault();

    let queryString = '?';

    queryString += 'countryId=' + this.state.countryId;
    queryString += '&startDate=' + this.state.startDate.format('DD/MM/YYYY');
    queryString += '&endDate=' + this.state.endDate.format('DD/MM/YYYY');
    queryString += '&guests=' + this.state.guests;

    this.props.history.push('/homes/listings' + queryString);
  }

  handleDatePick(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
  }

  render() {
    return (
      <div>
        <HomesHeroComponent
          countryId={this.state.countryId}
          countries={this.state.countries}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          guests={this.state.guests}
          onChange={this.onChange}
          handleSearch={this.handleSearch}
          handleDatePick={this.handleDatePick}
        />

        <section id="popular-hotels-box">
          <h2>Popular Properties</h2>
          {!this.state.listings ? <div className="loader"></div> :
            this.state.listings && this.state.listings.length > 1 &&
            <PopularListingsCarousel
              listings={this.state.listings}
              listingsType="homes"
            />
          }
          <div className="clearfix"></div>
        </section>
      </div>
    );
  }
}

HomesHomePage.propTypes = {
  // router props
  history: PropTypes.object
};

export default withRouter(HomesHomePage);
