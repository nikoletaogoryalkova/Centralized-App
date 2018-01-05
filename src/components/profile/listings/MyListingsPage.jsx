import React from 'react';
import { Link } from 'react-router-dom';

import MyListingsActiveItem from './MyListingsActiveItem';
import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';

import { getMyListings } from '../../../requester'

import { NotificationContainer, NotificationManager } from 'react-notifications';

export default class MyListingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listings: [],
            totalListings: 0,
            loading: true
        }
    }

    componentDidMount() {
        getMyListings().then((data) => {
            this.setState({ listings: data.content, totalListings: data.totalElements, loading: false });
        })
    }

    render() {
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
                            return <MyListingsActiveItem listing={item} key={i} />
                        })}

                        <br />
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