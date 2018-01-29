import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Route, Switch, withRouter } from 'react-router-dom';
import {
    createListing,
    editListing,
    getAmenitiesByCategory,
    getCities,
    getCountries,
    getCurrencies,
    getListingProgress,
    getMyListingById,
    getPropertyTypes,
    updateListingProgress
} from '../../requester';

import { Config } from '../../config';
import DefaultListing from './DefaultListing';
import EditListingAccommodation from './basics/EditListingAccommodation';
import EditListingChecking from './guestSettings/EditListingChecking';
import EditListingDescription from './placeDescription/EditListingDescription';
import EditListingFacilities from './basics/EditListingFacilities';
import EditListingHouseRules from './guestSettings/EditListingHouseRules';
import EditListingLandingPage from './basics/EditListingLandingPage';
import EditListingLocation from './basics/EditListingLocation';
import EditListingPhotos from './placeDescription/EditListingPhotos';
import EditListingPlaceType from './basics/EditListingPlaceType';
import EditListingPrice from './guestSettings/EditListingPrice';
import EditListingSafetyAmenities from './basics/EditListingSafetyAmenities';
import EditListingTitle from './placeDescription/EditListingTitle';
import Footer from '../Footer';
import MainNav from '../MainNav';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import request from 'superagent';
import update from 'react-addons-update';

const host = Config.getValue('apiHost');
const LOCKCHAIN_UPLOAD_URL = `${host}images/upload`;

const steps = {
    '1': 'landing',
    '2': 'placetype',
    '3': 'accommodation',
    '4': 'facilities',
    '5': 'safetyamenities',
    '6': 'location',
    '7': 'description',
    '8': 'photos',
    '9': 'houserules',
    '10': 'checking',
    '11': 'price',
};

class EditListingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listingId: 0,
            isInProgress: false,
            listingType: DefaultListing.type,
            country: DefaultListing.country,
            propertyType: DefaultListing.propertyType,
            roomType: DefaultListing.roomType,
            dedicatedSpace: DefaultListing.dedicatedSpace,
            propertySize: DefaultListing.size,
            guestsIncluded: 1,
            bedroomsCount: 1,
            bedrooms: [this.createBedroom(),],
            bathrooms: 1,
            amenities: new Set(),
            street: '',
            city: '',
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
            securityDeposit: '0',
            currency: '2',
            loading: false,
            propertyTypes: [],
            countries: [],
            categories: [],
            cities: [],
            currencies: [],
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
        this.persistListing = this.persistListing.bind(this);
        this.updateCountries = this.updateCountries.bind(this);
        this.updateCities = this.updateCities.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
        this.populateFileUrls = this.populateFileUrls.bind(this);
        this.populateFileThumbUrls = this.populateFileThumbUrls.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        this.setState({ listingId: id });
        const search = this.props.location.search;
        if (search) {
            this.setState({ isInProgress: true, progressId: id });
            getListingProgress(id).then(res => {
                this.setListingData(JSON.parse(res.data));
                const step = steps[search.split('=')[1]];
                const path = `/profile/listings/edit/${step}/${id}`;
                this.props.history.push(path);
            });
        } else {
            getMyListingById(id).then(data => {
                this.setListingData(data);
            });
        }
    }

    setListingData(data) {
        this.setState({
            type: data.listingType.toString(),
            country: data.country,
            propertyType: data.type.toString(),
            roomType: data.details.roomType ? data.details.roomType : this.getDetailValue(data, 'roomType'),
            dedicatedSpace: data.details.dedicatedSpace ? data.details.dedicatedSpace : this.getDetailValue(data, 'dedicatedSpace'),
            propertySize: data.details.size ? data.details.size : this.getDetailValue(data, 'size'),
            guestsIncluded: data.guestsIncluded ? data.guestsIncluded : 0,
            bedroomsCount: data.details.bedroomsCount ? data.details.bedroomsCount : this.getDetailValue(data, 'bedroomsCount'),
            bedrooms: data.rooms,
            bathrooms: data.details.bathrooms ? data.details.bathrooms : this.getDetailValue(data, 'bathrooms'),
            amenities: data.amenities ? new Set(this.getAmenities(data)) : new Set(),
            street: data.description.street,
            city: data.city,
            name: data.name,
            text: this.getText(data.description.text),
            interaction: data.description.interaction,
            uploadedFilesUrls: this.populateFileUrls(data.pictures),
            uploadedFilesThumbUrls: this.populateFileThumbUrls(data.pictures),
            suitableForChildren: data.details.suitableForChildren ? data.details.suitableForChildren : this.getDetailValue(data, 'suitableForChildren'),
            suitableForInfants: data.details.suitableForInfants ? data.details.suitableForInfants : this.getDetailValue(data, 'suitableForInfants'),
            suitableForPets: data.details.suitableForPets ? data.details.suitableForPets : this.getDetailValue(data, 'suitableForPets'),
            smokingAllowed: data.details.smokingAllowed ? data.details.smokingAllowed : this.getDetailValue(data, 'smokingAllowed'),
            eventsAllowed: data.details.eventsAllowed ? data.details.eventsAllowed : this.getDetailValue(data, 'eventsAllowed'),
            otherHouseRules: this.getOtherHouseRules(data),
            checkinStart: moment(data.checkinStart, 'HH:mm:ss').format('HH:mm'),
            checkinEnd: moment(data.checkinEnd, 'HH:mm:ss').format('HH:mm'),
            checkoutStart: moment(data.checkoutStart, 'HH:mm:ss').format('HH:mm'),
            checkoutEnd: moment(data.checkoutEnd, 'HH:mm:ss').format('HH:mm'),
            defaultDailyPrice: data.defaultDailyPrice,
            cleaningFee: data.cleaningFee,
            depositRate: data.depositRate,
            currency: data.currency,
        });
    }

    getOtherHouseRules(data) {
        const houseRules = data.houseRules ? data.houseRules : data.description.houseRules;
        if (houseRules && houseRules.length > 0) {
            return new Set(houseRules.split('\r\n'));
        }

        return new Set();
    }

    componentDidMount() {
        getCountries().then(data => {
            this.setState({ countries: data.content });

            getCities(this.state.country).then(data => {
                this.setState({ cities: data.content });
            });
        });

        getAmenitiesByCategory().then(data => {
            this.setState({ categories: data.content });
        });

        getPropertyTypes().then(data => {
            this.setState({ propertyTypes: data.content });
        });

        getCurrencies().then(data => {
            this.setState({ currencies: data.content });
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
        let amenities = this.state.amenities;
        if (amenities.has(item)) {
            amenities.delete(item);
        } else {
            amenities.add(item);
        }

        this.setState({
            amenities: amenities,
        });
    }

    getText(text) {
        if (text) {
            let index = text.indexOf('Neighborhood:');
            if (index >= 0) {
                return text.substr(0, index).trim();
            }
            else {
                return text.trim();
            }
        }

        return DefaultListing.text;
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

    populateFileUrls(data) {
        const fileUrls = [];
        if (data) {
            for (let i = 0; i < data.length; i++) {
                fileUrls.push(data[i].original);
            }
        }

        return fileUrls;
    }

    populateFileThumbUrls(data) {
        const fileThumbUrls = [];
        if (data) {
            for (let i = 0; i < data.length; i++) {
                fileThumbUrls.push(data[i].thumbnail);
            }
        }

        return fileThumbUrls;
    }

    persistListing(captchaToken) {
        this.setState({ loading: true });
        let listing = this.createListingObject();
        if (this.state.isInProgress) {
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
        } else {
            editListing(this.state.listingId, listing, captchaToken).then((res) => {
                if (res.success) {
                    this.setState({ loading: false });
                    this.props.history.push('/profile/listings');
                    NotificationManager.success('Successfully updated your profile', 'Edit new listing');

                } else {
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
    }

    createListingObject() {
        let listing = {
            progressId: this.state.progressId,
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
            amenities: this.state.amenities,
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

    updateProgress(step) {
        const progressId = this.state.listingId;
        let listing = this.createListingObject();
        let data = {
            step: step,
            data: JSON.stringify(listing),
        };

        updateListingProgress(progressId, data);
    }

    getDetailValue(data, detailName) {
        if (Array.isArray(data.details)) {
            const filtered = data.details.filter(x => x.detail.name === detailName);
            if (filtered[0]) {
                return filtered[0].value;
            }
        }

        return DefaultListing[detailName];
    }

    getAmenities(data) {
        if (data.amenities[0] && data.amenities[0].hasOwnProperty('id')) {
            return data.amenities.map(x => x.id);
        } else {
            return data.amenities;
        }
    }

    render() {
        const id = this.state.listingId;
        return (
            <div>
                <NotificationContainer />
                <nav id="main-nav" className="navbar"><MainNav /></nav>
                <Switch>
                    <Route exact path={`/profile/listings/edit/landing/${id}`} render={() => <EditListingLandingPage
                        values={this.state}
                        onChange={this.onChange}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path={`/profile/listings/edit/placetype/${id}`} render={() => <EditListingPlaceType
                        values={this.state}
                        toggleCheckbox={this.toggleCheckbox}
                        onChange={this.onChange}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path={`/profile/listings/edit/accommodation/${id}`} render={() => <EditListingAccommodation
                        values={this.state}
                        updateCounter={this.updateCounter}
                        updateBedrooms={this.updateBedrooms}
                        updateBedCount={this.updateBedCount}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path={`/profile/listings/edit/facilities/${id}`} render={() => <EditListingFacilities
                        values={this.state}
                        toggle={this.toggleFacility}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path={`/profile/listings/edit/safetyamenities/${id}`} render={() => <EditListingSafetyAmenities
                        values={this.state}
                        toggle={this.toggleFacility}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path={`/profile/listings/edit/location/${id}`} render={() => <EditListingLocation
                        values={this.state}
                        onChange={this.onChange}
                        onSelect={this.onSelect}
                        updateCountries={this.updateCountries}
                        updateCities={this.updateCities}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path={`/profile/listings/edit/title/${id}`} render={() => <EditListingTitle
                        values={this.state}
                        updateTextbox={this.onChange}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path={`/profile/listings/edit/description/${id}`} render={() => <EditListingDescription
                        values={this.state}
                        onChange={this.onChange}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path={`/profile/listings/edit/photos/${id}`} render={() => <EditListingPhotos
                        values={this.state}
                        onImageDrop={this.onImageDrop}
                        removePhoto={this.removePhoto}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path={`/profile/listings/edit/houserules/${id}`} render={() => <EditListingHouseRules
                        values={this.state}
                        onChange={this.onChange}
                        addRule={this.addHouseRule}
                        removeRule={this.removeHouseRule}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path={`/profile/listings/edit/checking/${id}`} render={() => <EditListingChecking
                        values={this.state}
                        updateDropdown={this.onChange}
                        updateProgress={this.updateProgress} />} />
                    <Route exact path={`/profile/listings/edit/price/${id}`} render={() => <EditListingPrice
                        values={this.state}
                        onChange={this.onChange}
                        persistListing={this.persistListing}
                        updateProgress={this.updateProgress} />} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(EditListingPage);

EditListingPage.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
};