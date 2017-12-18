import React from 'react';

export default class ProfileEditPage extends React.Component {
    render() {
        return (
            <div id="profile-edit-form">
                <h2>Edit Profile</h2>
                <hr />
                <div className="name">
                    <div className="first">
                        <label for="fname">First name</label>
                        <input id="fname" name="fname" type="text" />
                    </div>
                    <div className="last">
                        <label for="lname">Last name</label>
                        <input id="lname" name="lname" type="text" />
                    </div>
                    <br className="clear-both" />
                </div>
                <div className="text"><span>Your public profile only shows your first name.<br/>When you request a booking, your host will see your first and last name.</span></div>
                <div className="birth-sex">
                    <div className="bmonth">
                        <label for="bmonth">Birthdate <img src="/images/icon-lock.png" className="lock"/></label>
                        <input id="bmonth" name="bmonth" type="text" readonly="readonly" value="Month" class="dropdown" />
                    </div>
                    <div className="bday">
                        <label for="bday">&nbsp;</label>
                        <input id="bday" name="bday" type="text" readonly="readonly" value="Day" class="dropdown" />
                    </div>
                    <div className="byear">
                        <label for="byear">&nbsp;</label>
                        <input id="byear" name="byear" type="text" readonly="readonly" value="Year" class="dropdown" />
                    </div>
                    <div className="sex">
                        <label for="sex">Gender <img src="/images/icon-lock.png" className="lock"/></label>
                        <input id="sex" name="sex" type="text" readonly="readonly" value="Gender" class="dropdown" />
                    </div>
                    <br className="clear-both" />
                </div>
                <div className="text"><span>We user this data for analysis and never share it with other users.</span></div>
                <div className="phone">
                    <label for="phone">Email address <img src="/images/icon-lock.png" className="lock"/></label>
                    <input id="phone" name="phone" type="text" />
                </div>
                <div className="text"><span>We won't share your private email address with other LockChain users.</span></div>
                <div className="phone">
                    <label for="phone">Phone number <img src="/images/icon-lock.png" className="lock"/></label>
                    <input id="phone" name="phone" type="text" />
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
                    <input id="address" name="address" type="text" placeholder="eg. Rome, Italy / Manhattan, NY / Seattle, WA" />
                </div>
                <input type="button" class="button" value="Save" class="save" />
            </div>
        );
    }
}