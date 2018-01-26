import { Link, withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { changeListingStatus, contactHost, getAllUnpublishedListings, getCities, getCountries } from '../../../requester';

import AllListingsFilter from './AllListingsFilter';
import ContactHostModal from '../../property/ContactHostModal';
import Footer from '../../Footer';
import ListingRow from './ListingRow';
import Pagination from 'rc-pagination';
import ProfileHeader from '../ProfileHeader';
import React from 'react';
import queryString from 'query-string';

class AllUnpublishedListings extends React.Component {
    constructor(props) {
        super(props);

        let searchMap = queryString.parse(this.props.location.search);
        this.state = {
            listings: [],
            loading: true,
            totalElements: 0,
            currentPage: searchMap.page == undefined ? 1 : searchMap.page,
            country: searchMap.countryId === undefined ? '' : searchMap.countryId,
            city: searchMap.cityId === undefined ? '' : searchMap.cityId,
            cities: [],
            countries: [],
            name: searchMap.listingName === undefined ? '' : searchMap.listingName,
            hostEmail: searchMap.host === undefined ? '' : searchMap.host,
            isShownContactHostModal: false
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.updateListingStatus = this.updateListingStatus.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.updateCities = this.updateCities.bind(this);
        this.updateCountry = this.updateCountry.bind(this);
        this.updateCities = this.updateCities.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.sendMessageToHost = this.sendMessageToHost.bind(this);
    }

    componentDidMount() {
        let searchTerm = this.buildSearchTerm();
        getAllUnpublishedListings(searchTerm).then((data) => {
            this.setState({ listings: data.content, loading: false, totalElements: data.totalElements });
        });

        if (this.state.country !== '') {
            getCities(this.state.country).then(data => {
                this.setState({ cities: data.content });
            });
        }

        getCountries().then(data => {
            this.setState({ countries: data.content });
        });

    }

    onSearch() {
        this.setState({ loading: true });

        let searchTerm = this.buildSearchTerm();

        getAllUnpublishedListings(searchTerm).then((data) => {
            this.props.history.push(`/admin/listings/unpublished${searchTerm}`);
            this.setState({ listings: data.content, loading: false, totalElements: data.totalElements });
        });
    }


    buildSearchTerm() {
        let searchTerm = `?page=${this.state.currentPage - 1}`;

        if (this.state.city != '') {
            searchTerm += `&cityId=${this.state.city}`;
        }

        if (this.state.name != '') {
            searchTerm += `&listingName=${this.state.name}`;
        }

        if (this.state.country != '') {
            searchTerm += `&countryId=${this.state.country}`;
        }

        if (this.state.hostEmail != '') {
            searchTerm += `&host=${this.state.hostEmail}`;
        }
        return searchTerm;
    }

    onSelect(name, option) {
        this.setState({
            [name]: option.value
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async updateCountry(option) {
        if (!option) {
            return;
        }

        await this.onSelect('country', option);
        this.updateCities();
    }

    updateCities() {
        getCities(this.state.country).then(data => {
            this.setState({
                city: '',
                cities: data.content,
            });
        });
    }

    async updateCity(option) {
        if (!option) {
            return;
        }

        await this.onSelect('city', option);
    }

    onPageChange(page) {
        this.setState({
            currentPage: page,
            loading: true
        });

        let searchTerm = queryString.parse(this.props.location.search);

        searchTerm.page = this.state.currentPage;

        let newSearchTerm = queryString.stringify(searchTerm);
        getAllUnpublishedListings('?' + newSearchTerm).then(data => {
            this.props.history.push('?' + newSearchTerm);
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

    sendMessageToHost(id, message, captchaToken) {
        this.setState({ loading: true });
        let contactHostObj = {
            message: message
        };

        contactHost(id, contactHostObj, captchaToken)
            .then(res => {
                this.props.history.push(`/profile/messages/chat/${res.conversation}`);
            });
    }

    openModal(id) {
        this.setState({ isShownContactHostModal: true, selectedListing: id });
    }

    closeModal() {
        this.setState({ isShownContactHostModal: false });
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

                        <AllListingsFilter
                            countries={this.state.countries}
                            cities={this.state.cities}
                            city={this.state.city}
                            country={this.state.country}
                            onSelect={this.onSelect}
                            name={this.state.name}
                            hostEmail={this.state.hostEmail}
                            updateCountry={this.updateCountry}
                            onSearch={this.onSearch}
                            loading={this.state.countries === [] || this.state.countries.length === 0}
                            onChange={this.onChange} />

                        <ContactHostModal id={this.state.selectedListing} isActive={this.state.isShownContactHostModal} closeModal={this.closeModal} sendMessageToHost={this.sendMessageToHost} />


                        {this.state.listings.length === 0 ? <div className="text-center p20"><h3>There isn't any unpublished listings</h3></div> :
                            <div className="container">
                                <div className="table-header bold">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-4">
                                        <span>Name</span>
                                    </div>
                                    <div className="col-md-2">
                                        <span>Price</span>
                                    </div>
                                    <div className="col-md-3">
                                        <span>Actions</span>
                                    </div>
                                    <div className="col-md-2">
                                        <span>Contact host</span>
                                    </div>
                                </div>
                                {this.state.listings.map((item, i) => {
                                    return <ListingRow action="Publish" updateListingStatus={this.updateListingStatus} listing={item} key={i} openModal={this.openModal} />;
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

export default withRouter(AllUnpublishedListings);