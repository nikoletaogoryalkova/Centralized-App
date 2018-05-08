import { NotificationManager } from 'react-notifications';
import { Route, Switch, withRouter } from 'react-router-dom';
import {
  createListing,
  editListing,
  getAmenitiesByCategory,
  getCurrencies,
  getListingProgress,
  getMyListingById,
  getPropertyTypes,
  updateListingProgress
} from '../../requester';

import { Config } from '../../config';
import DefaultListing from './DefaultListing';
import ListingAccommodations from './steps/ListingAccommodations';
import ListingChecking from './steps/ListingChecking';
import ListingDescription from './steps/ListingDescription';
import ListingFacilities from './steps/ListingFacilities';
import ListingHouseRules from './steps/ListingHouseRules';
import ListingLandingPage from './steps/ListingLandingPage';
import ListingLocation from './steps/ListingLocation';
import ListingPhotos from './steps/ListingPhotos';
import ListingPlaceType from './steps/ListingPlaceType';
import ListingPrice from './steps/ListingPrice';
import ListingSafetyFacilities from './steps/ListingSafetyFacilities';
import PropTypes from 'prop-types';
import React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import moment from 'moment';
import request from 'superagent';
import update from 'react-addons-update';
import ReCAPTCHA from 'react-google-recaptcha';

const host = Config.getValue('apiHost');
const LOCKTRIP_UPLOAD_URL = `${host}images/upload`;

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

let routes;

class EditListingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listingId: 0,
      progressId: 0,
      isInProgress: false,
      listingType: DefaultListing.type,
      country: DefaultListing.country,
      propertyType: DefaultListing.propertyType,
      roomType: DefaultListing.roomType,
      dedicatedSpace: DefaultListing.dedicatedSpace,
      propertySize: DefaultListing.size,
      guestsIncluded: 1,
      bedroomsCount: '1 bedroom',
      bedrooms: [this.createBedroom(),],
      bathrooms: 1,
      facilities: new Set(),
      street: '',
      city: '',
      state: '',
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

      isAddressSelected: false,
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
    this.editListing = this.editListing.bind(this);
    this.updateCountries = this.updateCountries.bind(this);
    this.updateCities = this.updateCities.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.populateFileUrls = this.populateFileUrls.bind(this);
    this.populateFileThumbUrls = this.populateFileThumbUrls.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.finish = this.finish.bind(this);
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    const search = this.props.location.search;
    if (search) {
      this.setState({ progressId: id, isInProgress: true });
      getListingProgress(id).then(res => {
        this.setListingData(JSON.parse(res.data));
        const step = steps[search.split('=')[1]];
        const path = `/profile/listings/edit/${step}/${id}`;
        this.props.history.push(path);
      });
    } else {
      this.setState({ listingId: id });
      getMyListingById(id).then(data => {
        this.setListingData(data);
      });
    }

    routes = {
      landing: '/profile/listings/edit/landing/' + id,
      placetype: '/profile/listings/edit/placetype/' + id,
      accommodation: '/profile/listings/edit/accommodation/' + id,
      facilities: '/profile/listings/edit/facilities/' + id,
      safetyamenities: '/profile/listings/edit/safetyamenities/' + id,
      location: '/profile/listings/edit/location/' + id,
      description: '/profile/listings/edit/description/' + id,
      photos: '/profile/listings/edit/photos/' + id,
      houserules: '/profile/listings/edit/houserules/' + id,
      checking: '/profile/listings/edit/checking/' + id,
      price: '/profile/listings/edit/price/' + id,
    };
  }

  setListingData(data) {
    const city = data.location.split(', ')[0];
    const state = data.location.split(', ')[1];
    const country = data.location.split(', ')[2];
    const isAddressSelected = !!(city && state && country);

    this.setState({
      type: data.listingType.toString(),
      city: data.location.split(', ')[0],
      state: data.location.split(', ')[1],
      country: data.location.split(', ')[2],
      isAddressSelected: isAddressSelected,
      propertyType: data.type.toString(),
      roomType: data.details.roomType ? data.details.roomType : this.getDetailValue(data, 'roomType'),
      dedicatedSpace: data.details.dedicatedSpace ? data.details.dedicatedSpace : this.getDetailValue(data, 'dedicatedSpace'),
      propertySize: data.details.size ? data.details.size : this.getDetailValue(data, 'size'),
      guestsIncluded: data.guestsIncluded ? data.guestsIncluded : 0,
      bedroomsCount: data.details.bedroomsCount ? data.details.bedroomsCount : this.getDetailValue(data, 'bedroomsCount'),
      bedrooms: data.rooms,
      bathrooms: data.details.bathrooms ? Number(data.details.bathrooms) : this.getDetailValue(data, 'bathrooms'),
      facilities: data.amenities ? new Set(this.getAmenities(data)) : new Set(),
      street: data.description.street,
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
    let bedroomsCount = Number(this.state.bedroomsCount.split(' ')[0]);
    let value = Number(event.target.value.split(' ')[0]);
    if (value < 0) { value = 0; }

    let newBedrooms = JSON.parse(JSON.stringify(this.state.bedrooms));

    if (value > bedroomsCount) {
      for (let i = bedroomsCount; i < value; i++) {
        newBedrooms.push(this.createBedroom());
      }
    } else {
      newBedrooms = newBedrooms.slice(0, value);
    }

    // console.log(value + ' ' + event.target.value.split(' ')[1]);
    // console.log(newBedrooms);

    this.setState({
      bedroomsCount: value + ' ' + event.target.value.split(' ')[1],
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
    let facilities = this.state.facilities;
    if (facilities.has(item)) {
      facilities.delete(item);
    } else {
      facilities.add(item);
    }

    this.setState({
      facilities: facilities,
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
  }

  updateCountries() {
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

  finish() {
    this.editCaptcha.execute();
  }

  editListing(captchaToken) {
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
          NotificationManager.success('Successfully updated your listing');

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
      location: `${this.state.city}, ${this.state.state}, ${this.state.country}, ${this.state.countryCode}`,
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
        {
          value: this.state.lng,
          detail: { name: 'lng' }
        },
        {
          value: this.state.lat,
          detail: { name: 'lat' }
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
      let upload = request.post(LOCKTRIP_UPLOAD_URL)
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
    if (this.state.isInProgress) {
      const progressId = this.state.progressId;
      let listing = this.createListingObject();
      let data = {
        step: step,
        data: JSON.stringify(listing),
      };

      updateListingProgress(progressId, data);
    }
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

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      uploadedFilesUrls: arrayMove(this.state.uploadedFilesUrls, oldIndex, newIndex),
      uploadedFilesThumbUrls: arrayMove(this.state.uploadedFilesThumbUrls, oldIndex, newIndex)
    });
  }

  convertGoogleApiAddressComponents(place) {
    let addressComponents = place.address_components;

    let addressComponentsArr = [];

    for (let i = 0; i < addressComponents.length; i++) {

      let addressComponent = {
        name: addressComponents[i].long_name,
        shortName: addressComponents[i].short_name,
        type: addressComponents[i].types[0]
      };
      addressComponentsArr.push(addressComponent);
    }

    return addressComponentsArr;
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path={routes.landing} render={() => <ListingLandingPage
            values={this.state}
            onChange={this.onChange}
            updateProgress={this.updateProgress}
            routes={routes}
            next={routes.placetype} />} />
          <Route exact path={routes.placetype} render={() => <ListingPlaceType
            values={this.state}
            toggleCheckbox={this.toggleCheckbox}
            onChange={this.onChange}
            updateProgress={this.updateProgress}
            routes={routes}
            prev={routes.landing}
            next={routes.accommodation} />} />
          <Route exact path={routes.accommodation} render={() => <ListingAccommodations
            values={this.state}
            updateCounter={this.updateCounter}
            updateBedrooms={this.updateBedrooms}
            updateBedCount={this.updateBedCount}
            updateProgress={this.updateProgress}
            routes={routes}
            prev={routes.placetype}
            next={routes.facilities} />} />
          <Route exact path={routes.facilities} render={() => <ListingFacilities
            values={this.state}
            toggle={this.toggleFacility}
            updateProgress={this.updateProgress}
            routes={routes}
            prev={routes.accommodation}
            next={routes.safetyamenities} />} />
          <Route exact path={routes.safetyamenities} render={() => <ListingSafetyFacilities
            values={this.state}
            toggle={this.toggleFacility}
            updateProgress={this.updateProgress}
            routes={routes}
            prev={routes.facilities}
            next={routes.location} />} />
          <Route exact path={routes.location} render={() => <ListingLocation
            values={this.state}
            onChange={this.onChange}
            onSelect={this.onSelect}
            updateCountries={this.updateCountries}
            updateCities={this.updateCities}
            updateProgress={this.updateProgress}
            routes={routes}
            prev={routes.safetyamenities}
            next={routes.description}
            convertGoogleApiAddressComponents={this.convertGoogleApiAddressComponents} />} />
          <Route exact path={routes.description} render={() => <ListingDescription
            values={this.state}
            onChange={this.onChange}
            updateProgress={this.updateProgress}
            routes={routes}
            prev={routes.location}
            next={routes.photos} />} />
          <Route exact path={routes.photos} render={() => <ListingPhotos
            values={this.state}
            onImageDrop={this.onImageDrop}
            removePhoto={this.removePhoto}
            onSortEnd={this.onSortEnd}
            updateProgress={this.updateProgress}
            routes={routes}
            prev={routes.description}
            next={routes.houserules} />} />
          <Route exact path={routes.houserules} render={() => <ListingHouseRules
            values={this.state}
            onChange={this.onChange}
            addRule={this.addHouseRule}
            removeRule={this.removeHouseRule}
            updateProgress={this.updateProgress}
            routes={routes}
            prev={routes.photos}
            next={routes.checking} />} />
          <Route exact path={routes.checking} render={() => <ListingChecking
            values={this.state}
            updateDropdown={this.onChange}
            updateProgress={this.updateProgress}
            routes={routes}
            prev={routes.houserules}
            next={routes.price} />} />
          <Route exact path={routes.price} render={() => <ListingPrice
            values={this.state}
            onChange={this.onChange}
            finish={this.finish}
            routes={routes}
            prev={routes.checking} />} />
        </Switch>

        <ReCAPTCHA
          ref={(el) => this.editCaptcha = el}
          size="invisible"
          sitekey={Config.getValue('recaptchaKey')}
          onChange={token => { this.editListing(token); }}
        />
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