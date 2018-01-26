import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Route, Switch, withRouter } from 'react-router-dom';
import {
    createListing,
    createListingProgress,
    getAmenitiesByCategory,
    getCities,
    getCountries,
    getCurrencies,
    getCurrentLoggedInUserInfo,
    getPropertyTypes,
    updateListingProgress,
    updateUserInfo
} from '../../requester';

import { Config } from '../../config';
import CreateListingAccommodation from './basics/CreateListingAccommodation';
import CreateListingChecking from './guestSettings/CreateListingChecking';
import CreateListingDescription from './placeDescription/CreateListingDescription';
import CreateListingFacilities from './basics/CreateListingFacilities';
import CreateListingHouseRules from './guestSettings/CreateListingHouseRules';
import CreateListingLandingPage from './basics/CreateListingLandingPage';
import CreateListingLocAddress from './CreateListingLocAddress';
import CreateListingLocation from './basics/CreateListingLocation';
import CreateListingPhotos from './placeDescription/CreateListingPhotos';
import CreateListingPlaceType from './basics/CreateListingPlaceType';
import CreateListingPrice from './guestSettings/CreateListingPrice';
import CreateListingSafetyAmenities from './basics/CreateListingSafetyAmenities';
import CreateListingTitle from './placeDescription/CreateListingTitle';
import Footer from '../Footer';
import MainNav from '../MainNav';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import request from 'superagent';
import update from 'react-addons-update';

const host = Config.getValue('apiHost');
const LOCKCHAIN_UPLOAD_URL = `${host}images/upload`;

class CreateListingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listingType: '1',
            country: '1',
            propertyType: '1',
            roomType: 'entire',
            dedicatedSpace: 'true',
            propertySize: '',
            guestsIncluded: 1,
            bedroomsCount: 1,
            bedrooms: [this.createBedroom(),],
            bathrooms: 1,
            facilities: new Set(),
            street: '',
            city: '',
            apartment: '',
            zipCode: '',
            name: '',
            text: '',
            interaction: '',
            uploadedFiles: [],
            uploadedFilesUrls: [],
            uploadedFilesThumbUrls: [],
            suitableForChildren: 'false',
            suitableForInfants: 'false',
            suitableForPets: 'false',
            smokingAllowed: 'false',
            eventsAllowed: 'false',
            otherRuleText: '',
            otherHouseRules: new Set(),
            checkinStart: '14:00',
            checkinEnd: '20:00',
            checkoutStart: '00:00',
            checkoutEnd: '13:00',
            defaultDailyPrice: '0',
            cleaningFee: '0',
            depositRate: '0',
            currency: '2',
            loading: false,
            countries: [],
            categories: [],
            propertyTypes: [],
            cities: [],
            currencies: [],

            userHasLocAddress: null,
            locAddress: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.updateCounter = this.updateCounter.bind(this);
        this.updateBedrooms = this.updateBedrooms.bind(this);
        this.updateBedCount = this.updateBedCount.bind(this);
        this.toggleFacility = this.toggleFacility.bind(this);
        this.addHouseRule = this.addHouseRule.bind(this);
        this.removeHouseRule = this.removeHouseRule.bind(this);
        this.createListing = this.createListing.bind(this);
        this.updateCountries = this.updateCountries.bind(this);
        this.updateCities = this.updateCities.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
        this.updateLocAddress = this.updateLocAddress.bind(this);
        this.createProgress = this.createProgress.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }

    componentDidMount() {
        getCountries().then(data => {
            this.setState({ countries: data.content });
        });

        getAmenitiesByCategory().then(data => {
            this.setState({ categories: data.content });
        });

        getPropertyTypes().then(data => {
            this.setState({ propertyTypes: data.content });
        });

        getCities(this.state.country).then(data => {
            this.setState({ cities: data.content });
        });

        getCurrencies().then(data => {
            this.setState({ currencies: data.content });
        });

        getCurrentLoggedInUserInfo().then(data => {
            this.setState({ userHasLocAddress: data.locAddress !== null });
        });
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    toggleCheckbox(event) {
        this.setState({
            [event.target.name]: event.target.checked
        });
    }

    updateCounter(event) {
        const name = event.target.name;
        let value = Number(event.target.value);
        if (value < 1) { value = 1; }
        this.setState({ [name]: value });
    }

    updateBedrooms(event) {
        let bedroomsCount = this.state.bedroomsCount;
        let value = Number(event.target.value);
        if (value < 0) { value = 0; }

        let newBedrooms = JSON.parse(JSON.stringify(this.state.bedrooms));

        if (value > bedroomsCount) {
            for (let i = bedroomsCount; i < value; i++) {
                newBedrooms.push(this.createBedroom());
            }
        } else {
            newBedrooms = newBedrooms.slice(0, value);
        }

        this.setState({
            bedroomsCount: value,
            bedrooms: newBedrooms,
        });
    }

    updateBedCount(bedroom, e) {
        const bedrooms = JSON.parse(JSON.stringify(this.state.bedrooms));
        const name = e.target.name;
        let value = Number(e.target.value);
        if (value < 0) { value = 0; }
        bedrooms[bedroom][name] = value;
        this.setState({
            bedrooms: bedrooms,
        });
    }

    toggleFacility(item) {
        let fac = this.state.facilities;
        if (fac.has(item)) {
            fac.delete(item);
        } else {
            fac.add(item);
        }

        this.setState({
            facilities: fac,
        });
    }

    addHouseRule() {
        const rules = this.state.otherHouseRules;
        const value = this.state.otherRuleText;
        if (value && value.length > 0) {
            rules.add(value);
            this.setState({
                otherHouseRules: rules,
                otherRuleText: '',
            });
        }
    }

    removeHouseRule(value) {
        const rules = this.state.otherHouseRules;
        rules.delete(value);
        this.setState({
            otherHouseRules: rules,
        });
    }

    createBedroom() {
        return {
            singleBedCount: 0,
            doubleBedCount: 0,
            kingBedCount: 0,
        };
    }

    updateCities() {
        getCities(this.state.country).then(data => {
            this.setState({
                city: '',
                cities: data.content,
            });
        });
    }

    updateCountries() {
        getCountries().then(data => {
            this.setState({ countries: data.content });
        });
    }

    onSelect(name, option) {
        this.setState({
            [name]: option.value
        });
    }

    getPhotos() {
        let photos = [];
        for (let i = 0; i < this.state.uploadedFilesUrls.length; i++) {
            let photo = {
                sortOrder: i,
                original: this.state.uploadedFilesUrls[i],
                thumbnail: this.state.uploadedFilesThumbUrls[i]
            };

            photos.push(photo);
        }

        return photos;
    }

    createProgress() {
        let listing = this.createListingObject();
        let data = {
            step: 1,
            data: JSON.stringify(listing)
        };

        createListingProgress(data).then(res => {
            if (res.success) {
                res.response.json().then(res => {
                    const id = res.id;
                    this.setState({ progressId: id });
                });
            }
        });
    }

    updateProgress(step) {
        const progressId = this.state.progressId;
        if (!progressId) {
            this.createProgress();
        } else {
            let listing = this.createListingObject();
            let data = {
                step: step,
                data: JSON.stringify(listing),
            };

            updateListingProgress(progressId, data);
        }
    }

    createListing(captchaToken) {
        this.setState({ loading: true });
        let listing = this.createListingObject();

        createListing(listing, captchaToken).then((res) => {
            if (res.success) {
                this.setState({ loading: false });
                res.response.json().then(res => {
                    const id = res.id;
                    const path = `/profile/listings/calendar/${id}`;
                    this.props.history.push(path);
                });
            }
            else {
                this.setState({ loading: false });
                res.response.then(res => {
                    const errors = res.errors;
                    for (let key in errors) {
                        if (typeof errors[key] !== 'function') {
                            NotificationManager.warning(errors[key].message);
                        }
                    }
                });
            }
        });
    }

    createListingObject() {
        let listing = {
            listingType: this.state.listingType,
            type: this.state.propertyType,
            country: this.state.country,
            details: [
                {
                    value: this.state.roomType,
                    detail: { name: 'roomType' }
                },
                {
                    value: this.state.propertySize,
                    detail: { name: 'size' }
                },
                {
                    value: this.state.bedroomsCount,
                    detail: { name: 'bedroomsCount' }
                },
                {
                    value: this.state.bathrooms,
                    detail: { name: 'bathrooms' }
                },
                {
                    value: this.state.suitableForChildren,
                    detail: { name: 'suitableForChildren' }
                },
                {
                    value: this.state.suitableForInfants,
                    detail: { name: 'suitableForInfants' }
                },
                {
                    value: this.state.suitableForPets,
                    detail: { name: 'suitableForPets' }
                },
                {
                    value: this.state.smokingAllowed,
                    detail: { name: 'smokingAllowed' }
                },
                {
                    value: this.state.eventsAllowed,
                    detail: { name: 'eventsAllowed' }
                },
                {
                    value: this.state.dedicatedSpace,
                    detail: { name: 'dedicatedSpace' }
                },
            ],
            description: {
                street: this.state.street,
                text: this.state.text,
                interaction: this.state.interaction,
                houseRules: Array.from(this.state.otherHouseRules).join('\r\n'),
            },
            guestsIncluded: this.state.guestsIncluded,
            rooms: this.state.bedrooms,
            amenities: this.state.facilities,
            city: this.state.city,
            name: this.state.name,
            pictures: this.getPhotos(),
            checkinStart: moment(this.state.checkinStart, 'HH:mm').format('YYYY-MM-DDTHH:mm:ss.SSS'),
            checkinEnd: moment(this.state.checkinEnd, 'HH:mm').format('YYYY-MM-DDTHH:mm:ss.SSS'),
            checkoutStart: moment(this.state.checkoutStart, 'HH:mm').format('YYYY-MM-DDTHH:mm:ss.SSS'),
            checkoutEnd: moment(this.state.checkoutEnd, 'HH:mm').format('YYYY-MM-DDTHH:mm:ss.SSS'),
            defaultDailyPrice: this.state.defaultDailyPrice,
            cleaningFee: this.state.cleaningFee,
            depositRate: this.state.depositRate,
            currency: this.state.currency,
        };

        return listing;
    }

    onImageDrop(files) {
        this.handleImageUpload(files);

        this.setState({
            uploadedFiles: files
        });
    }

    handleImageUpload(files) {
        files.forEach((file) => {
            let upload = request.post(LOCKCHAIN_UPLOAD_URL)
                .field('image', file);

            upload.end((err, response) => {
                if (err) {
                    console.error(err);
                }
                if (response.body.secure_url !== '') {
                    console.log(response.body.original);
                    console.log(response.body.thumbnail);

                    this.setState(previousState => ({
                        uploadedFilesUrls: [...previousState.uploadedFilesUrls, response.body.original],
                        uploadedFilesThumbUrls: [...previousState.uploadedFilesThumbUrls, response.body.thumbnail]
                    }));
                }
            });
        });
    }

    removePhoto(e) {
        e.preventDefault();

        let imageUrl = e.target.nextSibling;

        if (imageUrl.src !== null) {
            let indexOfImage = this.state.uploadedFilesUrls.indexOf(imageUrl.getAttribute('src'));

            this.setState({
                uploadedFilesUrls: update(this.state.uploadedFilesUrls, { $splice: [[indexOfImage, 1]] }),
                uploadedFilesThumbUrls: update(this.state.uploadedFilesThumbUrls, { $splice: [[indexOfImage, 1]] })
            });
        }
    }

    updateLocAddress(captchaToken) {
        getCurrentLoggedInUserInfo().then(data => {
            let userInfo = {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                preferredLanguage: data.preferredLanguage,
                preferredCurrency: data.preferredCurrency.id,
                gender: data.gender,
                country: data.country.id,
                city: data.city.id,
                birthday: moment(data.birthday).format('DD/MM/YYYY'),
                locAddress: this.state.locAddress
            };
            updateUserInfo(userInfo, captchaToken).then(() => {
                this.componentDidMount();
            });
        });
    }

    render() {
        if (this.state.countries === [] || this.state.currencies === [] ||
            this.state.propertyTypes === [] || this.state.categories === [] ||
            this.state.cities === [] || this.state.userHasLocAddress === null) {
            return <div className="loader"></div>;
        }

        if (this.state.userHasLocAddress === false) {
            return <div>
                <nav id="main-nav" className="navbar"><MainNav /></nav>
                <CreateListingLocAddress values={this.state} onChange={this.onChange} updateLocAddress={this.updateLocAddress} />
                <Footer />
                <NotificationContainer />
            </div>;
        }

        return (
            <div>
                <nav id="main-nav" className="navbar"><MainNav /></nav>

                <Switch>
                    <Route exact path="/profile/listings/create/loc" render={() => <CreateListingLocAddress
                        values={this.state}
                        onChange={this.onChange} />} />
                    <Route exact path="/profile/listings/create/landing" render={() => <CreateListingLandingPage
                        values={this.state}
                        onChange={this.onChange}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path="/profile/listings/create/placetype" render={() => <CreateListingPlaceType
                        values={this.state}
                        toggleCheckbox={this.toggleCheckbox}
                        onChange={this.onChange}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path="/profile/listings/create/accommodation" render={() => <CreateListingAccommodation
                        values={this.state}
                        updateCounter={this.updateCounter}
                        updateBedrooms={this.updateBedrooms}
                        updateBedCount={this.updateBedCount}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path="/profile/listings/create/facilities" render={() => <CreateListingFacilities
                        values={this.state}
                        toggle={this.toggleFacility}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path="/profile/listings/create/safetyamenities" render={() => <CreateListingSafetyAmenities
                        values={this.state}
                        toggle={this.toggleFacility}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path="/profile/listings/create/location" render={() => <CreateListingLocation
                        values={this.state}
                        onChange={this.onChange}
                        onSelect={this.onSelect}
                        updateCountries={this.updateCountries}
                        updateCities={this.updateCities}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path="/profile/listings/create/title" render={() => <CreateListingTitle
                        values={this.state}
                        updateTextbox={this.onChange}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path="/profile/listings/create/description" render={() => <CreateListingDescription
                        values={this.state}
                        onChange={this.onChange}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path="/profile/listings/create/photos" render={() => <CreateListingPhotos
                        values={this.state}
                        onImageDrop={this.onImageDrop}
                        removePhoto={this.removePhoto}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path="/profile/listings/create/houserules" render={() => <CreateListingHouseRules
                        values={this.state}
                        onChange={this.onChange}
                        addRule={this.addHouseRule}
                        removeRule={this.removeHouseRule}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path="/profile/listings/create/checking" render={() => <CreateListingChecking
                        values={this.state}
                        updateDropdown={this.onChange}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path="/profile/listings/create/price" render={() => <CreateListingPrice
                        values={this.state}
                        onChange={this.onChange}
                        createListing={this.createListing} />} />
                </Switch>
                <Footer />
                <NotificationContainer />
            </div>
        );
    }
}

export default withRouter(CreateListingPage);

CreateListingPage.propTypes = {
    history: PropTypes.object
};