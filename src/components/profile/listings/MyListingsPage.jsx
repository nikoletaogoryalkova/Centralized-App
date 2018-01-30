import { getMyListings, getMyListingsInProgress } from '../../../requester';

import { Link } from 'react-router-dom';
import MyListingsActiveItem from './MyListingsActiveItem';
import MyListingsInProgressItem from './MyListingsInProgressItem';
import { NotificationContainer } from 'react-notifications';
import Pagination from 'rc-pagination';
import ProfileHeader from '../ProfileHeader';
import React from 'react';

export default class MyListingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listings: [],
            totalListings: 0,
            loading: true,
            currentPage: 1
        };

        this.filterListings = this.filterListings.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    filterListings(id) {
        let newListings = this.state.listings.filter(l => l.id !== id);
        this.setState({ listings: newListings });
    }

    componentDidMount() {
        getMyListings('?page=0').then((data) => {
            this.setState({ listings: data.content, totalListings: data.totalElements, loading: false });
        });

        getMyListingsInProgress('?page=0').then((data) => {
            this.setState({ listingsInProgress: data.content, totalListingsInProgress: data.totalElements });
        });
    }

    onPageChange(page) {
        this.setState({
            currentPage: page,
            loading: true
        });

        getMyListings(`?page=${page - 1}`).then(data => {
            this.setState({
                listings: data.content,
                totalListings: data.totalElements,
                loading: false
            });
        });
    }


    render() {
        const textItemRender = (current, type, element) => {
            if (type === 'prev') {
                return <div className="rc-prev">&lsaquo;</div>;
            }
            if (type === 'next') {
                return <div className="rc-next">&rsaquo;</div>;
            }
            return element;
        };

        if (this.state.loading) {
            return <div className="loader"></div>;
        }

        return (
            <div>
                <section id="profile-mylistings">
                    <div className="container">
                        <h2>In Progress ({this.state.totalListingsInProgress})</h2>
                        <hr className="profile-line" />
                        {this.state.listingsInProgress && this.state.listingsInProgress.map((item, i) => {
                            return <MyListingsInProgressItem id={item.id} step={item.step} filterListings={this.filterListings} listing={JSON.parse(item.data)} key={i} />;
                        })}
                    </div>

                    <div className="container">
                        <h2>Active ({this.state.totalListings})</h2>
                        <hr className="profile-line" />
                        {this.state.listings.map((item, i) => {
                            return <MyListingsActiveItem state={item.state} filterListings={this.filterListings} listing={item} key={i} />;
                        })}

                        <div className="pagination-box">
                            {this.state.totalListings !== 0 && <Pagination itemRender={textItemRender} className="pagination" defaultPageSize={20} showTitle={false} onChange={this.onPageChange} current={this.state.currentPage} total={this.state.totalListings} />}
                        </div>

                        <div className="my-listings">
                            <Link className="btn btn-primary create-listing" to="/profile/listings/create/landing">Add new listing</Link>
                        </div>
                    </div>

                </section>
                <NotificationContainer />
            </div>
        );
    }
}