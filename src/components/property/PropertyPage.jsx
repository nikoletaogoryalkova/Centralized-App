import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import MainNav from '../MainNav';
import Search from '../home/Search';
import PropertyInfo from './PropertyInfo';
import Footer from '../Footer';

import Lightbox from 'react-images';
import moment from 'moment';

import {
    getPropertyById, getCalendarByListingIdAndDateRange, getCurrentLoggedInUserInfo,
    getLocRate
} from '../../requester';
import { parse } from 'query-string';
import {Config} from "../../config";

class PropertyPage extends React.Component {
    constructor(props) {
        super(props);

        let startDate = moment();
        let endDate = moment().add(1, 'days');

        if (this.props) {
            let queryParams = parse(this.props.location.search);

            if (queryParams.startDate && queryParams.endDate) {
                startDate = moment(queryParams.startDate, 'DD/MM/YYYY');
                endDate = moment(queryParams.endDate, 'DD/MM/YYYY');
            }
        }

        this.state = {
            startDate: startDate,
            endDate: endDate,
            nights: 0,
            data: null,
            lightboxIsOpen: false,
            currentImage: 0,
            currencySign: '',
            prices: null,
            oldCurrency: this.props.currency,
            loaded: false,
            isLogged: false,
            userInfo: null,
            locRate: null
        };

        this.handleApply = this.handleApply.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoImage = this.gotoImage.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.initializeCalendar = this.initializeCalendar.bind(this);
    };

    componentDidMount() {
        this.initializeCalendar();

        if (this.state.startDate && this.state.endDate) {
            this.calculateNights(this.state.startDate, this.state.endDate);
        }

        getLocRate().then((data) => {
            this.setState({locRate: data.loc});
            if (localStorage.getItem(Config.getValue("domainPrefix") + '.auth.lockchain')) {
                getCurrentLoggedInUserInfo()
                    .then(res => {
                        console.log(res);
                        this.setState({
                            loaded: true,
                            isLogged: true,
                            userInfo: res
                        });
                    })
            } else {
                this.setState({loaded: true});
            }
        });

    }

    handleApply(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate,
        });
        this.calculateNights(picker.startDate, picker.endDate);
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
            this.setState({ nights: diffDays })
        }
        else {
            this.setState({ nights: 0 })
        }
    }

    initializeCalendar() {
        let now = new Date();
        let end = new Date();
        const DAY_INTERVAL = 90;
        end.setUTCHours(now.getUTCHours() + 24 * DAY_INTERVAL);

        getPropertyById(this.props.match.params.id).then((data) => {

            this.setState({ currencySign: this.props.currencySign, data: data });

            getCalendarByListingIdAndDateRange(
                this.props.match.params.id,
                now,
                end,
                this.props.currency,
                0,
                DAY_INTERVAL
            ).then(res => {
                let prices = [];
                for (let dateInfo of res.content) {
                    let price = dateInfo.available ? `${this.state.currencySign}${dateInfo.price}` : ``;
                    prices.push(
                        {
                            "title": <span className="calendar-price bold">{price}</span>,
                            "start": moment(dateInfo.date, "DD/MM/YYYY"),
                            "end": moment(dateInfo.date, "DD/MM/YYYY"),
                            "allDay": true,
                            "price": dateInfo.price,
                            "available": dateInfo.available
                        }
                    )
                }

                this.setState({ prices: prices, calendar: res.content, oldCurrency: this.props.currency });
            });
        })
    }

    render() {

        if (this.state.data === null || this.state.prices === null || this.state.reservations === null || this.state.loaded === false) {
            return <div className="loader"></div>
        }

        let allEvents = this.state.prices;
        let images = null;
        if (this.state.data.pictures !== undefined) {
            images = this.state.data.pictures.map(x => {
                return { src: x.original };
            });
        }

        if (this.state.oldCurrency !== this.props.currency) {
            this.initializeCalendar();
        }

        return (
            <div key={1}>
                <div>
                    <header id='main-nav' className="navbar">
                        <MainNav />
                    </header>

                    <nav id="second-nav">
                        <div className="container">
                            <ul className="nav navbar-nav">
                                <li className="active">
                                    <Link to="/">HOMES</Link>
                                </li>
                            </ul>

                            <ul className="second-nav-text pull-right">
                            </ul>
                        </div>
                    </nav>

                    <section id="search-bar">
                        <div className="container">
                            <Search />
                        </div>
                    </section>
                </div>
                <section className="hotel-gallery">
                    <div className="hotel-gallery-bgr" style={this.state.data.pictures !== undefined ? { 'backgroundImage': 'url(' + this.state.data.pictures[0].original + ')' } : { backgroundColor: '#AAA' }}>
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
                <PropertyInfo allEvents={allEvents}
                              calendar={this.state.calendar}
                              nights={this.state.nights}
                              onApply={this.handleApply}
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              data={this.state.data}
                              currency={this.props.currency}
                              currencySign={this.props.currencySign}
                              prices={this.state.prices}
                              isLogged={this.state.isLogged}
                              userInfo={this.state.userInfo}
                              locRate={this.state.locRate} />
                <Footer />
            </div>
        );
    }
}

export default withRouter(PropertyPage)