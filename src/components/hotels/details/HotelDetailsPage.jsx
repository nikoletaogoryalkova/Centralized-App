import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {
    contactHost,
    getCalendarByListingIdAndDateRange,
    getCurrentLoggedInUserInfo,
    getPropertyById
} from '../../../requester';

import { Config } from '../../../config';
import Lightbox from 'react-images';
import PropTypes from 'prop-types';
import HotelDetailsInfoSection from './HotelDetailsInfoSection';
import React from 'react';
import HotelsSearchBar from '../search/HotelsSearchBar';
import ListingTypeNav from '../../common/listingTypeNav/ListingTypeNav';
import { connect } from 'react-redux';
import moment from 'moment';
import { parse } from 'query-string';

import { getTestHotelById } from '../../../requester';

class HotelDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        
        let startDate = moment();
        let endDate = moment().add(1, 'day');

        if (this.props) {
            let queryParams = parse(this.props.location.search);
            if (queryParams.startDate && queryParams.endDate) {
                startDate = moment(queryParams.startDate, 'DD/MM/YYYY');
                endDate = moment(queryParams.endDate, 'DD/MM/YYYY');
            }
        }

        let nights = this.calculateNights(startDate, endDate);

        this.state = {
            searchStartDate: startDate,
            searchEndDate: endDate,
            calendarStartDate: startDate,
            calendarEndDate: endDate,
            rooms: [{ adults: 1, children: [] }],
            country: '',
            city: '',
            state: '',
            countryCode: '',
            nights: nights,
            data: null,
            lightboxIsOpen: false,
            currentImage: 0,
            prices: null,
            oldCurrency: this.props.paymentInfo.currency,
            loaded: false,
            userInfo: null,
            loading: true,
            isShownContactHostModal: false
        };

        this.handleApply = this.handleApply.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleRoomsChange = this.handleRoomsChange.bind(this);
        this.handleAdultsChange = this.handleAdultsChange.bind(this);
        this.handleChildrenChange = this.handleChildrenChange.bind(this);
        this.handleChildAgeChange = this.handleChildAgeChange.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoImage = this.gotoImage.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.initializeCalendar = this.initializeCalendar.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.sendMessageToHost = this.sendMessageToHost.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({ loading: true });
        this.getUserInfo();
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        getTestHotelById(id).then((data) => {
            this.setState({ data: data, loading: false });
            console.log(data);
        });

        this.getUserInfo();
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if (this.updateParamsMap) {
            this.updateParamsMap(e.target.name, e.target.value);
        }
    }

    handleSearch(e) {
        e.preventDefault();
        
        let queryString = '?';

        queryString += 'countryId=' + this.state.countryId;
        queryString += '&startDate=' + this.state.searchStartDate.format('DD/MM/YYYY');
        queryString += '&endDate=' + this.state.searchEndDate.format('DD/MM/YYYY');
        queryString += '&guests=' + this.state.guests;

        this.props.history.push('/homes/listings' + queryString);
    }

    getUserInfo() {
        if (localStorage.getItem(Config.getValue('domainPrefix') + '.auth.lockchain')) {
            getCurrentLoggedInUserInfo()
                .then(res => {
                    this.setState({
                        loaded: true,
                        userInfo: res,
                        loading: false
                    });
                });
        }
        else {
            this.setState({ loaded: true, loading: false });
        }
    }

    handleApply(event, picker) {
        const { startDate, endDate } = picker;
        const today = moment();
        const prices = this.state.prices;
        const range = prices.filter(x => x.start >= startDate && x.end < endDate);
        console.log(startDate, today);
        const isInvalidRange = range.filter(x => !x.available).length > 0;
        if (isInvalidRange) {
            NotificationManager.warning('There is a unavailable day in your select range', 'Calendar Operations');
            this.setState({ calendarStartDate: undefined, calendarEndDate: undefined });
        }
        else {
            this.setState({
                calendarStartDate: startDate,
                calendarEndDate: endDate,
            });

            this.calculateNights(startDate, endDate);
        }
    }

    handleDatePick(event, picker) {
        this.setState({
            searchStartDate: picker.startDate,
            searchEndDate: picker.endDate,
        });
    }

    openLightbox(event) {
        event.preventDefault();
        this.setState({
            lightboxIsOpen: true,
        });
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }

    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    gotoImage(index) {
        this.setState({
            currentImage: index,
        });
    }

    handleClickImage() {
        if (this.state.currentImage === this.state.data.pictures.length - 1) return;
        this.gotoNext();
    }

    calculateNights(startDate, endDate) {
        let checkIn = moment(startDate, 'DD/MM/YYYY');
        let checkOut = moment(endDate, 'DD/MM/YYYY');

        let diffDays = checkOut.diff(checkIn, 'days');

        if (checkOut > checkIn) {
            this.setState({ nights: diffDays });
        }
        else {
            this.setState({ nights: 0 });
        }
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

    initializeCalendar() {
        let now = new Date();
        let end = new Date();
        const DAY_INTERVAL = 90;
        end.setUTCHours(now.getUTCHours() + 24 * DAY_INTERVAL);

        getPropertyById(this.props.match.params.id).then((data) => {

            this.setState({ data: data });

            getCalendarByListingIdAndDateRange(this.props.match.params.id, now, end, this.props.paymentInfo.currency, 0, DAY_INTERVAL).then(res => {
                let prices = [];
                for (let dateInfo of res.content) {
                    let price = dateInfo.available ? `${this.props.paymentInfo.currencySign}${Math.round(dateInfo.price)}` : '';
                    prices.push(
                        {
                            'title': <span className="calendar-price bold">{price}</span>,
                            'start': moment(dateInfo.date, 'DD/MM/YYYY'),
                            'end': moment(dateInfo.date, 'DD/MM/YYYY'),
                            'allDay': true,
                            'price': dateInfo.price,
                            'available': dateInfo.available
                        }
                    );
                }

                this.setState({ prices: prices, calendar: res.content, oldCurrency: this.props.paymentInfo.currency });
            });
        });
    }

    openModal() {
        this.setState({ isShownContactHostModal: true });
    }

    closeModal() {
        this.setState({ isShownContactHostModal: false });
    }

    handleRoomsChange(event) {
        let value = event.target.value;
        if (value < 1) {
            value = 1;
        } else if (value > 5) {
            value = 5;
        }
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
        if (value > 10) {
            value = 10;
        }
        let rooms = this.state.rooms.slice();
        let children = rooms[roomIndex].children;
        if (children.length < value) {
            while (children.length < value) {
                children.push('');
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
        rooms[roomIndex].children[childIndex] = value;
        this.setState({ rooms: rooms });
    }

    render() {
        let loading, allEvents, images;
        if (this.state.data === null ||
            // this.state.prices === null ||
            // this.state.reservations === null ||
            this.state.loaded === false) {
            loading = true;
        } else {
            allEvents = this.state.prices;
            images = null;
            if (this.state.data.hotelPhotos !== undefined) {
                images = this.state.data.hotelPhotos.map(x => {
                    return { src: 'http://roomsxml.com' + x.externalUrl };
                });
            }

            console.log(images);
    
            if (this.state.oldCurrency !== this.props.paymentInfo.currency) {
                this.initializeCalendar();
            }
        }

        return (
            <div>
                <div>
                    <ListingTypeNav />
                    <HotelsSearchBar
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        rooms={this.state.rooms}
                        guests={this.state.guests}
                        childrenCount={this.state.childrenCount}
                        childrenAges={this.state.childrenAges}
                        onChange={this.onChange}
                        handleAdultsChange={this.handleAdultsChange}
                        handleRoomsChange={this.handleRoomsChange}
                        handleChildrenChange={this.handleChildrenChange}
                        handleChildAgeChange={this.handleChildAgeChange}
                        handleSearch={this.handleSearch}
                        handleDatePick={this.handleDatePick} 
                    />
                </div>
                
                {loading ? 
                    <div className="loader"></div> :
                    <div>
                        <section className="hotel-gallery">
                            <div className="hotel-gallery-bgr" style={(images && images.length > 0) ? { 'backgroundImage': 'url("' + images[0].src + '")' } : { backgroundColor: '#AAA' }}>
                                <div className="container">
                                    <a onClick={(e => this.openLightbox(e))} className="btn btn-primary btn-gallery">Open Gallery</a>
                                    {images !== null && <Lightbox
                                        currentImage={this.state.currentImage}
                                        images={images}
                                        isOpen={this.state.lightboxIsOpen}
                                        onClickImage={this.handleClickImage}
                                        onClickNext={this.gotoNext}
                                        onClickPrev={this.gotoPrevious}
                                        onClickThumbnail={this.gotoImage}
                                        onClose={this.closeLightbox}
                                    />}
                                </div>
                            </div>
                        </section>
                        <nav id="hotel-nav">
                            <div className="container">
                                <ul className="nav navbar-nav">
                                    <li>
                                        <a href="#overview">Overview</a>
                                    </li>
                                    <li>
                                        <a href="#facilities">Facilities</a>
                                    </li>
                                    {this.state.data.descriptionsAccessInfo &&
                                        <li>
                                            <a href="#reviews">Access Info</a>
                                        </li>
                                    }
                                    {this.state.data.reviews && this.state.data.reviews.lenght > 0 &&
                                        <li>
                                            <a href="#reviews">Reviews</a>
                                        </li>
                                    }
                                    <li>
                                        <a href="#map">Location</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        <HotelDetailsInfoSection
                            allEvents={allEvents}
                            nights={this.state.nights}
                            onApply={this.handleApply}
                            startDate={this.state.calendarStartDate}
                            endDate={this.state.calendarEndDate}
                            data={this.state.data}
                            prices={this.state.prices}
                            isLogged={this.props.userInfo.isLogged}
                            loading={this.state.loading}
                        />
                        
                        <NotificationContainer />
                    </div>
                }
            </div>
        );
    }
}

HotelDetailsPage.propTypes = {
    countries: PropTypes.array,
    match: PropTypes.object,

    // start Router props
    history: PropTypes.object,
    location: PropTypes.object,

    // start Redux props
    dispatch: PropTypes.func,
    userInfo: PropTypes.object,
    paymentInfo: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(HotelDetailsPage));

function mapStateToProps(state) {
    const { userInfo, paymentInfo } = state;
    return {
        userInfo,
        paymentInfo
    };
}