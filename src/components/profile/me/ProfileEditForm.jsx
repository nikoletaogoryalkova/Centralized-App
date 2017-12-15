import React from 'react';

import { NavDropdown, MenuItem } from 'react-bootstrap';

export default class ProfileEditPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            preferredLanguage: '',
            preferredCurrency: '',
            month: 'Month',
            day: 'Day',
            year: 'Year',
            gender: 'Gender'
        }

        this.onChange = this.onChange.bind(this);
        this.changeDropdownValue = this.changeDropdownValue.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    changeDropdownValue(a, event) {
        let stateKey = event.target.parentElement.parentElement.getAttribute('aria-labelledby');
        this.setState({[stateKey]: event.target.innerText});
    }

    render() {
        let years = [];

        for(let i = 1940; i <= 1999; i++) {
            years.push(<MenuItem>{i}</MenuItem>)
        }

        return (
            <div id="profile-edit-form">
                <h2>Edit Profile</h2>
                <hr />
                <div className="name">
                    <div className="first">
                        <label for="fname">First name</label>
                        <input id="fname" name="firstName" value={this.state.firstName} onChange={this.onChange} type="text" />
                    </div>
                    <div className="last">
                        <label for="lname">Last name</label>
                        <input id="lname" name="lastName" value={this.state.lastName} onChange={this.onChange} type="text" />
                    </div>
                    <br className="clear-both" />
                </div>
                <div className="text"><span>Your public profile only shows your first name.<br />When you request a booking, your host will see your first and last name.</span></div>
                <div className="birth-sex">
                    <div className="bmonth">
                        <label for="bmonth">Birthdate <img src="/images/icon-lock.png" className="lock" /></label>
                        <NavDropdown title={this.state.month} onSelect={this.changeDropdownValue} id="month">
                            <MenuItem>January</MenuItem>
                            <MenuItem>February</MenuItem>
                            <MenuItem>March</MenuItem>
                            <MenuItem>April</MenuItem>
                            <MenuItem>May</MenuItem>
                            <MenuItem>June</MenuItem>
                            <MenuItem>July</MenuItem>
                            <MenuItem>August</MenuItem>
                            <MenuItem>September</MenuItem>
                            <MenuItem>October</MenuItem>
                            <MenuItem>November</MenuItem>
                            <MenuItem>December</MenuItem>
                        </NavDropdown>
                    </div>
                    <div className="bday">
                        <label for="bday">&nbsp;</label>
                        <NavDropdown title={this.state.day} onSelect={this.changeDropdownValue} id="day">
                            {Array.apply(null, Array(31)).map(function (item, i) {
                                return <MenuItem>{i}</MenuItem>
                            })}
                        </NavDropdown>
                    </div>
                    <div className="byear">
                        <label for="byear">&nbsp;</label>
                        <NavDropdown title={this.state.year} onSelect={this.changeDropdownValue} id="year">
                            {years}
                        </NavDropdown>
                    </div>
                    <div className="sex">
                        <label for="sex">Gender <img src="/images/icon-lock.png" className="lock" /></label>
                        <NavDropdown title={this.state.gender} onSelect={this.changeDropdownValue} id="gender">
                            <MenuItem>Men</MenuItem>
                            <MenuItem>Women</MenuItem>
                            <MenuItem>Other</MenuItem>
                        </NavDropdown> 
                    </div>
                    <br className="clear-both" />
                </div>
                <div className="text"><span>We user this data for analysis and never share it with other users.</span></div>
                <div className="phone">
                    <label for="phone">Email address <img src="/images/icon-lock.png" className="lock" /></label>
                    <input id="phone" name="email" type="text" value={this.state.email} onChange={this.onChange} />
                </div>
                <div className="text"><span>We won't share your private email address with other LockChain users.</span></div>
                <div className="phone">
                    <label for="phone">Phone number <img src="/images/icon-lock.png" className="lock" /></label>
                    <input id="phone" name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange} type="text" />
                </div>
                <div className="text"><span>We won't share your phone number with other LockChain users.</span></div>

                <div className="language-currency">
                    <div className="language">
                        <label for="language">Preferred language</label>
                        <input id="language" name="language" type="text" readonly="readonly" value="English" class="dropdown" />
                    </div>
                    <div className="currency">
                        <label for="lname">Preferred currency</label>
                        <input id="lname" name="lname" type="text" readonly="readonly" value="Bulgarian Lev" class="dropdown" />
                    </div>
                    <br className="clear-both" />
                </div>
                <div className="address">
                    <label for="address">Where you live</label>
                    <input id="address" name="address" type="text" />
                </div>
                <input type="button" class="button" value="Save" class="save" />
            </div>
        );
    }
}