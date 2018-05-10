import { deleeteInProgressListing, getMyListings, getMyListingsInProgress } from '../../../requester';

import Pagination from '../../common/pagination/Pagination';
import { Link } from 'react-router-dom';
import MyListingsActiveItem from './MyListingsActiveItem';
import MyListingsInProgressItem from './MyListingsInProgressItem';
import React from 'react';
import filterListings from '../../../actions/filterListings';

export default class MyListingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      totalListings: 0,
      loading: true,
      currentPage: 1,
      listingsInProgress: null,
      totalListingsInProgress: 0
    };

    this.filterListings = filterListings.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.deleteInProgressListing = this.deleteInProgressListing.bind(this);
  }

  componentDidMount() {
    getMyListings('?page=0').then((data) => {
      this.setState({ listings: data.content, totalListings: data.totalElements, loading: false });
    });

    getMyListingsInProgress('?page=0').then((data) => {
      this.setState({ listingsInProgress: data.content, totalListingsInProgress: data.totalElements });
    });
  }

  deleteInProgressListing(id) {
    deleeteInProgressListing(id).then((data) => {
      if (data.success) {
        let listingsInProgress = this.state.listingsInProgress;
        listingsInProgress = listingsInProgress.filter(x => x.id !== id);
        this.setState({ listingsInProgress: listingsInProgress, totalListingsInProgress: this.state.totalListingsInProgress - 1 });
      }
    });
  }

  onPageChange(page) {
    this.setState({
      currentPage: page,
      loading: true
    });
    window.scrollTo(0, 0);

    getMyListings(`?page=${page - 1}`).then(data => {
      this.setState({
        listings: data.content,
        totalListings: data.totalElements,
        loading: false
      });
    });
  }


  render() {
    if (this.state.loading && this.state.listingsInProgress !== null) {
      return <div className="loader"></div>;
    }

    return (
      <div>
        <section id="profile-mylistings">
          <div className="container">
            <h2>In Progress ({this.state.totalListingsInProgress})</h2>
            <hr className="profile-line" />
            {this.state.listingsInProgress && this.state.listingsInProgress.map((item, i) => {
              return <MyListingsInProgressItem deleteInProgressListing={this.deleteInProgressListing} id={item.id} step={item.step} filterListings={this.filterListings} listing={JSON.parse(item.data)} key={i} />;
            })}
          </div>

          <div className="container">
            <h2>Active ({this.state.totalListings})</h2>
            <hr className="profile-line" />
            {this.state.listings.map((item, i) => {
              return <MyListingsActiveItem state={item.state} filterListings={this.filterListings} listing={item} key={i} />;
            })}

            <Pagination
              loading={this.state.totalListings === 0}
              onPageChange={this.onPageChange}
              currentPage={this.state.currentPage}
              totalElements={this.state.totalListings}
            />

            <div className="my-listings">
              <Link className="btn btn-primary create-listing" to="/profile/listings/create/landing">Add new listing</Link>
            </div>
          </div>

        </section>
      </div>
    );
  }
}