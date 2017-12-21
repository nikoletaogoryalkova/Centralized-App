import React from 'react';

import { Config } from '../../../config';
import { getCurrentLoggedInUserInfo, updateUserInfo } from '../../../requester';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
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
            currencies: [],
            cities: [],
            countries: [],
            loading: true
        }


        this.onChange = this.onChange.bind(this);
        this.changeDropdownValue = this.changeDropdownValue.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        getCurrentLoggedInUserInfo().then((data) => {
            let birthday = moment.utc(data.birthday);

            this.setState({
                firstName: data.firstName !== null ? data.firstName : '',
                lastName: data.lastName !== null ? data.lastName : '',
                phoneNumber: data.phoneNumber !== null ? data.phoneNumber : '',
                preferredLanguage: data.preferredLanguage !== null ? data.preferredLanguage : '',
                preferredCurrency: data.preferredCurrency !== null ? data.preferredCurrency.id : '',
                gender: data.gender !== null ? data.gender : '',
                country: data.country !== null ? data.country.id : '',
                city: data.city !== null ? data.city.id : '',
                countries: data.countries,
                currencies: data.currencies,
                day: birthday.add(1, 'days').format('D'),
                month: birthday.format('MM'),
                year: birthday.format('YYYY')
            });
        }).then(() => {
            this.setState({ loading: false });
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    changeDropdownValue(a, event) {
        let stateKey = event.target.parentElement.parentElement.getAttribute('aria-labelledby');
        this.setState({ [stateKey]: event.target.innerText });
    }

    updateUser(e) {
        e.preventDefault();

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
            birthday: birthday
        }

        Object.keys(userInfo).forEach((key) => (userInfo[key] === null || userInfo[key] === '') && delete userInfo[key]);

        updateUserInfo(userInfo).then((res) => {
            if (res.status === 200 || res.status === 202) {
                NotificationManager.success('Successfully updated your profile', 'Update user profile');
                this.componentDidMount();
            }
            else {
                NotificationManager.error('Error!', 'Update user profile')
            }
        })
       
    }

    render() {
        if (this.state.loading) {
            return <div className="loader"></div>;
        }

        let years = [];

        for (let i = (new Date()).getFullYear(); i >= 1940; i--) {
            years.push(<option key={i} value={i}>{i}</option>)
        }

        return (
            <div id="profile-edit-form">
                <h2>Edit Profile</h2>
                <hr />
                <form onSubmit={this.updateUser}>
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
                            <label htmlFor="bmonth">Birthdate <img src={Config.getValue("basePath") + "images/icon-lock.png"} className="lock" alt="lock-o" /></label>
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
                                    if (i > 0)
                                        return <option key={i} value={i}>{i}</option>
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
                            <label htmlFor="sex">Gender <img src={Config.getValue("basePath") + "images/icon-lock.png"} className="lock" alt="lock-o" /></label>
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
                        <label htmlFor="phone">Phone number <img src={Config.getValue("basePath") + "images/icon-lock.png"} className="lock" alt="lock-o" /></label>
                        <input id="phone" name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange} type="text" />
                    </div>
                    <div className="text"><span>We won't share your phone number with other LockChain users.</span></div>

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
                                    return <option key={i} value={item.id}>{item.code}</option>
                                })}
                            </select>
                        </div>
                        <br className="clear-both" />
                    </div>
                    <div className="address language-currency">
                        <label htmlFor="address">Where you live</label>
                        <div className="language">
                            <select name="country" id="address" onChange={this.onChange} value={this.state.country}>
                                <option disabled value="">Country</option>
                                {this.state.countries.map((item, i) => {
                                    return <option key={i} value={item.id}>{item.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="language">
                            <select name="city" onChange={this.onChange} value={this.state.city}>
                                <option disabled value="">City</option>
                                {this.state.countries.some(x => x.id === parseInt(this.state.country, 10)) && this.state.countries.find(x => x.id === parseInt(this.state.country, 10)).cities.map((item, i) => {
                                    return <option key={i} value={item.id}>{item.name}</option>
                                })}
                            </select>
                        </div>
                        <br className="clear-both" />
                    </div>
                    <input type="submit" className="button save" value="Save" />
                </form>
                <NotificationContainer />
            </div>
        );
    }
}