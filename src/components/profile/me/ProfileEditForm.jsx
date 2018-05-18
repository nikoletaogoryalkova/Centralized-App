import 'react-notifications/lib/notifications.css';

import { NotificationManager } from 'react-notifications';
import { getCities, getCountries, getUserInfo, updateUserInfo } from '../../../requester';

import { Config } from '../../../config';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import moment from 'moment';

export default class ProfileEditPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      preferredLanguage: '',
      preferredCurrency: '',
      month: '',
      day: '',
      year: '',
      gender: '',
      country: '',
      city: '',
      locAddress: '',
      jsonFile: '',
      currencies: [],
      cities: [],
      countries: [],
      loading: true
    };


    this.onChange = this.onChange.bind(this);
    this.changeDropdownValue = this.changeDropdownValue.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateCities = this.updateCities.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
  }

  componentDidMount() {
    getCountries().then(data => {
      this.setState({ countries: data.content });
    });

    getUserInfo().then((data) => {
      let day = '';
      let month = '';
      let year = '';

      if (data.birthday !== null) {
        let birthday = moment.utc(data.birthday);
        day = birthday.add(1, 'days').format('D');
        month = birthday.format('MM');
        year = birthday.format('YYYY');
      }

      this.setState({
        firstName: data.firstName !== null ? data.firstName : '',
        lastName: data.lastName !== null ? data.lastName : '',
        phoneNumber: data.phoneNumber !== null ? data.phoneNumber : '',
        preferredLanguage: data.preferredLanguage !== null ? data.preferredLanguage : '',
        preferredCurrency: data.preferredCurrency !== null ? data.preferredCurrency.id : '',
        gender: data.gender !== null ? data.gender : '',
        country: data.country !== null ? data.country.id : '1',
        city: data.city !== null ? data.city.id : '1',
        locAddress: data.locAddress !== null ? data.locAddress : '',
        jsonFile: data.jsonFile !== null ? data.jsonFile : '',
        currencies: data.currencies,
        day: day,
        month: month,
        year: year
      }, () => {
        getCities(this.state.country).then(data => {
          this.setState({ cities: data.content });
        });
      });
    }).then(() => {
      this.setState({ loading: false });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeDropdownValue(a, event) {
    let stateKey = event.target.parentElement.parentElement.getAttribute('aria-labelledby');
    this.setState({ [stateKey]: event.target.innerText });
  }

  updateUser(captchaToken) {
    let birthday;
    if (this.state.day !== '' && this.state.month !== '' && this.state.year !== '') {
      birthday = `${this.state.day}/${this.state.month}/${this.state.year}`;
    }
    let userInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      preferredLanguage: this.state.preferredLanguage,
      preferredCurrency: parseInt(this.state.preferredCurrency, 10),
      gender: this.state.gender,
      country: parseInt(this.state.country, 10),
      city: parseInt(this.state.city, 10),
      birthday: birthday,
      locAddress: this.state.locAddress,
      jsonFile: this.state.jsonFile
    };

    Object.keys(userInfo).forEach((key) => (userInfo[key] === null || userInfo[key] === '') && delete userInfo[key]);

    updateUserInfo(userInfo, captchaToken).then((res) => {
      if (res.success) {
        NotificationManager.success('Successfully updated your profile', 'Update user profile');
        this.componentDidMount();
      }
      else {
        NotificationManager.error('Error!', 'Update user profile');
      }
    });
  }

  updateCountry(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
      this.updateCities();
    });
  }

  updateCities() {
    getCities(this.state.country).then(data => {
      this.setState({
        city: '1',
        cities: data.content,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <div className="loader"></div>;
    }

    let years = [];

    for (let i = (new Date()).getFullYear(); i >= 1940; i--) {
      years.push(<option key={i} value={i}>{i}</option>);
    }

    return (
      <div id="profile-edit-form">
        <h2>Edit Profile</h2>
        <hr />
        <form onSubmit={(e) => { e.preventDefault(); this.captcha.execute(); }}>
          <div className="name">
            <div className="first">
              <label htmlFor="fname">First name</label>
              <input id="fname" name="firstName" value={this.state.firstName} onChange={this.onChange} type="text" required />
            </div>
            <div className="last">
              <label htmlFor="lname">Last name</label>
              <input id="lname" name="lastName" value={this.state.lastName} onChange={this.onChange} type="text" required />
            </div>
            <br className="clear-both" />
          </div>
          <div className="text"><span>Your public profile only shows your first name.<br />When you request a booking, your host will see your first and last name.</span></div>
          <div className="birth-sex">
            <div className="bmonth">
              <label htmlFor="bmonth">Birthdate <img src={Config.getValue('basePath') + 'images/icon-lock.png'} className="lock" alt="lock-o" /></label>
              <select name="month" id="bmonth" onChange={this.onChange} value={this.state.month}>
                <option disabled value="">Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div className="bday">
              <label htmlFor="bday">&nbsp;</label>
              <select name="day" id="bday" onChange={this.onChange} value={this.state.day}>
                <option disabled value="">Day</option>
                {Array.apply(null, Array(32)).map(function (item, i) {
                  return i > 0 && <option key={i} value={i}>{i}</option>;
                })}
              </select>
            </div>
            <div className="byear">
              <label htmlFor="byear">&nbsp;</label>
              <select name="year" id="byear" onChange={this.onChange} value={this.state.year}>
                <option disabled value="">Year</option>
                {years}
              </select>
            </div>
            <div className="sex">
              <label htmlFor="sex">Gender <img src={Config.getValue('basePath') + 'images/icon-lock.png'} className="lock" alt="lock-o" /></label>
              <select name="gender" id="sex" onChange={this.onChange} value={this.state.gender}>
                <option disabled value="">Gender</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="other">Other</option>
              </select>
            </div>
            <br className="clear-both" />
          </div>
          <div className="text"><span>We user this data for analysis and never share it with other users.</span></div>
          <div className="phone">
            <label htmlFor="phone">Phone number <img src={Config.getValue('basePath') + 'images/icon-lock.png'} className="lock" alt="lock-o" /></label>
            <input id="phone" name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange} type="text" />
          </div>
          <div className="text"><span>We won&#39;t share your phone number with other LockTrip users.</span></div>

          <div className="loc-address">
            <label htmlFor="loc-address">ETH/LOC address <img src={Config.getValue('basePath') + 'images/icon-lock.png'} className="lock" alt="lock-o" /></label>
            <input className="form-control form-control-disabled" id="loc-address" name="locAddress" value={this.state.locAddress} onChange={this.onChange} type="text" disabled="disabled" />
          </div>

          <div className="language-currency">
            <div className="language">
              <label htmlFor="language">Preferred language</label>
              <select name="preferredLanguage" id="language" onChange={this.onChange} value={this.state.preferredLanguage}>
                <option value="1">English</option>
              </select>
            </div>
            <div className="currency">
              <label htmlFor="currency">Preferred currency</label>
              <select name="preferredCurrency" id="currency" onChange={this.onChange} value={this.state.preferredCurrency}>
                <option disabled value="">Currency</option>
                {this.state.currencies.map((item, i) => {
                  return <option key={i} value={item.id}>{item.code}</option>;
                })}
              </select>
            </div>
            <br className="clear-both" />
          </div>
          <div className="address language-currency">
            <label htmlFor="address">Where you live</label>
            <div className="language">
              <select name="country" id="address" onChange={this.updateCountry} value={this.state.country}>
                <option disabled value="">Country</option>
                {this.state.countries.map((item, i) => {
                  return <option key={i} value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>
            <div className="language">
              <select name="city" onChange={this.onChange} value={this.state.city}>
                <option disabled value="">City</option>
                {this.state.cities.map((item, i) => {
                  return <option key={i} value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>
            <br className="clear-both" />
          </div>

          <ReCAPTCHA
            ref={el => this.captcha = el}
            size="invisible"
            sitekey={Config.getValue('recaptchaKey')}
            onChange={token => { this.updateUser(token); this.captcha.reset(); }}
          />

          <button type="submit" className="btn">Save</button>
        </form>
      </div>
    );
  }
}