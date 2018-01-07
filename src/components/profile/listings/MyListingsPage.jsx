import React from 'react';
import { Link } from 'react-router-dom';

import MyListingsActiveItem from './MyListingsActiveItem';
import ProfileHeader from '../ProfileHeader';
import Pagination from 'rc-pagination';
import Footer from '../../Footer';

import { getMyListings } from '../../../requester'

import { NotificationContainer } from 'react-notifications';

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
    }

    filterListings(id) {
        let newListings = this.state.listings.filter(l => l.id !== id);
        this.setState({listings: newListings});
    }

    componentDidMount() {
        getMyListings('?page=0').then((data) => {
            this.setState({ listings: data.content, totalListings: data.totalElements, loading: false });
        })
    }

    onPageChange = (page) => {
        this.setState({
            currentPage: page,
            loadingListing: true
        })

        getMyListings(`?page=${page - 1}`).then(data => {
            this.setState({
                listings: data.content,
                totalListings: data.totalElements,
                loadingListing: false
            })
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
            return <div className="loader"></div>
        }

        return (
            <div>
                <ProfileHeader />
                <section id="profile-mylistings">
                    <div className="container">
                        <h2>Active ({this.state.totalListings})</h2>
                        <hr className="profile-line" />
                        {this.state.listings.map((item, i) => {
                            return <MyListingsActiveItem filterListings={this.filterListings} listing={item} key={i} />
                        })}

                        <div className="pagination-box">
                            {this.state.totalListings !== 0 && <Pagination itemRender={textItemRender} className="pagination" defaultPageSize={20} showTitle={false} onChange={this.onPageChange} current={this.state.currentPage} total={this.state.totalElements} />}
                        </div>

                        <div className="my-listings">
                            <Link className="btn btn-primary create-listing" to="/profile/listings/create">Add new listing</Link>
                        </div>
                    </div>

                </section>
                <Footer />
                <NotificationContainer />
            </div>
        );
    }
}