import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import moment from 'moment';

import MainNav from '../MainNav';
import NavEditListing from './NavEditListing';
import EditListingLandingPage from './basics/EditListingLandingPage';
import EditListingPlaceType from './basics/EditListingPlaceType';
import EditListingAccommodation from './basics/EditListingAccommodation';
import EditListingFacilities from './basics/EditListingFacilities';
import EditListingSafetyAmenities from './basics/EditListingSafetyAmenities';
import EditListingLocation from './basics/EditListingLocation';
import EditListingTitle from './placeDescription/EditListingTitle';
import EditListingDescription from './placeDescription/EditListingDescription';
import EditListingPhotos from './placeDescription/EditListingPhotos';
import EditListingHouseRules from './guestSettings/EditListingHouseRules';
import EditListingChecking from './guestSettings/EditListingChecking';
import EditListingPrice from './guestSettings/EditListingPrice';
import Footer from '../Footer';

import { getCountries, getAmenitiesByCategory, getMyListingById, editListing, getPropertyTypes, getCities, getCurrencies } from '../../requester';

import { Config } from "../../config";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import request from 'superagent';
import update from 'react-addons-update';
const host = Config.getValue("apiHost");
const LOCKCHAIN_UPLOAD_URL = `${host}images/upload`;

class EditListingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listingId: 0,
            type: '1',
            country: '',
            propertyType: '1',
            roomType: 'entire',
            dedicatedSpace: 'true',
            propertySize: '0',
            guestsIncluded: 1,
            bedroomCount: 1,
            bedrooms: [ this.createBedroom(), ],
            bathrooms: 1,
            facilities: new Set(),
            // smokeDetector: false,
            // carbonMonoxideDetector: false,
            // firstAidKit: false,
            // safetyCard: false,
            // fireExtinguisher: false,
            // lockOnBedroomDoor: false,
            street: '',
            city: '',
            // apartment: '',
            // zipCode: '',
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
            currency: '2', // USD
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
        this.createListing = this.createListing.bind(this);
        this.updateCountries = this.updateCountries.bind(this);
        this.updateCities = this.updateCities.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        console.log(id)
        getMyListingById(this.props.match.params.id).then(data => {
            console.log(data);
            this.setState({
                listingId: id,
                type: data.listingType.toString(),
                country: data.country,
                propertyType: data.propertyType.toString(),
                // roomType: no room type,
                dedicatedSpace: data.details.dedicatedSpace, // details not loaded properly
                propertySize: data.details.size ? data.details.size : '0',
                guestsIncluded: data.guestsIncluded ? data.guestsIncluded : 0,
                bedroomCount: data.details.bedrooms ? data.details.bedrooms : 0,
                // bedrooms: data.details.bedrooms,
                bathrooms: data.details.bathrooms ? data.details.bathrooms : 0,
                facilities: new Set(data.amenities.map(a => a.id)),
                street: data.description.street,
                city: data.city,
                name: data.name,
                text: this.getText(data.description.text),
                interaction: data.description.interaction,
                // photos: getPhotos(data),
                suitableForChildren: data.details.suitableForChildren ? data.details.suitableForChildren : 'false',
                suitableForInfants: data.details.suitableForInfants ? data.details.suitableForInfants : 'false',
                suitableForPets: data.details.suitableForPets ? data.details.suitableForPets : 'false',
                smokingAllowed: data.details.smokingAllowed ? data.details.smokingAllowed : 'false',
                eventsAllowed: data.details.eventsAllowed ? data.details.eventsAllowed : 'false',
                // otherRules: method - house rules,
                checkinStart: moment(data.checkinStart, "HH:mm:ss").format("HH:mm"),
                checkinEnd: moment(data.checkinEnd, "HH:mm:ss").format("HH:mm"),
                checkoutStart: moment(data.checkoutStart, "HH:mm:ss").format("HH:mm"),
                checkoutEnd: moment(data.checkoutEnd, "HH:mm:ss").format("HH:mm"),
                defaultDailyPrice: data.defaultDailyPrice,
                cleaningFee: data.cleaningFee,
                depositRate: data.depositRate,
                currency: data.currency,
            });
            
            console.log(this.state);
        });

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
    };

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
        let bedroomCount = this.state.bedroomCount;
        let value = Number(event.target.value);
        if (value < 0) { value = 0; }
        if (value > 9) { value = 9; }
        let newBedrooms = JSON.parse(JSON.stringify(this.state.bedrooms));

        if (value > bedroomCount) {
            for (let i = bedroomCount; i < value; i++) {
                newBedrooms.push(this.createBedroom());
            }
        } else {
            newBedrooms = newBedrooms.slice(0, value);
        }

        this.setState({
            bedroomCount: value,
            bedrooms: newBedrooms,
        });
    }

    updateBedCount(bedroom, e) {
        const bedrooms = JSON.parse(JSON.stringify(this.state.bedrooms));
        const name = e.target.name;
        let value = Number(e.target.value);
        if (value < 0) { value = 0; }
        if (value > 9) { value = 9; }
        bedrooms[bedroom][name] = value;
        this.setState({
            bedrooms: bedrooms,
        })
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
        })
    }

    getText(text) {
        if (text) {
            let index = text.indexOf('\r\nNeighborhood:');
            return text.substr(0, index);
        }
    }

    addHouseRule() {
        const rules = this.state.otherHouseRules;
        const value = this.state.otherRuleText;
        if (value && value.length > 0) {
            rules.add(value);
            this.setState({
                otherHouseRules: rules,
                otherRuleText: '',
            })
        }
    }

    removeHouseRule(value) {
        const rules = this.state.otherHouseRules;
        rules.delete(value);
        this.setState({
            otherHouseRules: rules,
        })
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
        })
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

    createListing(captchaToken) {
        this.setState({loading: true});
        let listing = {
            listingType: this.state.type,
            type: this.state.propertyType,
            country: this.state.country,
            details: [
                {
                    value: this.state.roomType,
                    datail: { name: "roomType" }
                },
                {
                    value: this.state.propertySize,
                    detail: { name: "size" }
                },
                {
                    value: this.state.bedroomCount,
                    detail: { name: "bedroomsCount" }
                },
                {
                    value: this.state.bathrooms,
                    detail: { name: "bathrooms" }
                },
                // {
                //     value: this.state.apartment,
                //     detail: { name: "apartment" }
                // }
                // ,
                // {
                //     value: this.state.zipCode,
                //     detail: { name: "zipCode" }
                // },
                {
                    value: this.state.suitableForChildren,
                    detail: { name: "suitableForChildren" }
                },
                {
                    value: this.state.suitableForInfants,
                    detail: { name: "suitableForInfants" }
                },
                {
                    value: this.state.suitableForPets,
                    detail: { name: "suitableForPets" }
                },
                {
                    value: this.state.smokingAllowed,
                    detail: { name: "smokingAllowed" }
                },
                {
                    value: this.state.eventsAllowed,
                    detail: { name: "eventsAllowed" }
                },
                {
                    value: this.state.dedicatedSpace,
                    detail: { name: "dedicatedSpace" }
                },
                // {
                //     value: this.state.billingCountry,
                //     detail: { name: "billingCountry" }
                // }
            ],
            description: {
                street: this.state.street,
                text: this.state.text,
                interaction: this.state.interaction,
                houseRules: Array.from(this.state.otherHouseRules).join("\r\n"),
            },
            guestsIncluded: this.state.guestsIncluded,
            rooms: this.state.bedrooms,
            amenities: this.state.facilities,
            city: this.state.city,
            name: this.state.name,
            pictures: this.getPhotos(),
            checkinStart: moment(this.state.checkinStart, "h:mm A").format("YYYY-MM-DDTHH:mm:ss.SSS"),
            checkinEnd: moment(this.state.checkinEnd, "h:mm A").format("YYYY-MM-DDTHH:mm:ss.SSS"),
            checkoutStart: moment(this.state.checkoutStart, "h:mm A").format("YYYY-MM-DDTHH:mm:ss.SSS"),
            checkoutEnd: moment(this.state.checkoutEnd, "h:mm A").format("YYYY-MM-DDTHH:mm:ss.SSS"),
            defaultDailyPrice: this.state.defaultDailyPrice,
            cleaningFee: this.state.cleaningFee,
            securityDeposit: this.state.securityDeposit,
            currency: this.state.currency,
        }

        console.log(this.state.listingId);
        editListing(this.state.listingId, listing, captchaToken).then((res) => {
            if (res.success) {
                this.setState({loading: false});
                this.props.history.push('/profile/listings');
                NotificationManager.success('Successfully updated your profile', 'Edit new listing');
                
            }
            else {
                this.setState({loading: false});
                NotificationManager.error('Something went wrong!', 'Create new listing');
            }
        });
    }


    onImageDrop(files) {
        this.handleImageUpload(files)

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

    render() {
        return (
            <div>
                <NotificationContainer />
                <nav id="main-nav" className="navbar">
                    <MainNav />
                </nav>

                {this.props.location.pathname !== "/profile/listings/edit/landing" &&
                    <NavEditListing />
                }

                <Redirect exact path="/profile/listings/edit/:id" to="/profile/listings/edit/landing" />

                <Switch>
                    <Route exact path="/profile/listings/edit/landing" render={() =>
                        <EditListingLandingPage
                            values={this.state}
                            onChange={this.onChange} />} />
                    <Route exact path="/profile/listings/edit/placetype" render={() =>
                        <EditListingPlaceType
                            values={this.state}
                            toggleCheckbox={this.toggleCheckbox}
                            onChange={this.onChange} />} />
                    <Route exact path="/profile/listings/edit/accommodation" render={() =>
                        <EditListingAccommodation
                            values={this.state}
                            updateCounter={this.updateCounter}
                            updateBedrooms={this.updateBedrooms}
                            updateBedCount={this.updateBedCount}
                        />} />
                    <Route exact path="/profile/listings/edit/facilities" render={() =>
                        <EditListingFacilities
                            values={this.state}
                            toggle={this.toggleFacility} />} />
                    <Route exact path="/profile/listings/edit/safetyamenities" render={() =>
                        <EditListingSafetyAmenities
                            values={this.state}
                            toggle={this.toggleFacility} />} />
                    <Route exact path="/profile/listings/edit/location" render={() =>
                        <EditListingLocation
                            values={this.state}
                            onChange={this.onChange}
                            onSelect={this.onSelect}
                            updateCountries={this.updateCountries}
                            updateCities={this.updateCities} />} />
                    <Route exact path="/profile/listings/edit/title" render={() =>
                        <EditListingTitle
                            values={this.state}
                            updateTextbox={this.onChange} />} />
                    <Route exact path="/profile/listings/edit/description" render={() =>
                        <EditListingDescription
                            values={this.state}
                            onChange={this.onChange} />} />
                    <Route exact path="/profile/listings/edit/photos" render={() =>
                        <EditListingPhotos
                            values={this.state}
                            onImageDrop={this.onImageDrop}
                            removePhoto={this.removePhoto}
                        />} />
                    <Route exact path="/profile/listings/edit/houserules" render={() =>
                        <EditListingHouseRules
                            values={this.state}
                            onChange={this.onChange}
                            addRule={this.addHouseRule}
                            removeRule={this.removeHouseRule} />} />
                    <Route exact path="/profile/listings/edit/checking" render={() =>
                        <EditListingChecking
                            values={this.state}
                            updateDropdown={this.onChange} />} />
                    {/* <Route exact path="/listings/create/cancellation" render={() =>
                        <EditListingCancellation />} /> */}
                    <Route exact path="/profile/listings/edit/price" render={() =>
                        <EditListingPrice
                            values={this.state}
                            onChange={this.onChange}
                            createListing={this.createListing} />} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(EditListingPage);