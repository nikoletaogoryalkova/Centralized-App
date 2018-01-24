import { NotificationContainer, NotificationManager } from 'react-notifications';
import { changeListingStatus, getAllUnpublishedListings } from '../../../requester';

import Footer from '../../Footer';
import { Link } from 'react-router-dom';
import ListingRow from './ListingRow';
import Pagination from 'rc-pagination';
import ProfileHeader from '../ProfileHeader';
import React from 'react';

export default class AllUnpublishedListings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listings: [],
            loading: true,
            totalElements: 0,
            currentPage: 1
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.updateListingStatus = this.updateListingStatus.bind(this);
    }

    componentDidMount() {
        getAllUnpublishedListings('?page=0').then((data) => {
            this.setState({ listings: data.content, loading: false, totalElements: data.totalElements });
        });
    }

    onPageChange(page) {
        this.setState({
            currentPage: page,
            loading: true
        });

        getAllUnpublishedListings(`?page=${page - 1}`).then(data => {
            this.setState({
                listings: data.content,
                totalElements: data.totalElements,
                loading: false
            });
        });
    }

    updateListingStatus(id) {
        let publishObj = {
            listingId: id,
            state: 'active'
        };

        changeListingStatus(publishObj).then((res) => {
            if (res.success) {
                NotificationManager.success('Successfully changed status to active', 'Listings Operations');
                let allListings = this.state.listings;
                this.setState({ listings: allListings.filter(x => x.id != id) });
            }
            else {
                NotificationManager.error('Something went wrong', 'Listings Operations');
            }
        });
    }

    render() {
        if (this.state.loading) {
            return <div className="loader"></div>;
        }

        const textItemRender = (current, type, element) => {
            if (type === 'prev') {
                return <div className="rc-prev">&lsaquo;</div>;
            }
            if (type === 'next') {
                return <div className="rc-next">&rsaquo;</div>;
            }
            return element;
        };

        return (
            <div className="my-reservations">
                <NotificationContainer />
                <ProfileHeader />
                <section id="profile-my-reservations">
                    <div className="container">
                        <ul className="tab-navigation">
                            <li><Link to="/admin/listings/published"><h2>Published</h2></Link></li>
                            <li className="active"><Link to="/admin/listings/unpublished"><h2>Unpublished</h2></Link></li>
                        </ul>
                        <hr />
                        {this.state.listings.length === 0 ? <div className="text-center p20"><h3>There isn't any unpublished listings</h3></div> :
                            <div className="container">
                                <div className="table-header bold">
                                    <div className="col-md-2">
                                    </div>
                                    <div className="col-md-5">
                                        <span>Name</span>
                                    </div>
                                    <div className="col-md-2">
                                        <span>Price</span>
                                    </div>
                                    <div className="col-md-3">
                                        <span>Actions</span>
                                    </div>
                                </div>
                                {this.state.listings.map((item, i) => {
                                    return <ListingRow action="Publish" updateListingStatus={this.updateListingStatus} listing={item} key={i} />;
                                })}

                                <div className="pagination-box">
                                    {this.state.totalReservations !== 0 && <Pagination itemRender={textItemRender} className="pagination" defaultPageSize={20} showTitle={false} onChange={this.onPageChange} current={this.state.currentPage} total={this.state.totalElements} />}
                                </div>

                            </div>}
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}