import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import HotelsSearchBar from './search/HotelsSearchBar';
import PopularDestinationsCarousel from './carousel/PopularDestinationsCarousel';
import ListingTypeNav from '../common/listingTypeNav/ListingTypeNav';
import PropTypes from 'prop-types';
import HeroComponent from './HeroComponent';

import { getTestHotels } from '../../requester';
import { connect } from 'react-redux';

import ChildrenModal from './modals/ChildrenModal';

class HotelsHomePage extends React.Component {
  constructor(props) {
    super(props);

    let startDate = moment().add(1, 'day');
    let endDate = moment().add(2, 'day');

    this.state = {
      startDate: startDate,
      endDate: endDate,
      rooms: [{ adults: 1, children: [] }],
      adults: 2,
      hasChildren: false,
      listings: undefined,
      childrenModal: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleRoomsChange = this.handleRoomsChange.bind(this);
    this.handleAdultsChange = this.handleAdultsChange.bind(this);
    this.handleChildrenChange = this.handleChildrenChange.bind(this);
    this.handleChildAgeChange = this.handleChildAgeChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDatePick = this.handleDatePick.bind(this);

    this.handleSelectRegion = this.handleSelectRegion.bind(this);
    this.handleOpenSelect = this.handleOpenSelect.bind(this);
    this.handleCloseSelect = this.handleCloseSelect.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
    this.handleToggleChildren = this.handleToggleChildren.bind(this);

    this.handleDestinationPick = this.handleDestinationPick.bind(this);
    
  }

  componentDidMount() {
    getTestHotels().then((data) => {
      this.setState({ listings: data.content });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  openModal(modal, e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({
      [modal]: true
    });
  }

  closeModal(modal, e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({
      [modal]: false
    });
  }

  handleSelectRegion(value) {
    this.setState({ region: value });
    console.log(value);
  }

  handleOpenSelect() {
    if (!this.state.region) {
      this.setState({ region: { query: '' } });
    }
  }

  handleCloseSelect() {
    if (this.state.region && this.state.region.query === '') {
      this.setState({ region: null });
    }
  }

  handleSearch(event) {
    if (event) {
      event.preventDefault();
    }

    this.distributeAdults().then(() => {
      if (this.state.hasChildren) {
        this.distributeChildren();
      } else {
        this.redirectToSearchPage(event);
      }
    });
  }

  redirectToSearchPage() {
    let queryString = '?';
    queryString += 'region=' + this.state.region.id;
    queryString += '&currency=' + this.props.paymentInfo.currency;
    queryString += '&startDate=' + this.state.startDate.format('DD/MM/YYYY');
    queryString += '&endDate=' + this.state.endDate.format('DD/MM/YYYY');
    queryString += '&rooms=' + encodeURI(JSON.stringify(this.state.rooms));
    this.props.history.push('/hotels/listings' + queryString);
  }

  async distributeAdults() {
    let adults = Number(this.state.adults);
    let rooms = this.state.rooms.slice(0);
    if (adults < rooms.length) {
      rooms = rooms.slice(0, adults);
    }

    let index = 0;
    while (adults > 0) {
      // console.log(`${adults} / ${rooms.length - index} = ${Math.ceil(adults / (rooms.length - index))}`)
      const quotient = Math.ceil(adults / (rooms.length - index));
      rooms[index].adults = quotient;
      adults -= quotient;
      index++;
    }

    await this.setState({ rooms: rooms });
  }

  distributeChildren() {
    this.openModal('childrenModal');
  }

  handleDatePick(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
  }

  handleRoomsChange(event) {
    let value = event.target.value;
    let rooms = this.state.rooms.slice();
    if (rooms.length < value) {
      while (rooms.length < value) {
        rooms.push({ adults: 1, children: [] });
      }
    } else if (rooms.length > value) {
      rooms = rooms.slice(0, value);
    }

    this.setState({ rooms: rooms });
  }

  handleAdultsChange(event, roomIndex) {
    let value = event.target.value;
    let rooms = this.state.rooms.slice();
    rooms[roomIndex].adults = value;
    this.setState({ rooms: rooms });
  }

  handleChildrenChange(event, roomIndex) {
    let value = event.target.value;
    let rooms = this.state.rooms.slice();
    let children = rooms[roomIndex].children;
    if (children.length < value) {
      while (children.length < value) {
        children.push({ age: '' });
      }
    } else if (children.length > value) {
      children = children.slice(0, value);
    }

    rooms[roomIndex].children = children;
    this.setState({ rooms: rooms });
  }

  handleChildAgeChange(event, roomIndex, childIndex) {
    const value = event.target.value;
    const rooms = this.state.rooms.slice();
    rooms[roomIndex].children[childIndex].age = value;
    this.setState({ rooms: rooms });
  }

  handleToggleChildren() {
    const hasChildren = this.state.hasChildren;
    const rooms = this.state.rooms.slice(0);
    if (hasChildren) {
      for (let i = 0; i < rooms.length; i++) {
        rooms[i].children = [];
      }
    }

    this.setState({
      hasChildren: !hasChildren,
      rooms: rooms
    });
  }

  handleDestinationPick(region) {
    this.setState({ region: region });
    document.getElementsByName('stay')[0].click();
  }

  render() {
    return (
      <div>
        <HeroComponent
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          region={this.state.region}
          adults={this.state.adults}
          hasChildren={this.state.hasChildren}
          rooms={this.state.rooms}
          guests={this.state.guests}
          onChange={this.onChange}
          handleRoomsChange={this.handleRoomsChange}
          handleSearch={this.handleSearch}
          handleDatePick={this.handleDatePick}
          handleSelectRegion={this.handleSelectRegion}
          handleToggleChildren={this.handleToggleChildren}
          handleOpenSelect={this.handleOpenSelect}
          handleCloseSelect={this.handleCloseSelect}
        />
        {/* <header id='main-nav' className="navbar home_page">
          <div className="container">
            <h1 className="home_title">Discover your next experience</h1>
            <h2 className="home_title">Browse for homes &amp; hotels worldwide</h2>
            <div className="container absolute_box">
              <ListingTypeNav />
              <HotelsSearchBar
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                region={this.state.region}
                adults={this.state.adults}
                hasChildren={this.state.hasChildren}
                rooms={this.state.rooms}
                guests={this.state.guests}
                onChange={this.onChange}
                handleRoomsChange={this.handleRoomsChange}
                handleSearch={this.handleSearch}
                handleDatePick={this.handleDatePick}
                handleSelectRegion={this.handleSelectRegion}
                handleToggleChildren={this.handleToggleChildren}
              />
            </div>
          </div>
        </header> */}

        <section id="popular-hotels-box">
          <h2>Popular Destinations</h2>
          <PopularDestinationsCarousel handleDestinationPick={this.handleDestinationPick} />
          <div className="clearfix"></div>
        </section>

        <section id="get-started">
          <div className="container">
            <div className="get-started-graphic">
              <div className="clearfix"></div>
            </div>
          </div>
        </section>

        <ChildrenModal
          modalId="childrenModal"
          rooms={this.state.rooms}
          handleChildrenChange={this.handleChildrenChange}
          handleChildAgeChange={this.handleChildAgeChange}
          isActive={this.state.childrenModal}
          closeModal={this.closeModal}
          handleSubmit={this.redirectToSearchPage}
        />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(HotelsHomePage));

function mapStateToProps(state) {
  const { paymentInfo } = state;
  return {
    paymentInfo
  };
}

HotelsHomePage.propTypes = {
  // start Router props
  location: PropTypes.object,
  history: PropTypes.object,

  // start Redux props
  dispatch: PropTypes.func,
  userInfo: PropTypes.object,
  paymentInfo: PropTypes.object,
  modalsInfo: PropTypes.object,
};