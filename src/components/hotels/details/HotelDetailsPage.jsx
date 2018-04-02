import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Config } from '../../../config';
import Lightbox from 'react-images';
import PropTypes from 'prop-types';
import HotelDetailsInfoSection from './HotelDetailsInfoSection';
import React from 'react';
import HotelsSearchBar from '../search/HotelsSearchBar';
import { connect } from 'react-redux';
import moment from 'moment';
import { parse } from 'query-string';
import ChildrenModal from '../modals/ChildrenModal';
import { ROOMS_XML_CURRENCY } from '../../../constants/currencies.js';

import { getTestHotelById, getRegionNameById, getLocRateInUserSelectedCurrency, getCurrencyRates, testBook } from '../../../requester';

class HotelDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        
        let startDate = moment().add(1, 'day');
        let endDate = moment().add(2, 'day');

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
            adults: '2',
            children: '0',
            nights: nights,
            data: null,
            lightboxIsOpen: false,
            currentImage: 0,
            prices: null,
            oldCurrency: this.props.paymentInfo.currency,
            userInfo: null,
            loading: true,
            isShownContactHostModal: false,
            roomLoader: undefined,
        };

        this.handleApply = this.handleApply.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDatePick = this.handleDatePick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoImage = this.gotoImage.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.handleRoomsChange = this.handleRoomsChange.bind(this);
        this.handleAdultsChange = this.handleAdultsChange.bind(this);
        this.handleChildrenChange = this.handleChildrenChange.bind(this);
        this.handleChildAgeChange = this.handleChildAgeChange.bind(this);
        this.handleSelectRegion = this.handleSelectRegion.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
        this.handleToggleChildren = this.handleToggleChildren.bind(this);
        this.handleBookRoom = this.handleBookRoom.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const search = this.props.location.search;
        getTestHotelById(id, search).then((data) => {
            this.setState({ data: data, loading: false });
            const searchParams = this.getSearchParams(this.props.location.search);
            const regionId = searchParams.get('region') || data.region.externalId;
            getRegionNameById(regionId).then((json) => {
                this.setState({ region: json });
            });
        });

        this.getLocRate();
        getCurrencyRates().then((json) => {
            this.setState({ rates: json });
        });
    }

    componentWillMount() {
        if (this.props.location.search) {
            const searchParams = this.getSearchParams(this.props.location.search);
            const startDate = moment(searchParams.get('startDate'), 'DD/MM/YYYY');
            const endDate = moment(searchParams.get('endDate'), 'DD/MM/YYYY');
            const rooms = JSON.parse(decodeURI(searchParams.get('rooms')));
            const adults = this.getAdults(rooms);
            const hasChildren = this.getHasChildren(rooms);
            this.setState({
                startDate: startDate,
                endDate: endDate,
                nights: this.calculateNights(startDate, endDate),
                rooms: rooms,
                adults: adults,
                hasChildren: hasChildren
            });
        }
    }

    getSearchParams() {
        const map = new Map();
        const pairs = this.props.location.search.substr(1).split('&');
        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i].split('=');
            map.set(pair[0], this.parseParam(pair[1]));
        }

        return map;
    }
    
    getAdults(rooms) {
        let adults = 0;
        for (let i = 0; i < rooms.length; i++) {
            adults += Number(rooms[i].adults);
        }
        return adults;
    }
    
    getHasChildren(rooms) {
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].children.length !== 0) {
                return true;
            }
        }
        return false;
    }

    getLocRate() {
        getLocRateInUserSelectedCurrency(ROOMS_XML_CURRENCY).then((json) => {
            this.setState({ locRate: Number(json[0][`price_${ROOMS_XML_CURRENCY.toLowerCase()}`]) });
        });
    }

    updateParamsMap(key, value) {
        if (!value || value === '') {
            this.state.searchParams.delete(key);
        } else {
            this.state.searchParams.set(key, this.createParam(value));
        }
    }

    parseParam(param) {
        return param.split('%20').join(' ');
    }

    createParam(param) {
        return param.split(' ').join('%20');
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
            startDate: picker.startDate,
            endDate: picker.endDate,
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
            return diffDays;
        }
        else {
            return 0;
        }
    }

    handleSelectRegion(value) {
        this.setState({ region: value });
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
        if (value > 10) {
            value = 10;
        }
        let rooms = this.state.rooms.slice();
        let children = rooms[roomIndex].children;
        if (children.length < value) {
            while (children.length < value) {
                children.push({ age: '1' });
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

    checkAvailability (quoteId) {
        const rooms = this.state.rooms.map((room) => {
            const adults = [];
            const children = room.children;
            for (let j = 0; j < room.adults; j++) {
                const adult = {
                    title: 'Mr',
                    firstName: null,
                    lastName: null,
                };

                adults.push(adult);
            }

            return {
                adults: adults,
                children: children
            };
        });

        const currency = this.props.paymentInfo.currency;
        const booking = {
            quoteId: quoteId,
            rooms: rooms,
            currency: currency
        };

        const roomAvailability = new Map(this.state.roomAvailability);
        roomAvailability.set(quoteId, 'loading');
        this.setState({ roomAvailability: roomAvailability }, () => {
            testBook(booking).then((res) => {
                const updatedRoomAvailability = new Map(this.state.roomAvailability);
                if (res.ok) {
                    updatedRoomAvailability.set(quoteId, true);
                } else {
                    updatedRoomAvailability.set(quoteId, false);
                }
    
                this.setState({ roomAvailability: updatedRoomAvailability });
            });
        });
    }
    
    handleBookRoom (roomsResults) {
        this.setState({ roomLoader: true });
        NotificationManager.info('Checking room availability...');
        const rooms = this.state.rooms.map((room) => {
            const adults = [];
            const children = room.children;
            for (let j = 0; j < room.adults; j++) {
                const adult = {
                    title: 'Mr',
                    firstName: null,
                    lastName: null,
                };

                adults.push(adult);
            }

            return {
                adults: adults,
                children: children
            };
        });

        const currency = this.props.paymentInfo.currency;
        const booking = {
            rooms: rooms,
            currency: currency
        };

        const allRooms = [];
        for (let i = 0; i < roomsResults.length; i++) {
            for (let j = 0; j < roomsResults[i].length; j++) {
                allRooms.push({
                    key: roomsResults[i][j].key,
                    quoteId: roomsResults[i][j].quoteId,
                    price: roomsResults[i][j].totalPrice,
                });
            }
        }

        this.checkNextRoom(allRooms, 0, booking);
    }
    
    checkNextRoom(allRooms, index, booking) {
        if (index > allRooms.length) {
            NotificationManager.warning('Unfortunatelly all rooms in that hotel were already taken, please try another one.', '', 5000);
            const search = this.props.location.search;
            const URL = `/hotels/listings/${search}`;
            this.props.history.push(URL);
            return;
        }

        booking.quoteId = allRooms[index].quoteId;
        testBook(booking).then((res) => {
            if (res.ok) {
                if (index !== 0) {
                    NotificationManager.info('The room that you requested is no longer available. You were given a similar room which may have slightly different price and extras.', '', 5000);
                }

                const id = this.props.match.params.id;
                const search = this.props.location.search;
                const URL = `/hotels/listings/book/${id}${search}&quoteId=${booking.quoteId}`;
                this.props.history.push(URL);
            } else {
                this.checkNextRoom(allRooms, index + 1, booking);
            }
        });
    }

    render() {
        let loading, images;
        if (!this.state.data) {
            loading = true;
        } else {
            images = null;
            if (this.state.data.hotelPhotos !== undefined) {
                images = this.state.data.hotelPhotos.map(x => {
                    return { src: Config.getValue('imgHost') + x.externalUrl };
                });
            }
        }

        return (
            <div>
                <div>
                    <NotificationContainer />
                    <HotelsSearchBar
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        region={this.state.region}
                        rooms={this.state.rooms}
                        adults={this.state.adults}
                        hasChildren={this.state.hasChildren}
                        guests={this.state.guests}
                        onChange={this.onChange}
                        handleRoomsChange={this.handleRoomsChange}
                        handleSearch={this.handleSearch}
                        handleDatePick={this.handleDatePick}
                        handleSelectRegion={this.handleSelectRegion}
                        handleToggleChildren={this.handleToggleChildren}
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
                                    {this.state.data.reviews && this.state.data.reviews.length > 0 &&
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

                        <section id="hotel-info">
                            <div className="container">

                                <HotelDetailsInfoSection
                                    nights={this.state.nights}
                                    onApply={this.handleApply}
                                    startDate={this.state.calendarStartDate}
                                    endDate={this.state.calendarEndDate}
                                    data={this.state.data}
                                    locRate={this.state.locRate}
                                    rates={this.state.rates}
                                    loading={this.state.loading}
                                    currencySign={this.props.paymentInfo.currencySign}
                                    handleBookRoom={this.handleBookRoom}
                                    checkAvailability={this.checkAvailability}
                                    roomLoader={this.state.roomLoader}
                                />
                            </div>
                            <ChildrenModal
                                modalId="childrenModal"
                                rooms={this.state.rooms}
                                handleChildrenChange={this.handleChildrenChange}
                                handleChildAgeChange={this.handleChildAgeChange}
                                isActive={this.state.childrenModal}
                                closeModal={this.closeModal}
                                handleSubmit={this.redirectToSearchPage}
                            />
                        </section>
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
    const { userInfo, paymentInfo, modalsInfo } = state;
    return {
        userInfo,
        paymentInfo,
        modalsInfo
    };
}