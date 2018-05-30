import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { 
  checkIfAirdropUserExists, 
  getUserAirdropInfo, 
  verifyUserAirdropInfo, 
  saveAirdropSocialProfile,
  verifyUserEmail,
  resendConfirmationEmail
} from '../../../requester';
import { connect } from 'react-redux';
import { setIsLogged } from '../../../actions/userInfo';
import { openModal, closeModal } from '../../../actions/modalsInfo';
import { Config } from '../../../config';
import { setAirdropInfo } from '../../../actions/airdropInfo';
import { NotificationManager } from 'react-notifications';
import NavProfile from '../NavProfile';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NoEntriesMessage from '../common/NoEntriesMessage';

import '../../../styles/css/components/profile/airdrop-page.css';

import {
  LOGIN,
  REGISTER
} from '../../../constants/modals.js';

class AirdropPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserLogged: false,
      isAirdropUser: false,
      didPostUserInfo: false,
      loginEmail: '',
      loginPassword: '',
      token: null,
      userParticipates: false,
      loading: true,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.isUserLogged = this.isUserLogged.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (this.props.location.search && this.props.location.search.indexOf('emailtoken') !== -1) {
      console.log('email token received', this.props.location.search)
      verifyUserEmail(this.props.location.search).then(() => {
        console.log('verifying user email');
        NotificationManager.info('Email verified.');
        if (this.isUserLogged()) {
          getUserAirdropInfo().then(json => {
            console.log('dispatching user info');
            this.dispatchAirdropInfo(json);
          });
        }
      });
    } else if (this.props.location.search && this.props.location.search.indexOf('airdroptoken') !== -1) {
      const token = this.props.location.search.split('=')[1];
      this.handleAirdropUser(token);
    } else if (this.isUserLogged()) {
      getUserAirdropInfo().then(json => {
        this.dispatchAirdropInfo(json);
      });
    } else {
      this.setState({ loading: false });
    }
  }

  componentWillReceiveProps(props) {
    if (props.airdropInfo.participates) {
      this.setState({ userParticipates: true });
    }
  }

  // componentDidUpdate(prevState) {
  //   const { isUserLogged, didPostUserInfo } = this.state;
  //   if (!prevState.isUserLogged && isUserLogged) {
  //     getUserAirdropInfo().then(json => {
  //       this.setState({ userAirdropInfo: json });
  //     });
  //   }
  // }

  openModal(modal, e) {
    if (e) {
      e.preventDefault();
    }

    this.props.dispatch(openModal(modal));
  }

  closeModal(modal, e) {
    if (e) {
      e.preventDefault();
    }

    this.props.dispatch(closeModal(modal));
  }

  isUserLogged() {
    const loggedInUserEmail = localStorage[Config.getValue('domainPrefix') + '.auth.username'];
    const bearerToken = localStorage[Config.getValue('domainPrefix') + '.auth.locktrip'];
    if (loggedInUserEmail && bearerToken) {
      if (!this.state.isUserLogged) {
        this.setState({ isUserLogged: true });
      }

      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem(Config.getValue('domainPrefix') + '.auth.locktrip');
    localStorage.removeItem(Config.getValue('domainPrefix') + '.auth.username');

    // reflect that the user is logged out, both in Redux and in the local component state
    this.props.dispatch(setIsLogged(false));
  }

  handleAppUser() {
    return (
      <div>
        Content for app users
      </div>
    );
  }

  handleAirdropUser(token) {
    checkIfAirdropUserExists(token).then(user => {
      if (user.exists) {
        const airdropEmail = user.email;
        const loggedInUserEmail = localStorage[Config.getValue('domainPrefix') + '.auth.username'];

        if (this.isUserLogged()) {
          if (airdropEmail !== loggedInUserEmail) {
            console.log('wrong user logged')
            this.logout();
            this.openModal(LOGIN);
          } else {
            console.log('user is logged')
            // Post confirmation to backend /airdrop/participate/:token
            getUserAirdropInfo().then(json => {
              if (json.user) {
                console.log('user already participates')
                this.dispatchAirdropInfo(json);
                console.log('user info dispatched')
              } else {
                console.log('user has not participated yet', json)
                verifyUserAirdropInfo(token).then(() => {
                  // then set airdrop info in redux
                  console.log('user moved from temp to main')
                  getUserAirdropInfo().then(json => {
                    this.dispatchAirdropInfo(json);
                    console.log('user info dispatched')
                    NotificationManager.info('Verification email has been sent. Please follow the link to confirm your email.');
                  });
                });
              }
            });
          }
        } else {
          console.log('no user logged')
          this.openModal(LOGIN);
        }
      } else if (!user.exists) {
        // user profile doesn't exist
        console.log('user does not exist')
        this.logout();
        this.openModal(REGISTER);
      } else {
        NotificationManager.warning('Token expired or invalid');
        this.props.location.href = '/airdrop';
      }
    }).catch(e => {
      console.log(e);
      // this.props.history.push('/airdrop');
    });
  }

  dispatchAirdropInfo(info) {
    const email = info.user;
    const facebookProfile = info.facebookProfile;
    const telegramProfile = info.telegramProfile;
    const twitterProfile = info.twitterProfile;
    const redditProfile = info.redditProfile;
    const refLink = info.refLink;
    const participates = info.participates;
    const isVerifyEmail = info.isVerifyEmail;
    this.props.dispatch(setAirdropInfo(email, facebookProfile, telegramProfile, twitterProfile, redditProfile, refLink, participates, isVerifyEmail));
    this.setState({ loading: false });
  }

  handleEdit(media, e) {
    e.preventDefault();
    this.setState({ 
      [media + 'Edit']: true,
      [media + 'Profile']: this.props.airdropInfo[media + 'Profile'] 
    });
  }

  handleEditSubmit(media) {
    this.setState({ [media + 'Edit']: false }, () => {
      const profileName = this.state[media + 'Profile'];
      if (profileName) {
        const profile = { social: profileName };
        saveAirdropSocialProfile(media, profile).then(() => {
          getUserAirdropInfo().then(json => {
            this.dispatchAirdropInfo(json);
          });
        });
        NotificationManager.info('Profile saved.');
      } else {
        NotificationManager.info('Profile cannot be empty.');
      }
    });
  }

  handleResendVerificationEmail(e) {
    e.preventDefault();
    resendConfirmationEmail().then(() => {
      NotificationManager.info('Verification email has been sent.');
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  } 

  render() {
    // if (this.state.loading) {
    //   return <div className="loader"></div>;
    // }

    if (!this.isUserLogged()) {
      return (
        <div className="container">
          <NoEntriesMessage text='Log in or participate in our airdrop campaign.'>
            <a href="#" className="btn" onClick={(e) => this.openModal(LOGIN, e)}>Log in</a>
            <a href="https://locktrip.com/airdrop" className="btn">Participate</a>
          </NoEntriesMessage>
        </div>
      );
    }

    if (!this.props.airdropInfo.participates) {
      return (
        <div>
          <NavProfile />
          <div className="container">
            <NoEntriesMessage text='Participate in our airdrop campaign.'>
              <a href="https://locktrip.com/airdrop" className="btn">Participate</a>
            </NoEntriesMessage>
          </div>
        </div>
      );
    }

    return (
      <div>
        <NavProfile />
        <div className="container">
          <div id="airdrop-main">
            <h4>Personal Dashboard</h4>
            <p>You can view your current status, the number of people you have referred, as well as your unique Referral Link.</p>
            <p>Every Person who completes our airdrop via your unique referral link, will generate $5 for you! <span className="emphasized-text">Make sure you refer as much friends and family as you can!</span></p>

            <div className="balance-info">
              <div className="balance-row">
                <div className="balance-row__label"><span className="emphasized-text">Current Balance</span></div>
                <div className="balance-row__content">$0</div>
              </div>

              <div className="balance-row">
                <div className="balance-row__label"><span className="emphasized-text">Your Referral URL</span></div>
                <div className="balance-row__content"><span className="referral-url">{this.props.airdropInfo.refLink}</span></div>
                <CopyToClipboard text={this.props.airdropInfo.refLink} onCopy={() => { NotificationManager.info('Copied to clipboard.'); }}><button className="referral-url-copy">Copy to Clipboard</button></CopyToClipboard>
              </div>

              {/* <div className="balance-row">
                <div className="balance-row__label"><span className="emphasized-text">Number of Referred People</span></div>
                <div className="balance-row__content">101</div>
              </div> */}
            </div>

            <div className="airdrop-info">
              <div className="airdrop-info__header">Airdrop Program</div>
              <div className="airdrop-info__content">
                <div className="airdrop-row email">
                  <div className="description">
                    {this.props.airdropInfo.isVerifyEmail 
                      ? <div><span className="step-check checked"></span><span className="airdrop-row__heading">Email Signup - Completed</span></div>
                      : <div><span className="step-check unchecked"></span><span className="airdrop-row__heading">Email Signup - Not yet verified. <a href="#" onClick={this.handleResendVerificationEmail}>Resend verification email</a>.</span></div>
                    }
                  </div>
                </div>
                <hr />
                <div className="airdrop-row">
                  <div className="description">
                    <span className="step-check unchecked"></span>
                    <span className="airdrop-row__heading">Telegram Join</span>&nbsp;
                    <span className="icon-arrow-right"></span>&nbsp;
                    {this.props.airdropInfo.telegramProfile
                      ? <span>Social media activity for <span className="profile-name">{this.props.airdropInfo.telegramProfile}</span> is being verified. You can still <a href="#" onClick={(e) => { this.handleEdit('telegram', e); }}>change</a> your profile.</span>
                      : <span>Please click <a href="#" onClick={(e) => { this.handleEdit('telegram', e); }}>here</a> to complete this step and be eligible to claim your tokens.</span>
                    }
                  </div>
                  {this.state.telegramEdit &&
                    <div className="airdrop-profile-edit">
                      <input type="text" placeholder="Telegram Profile" name="telegramProfile" value={this.state.telegramProfile} onChange={this.onChange} />
                      <button className="btn" onClick={() => this.handleEditSubmit('telegram')}>Save</button>
                    </div>
                  }
                </div>
                <div className="airdrop-row">
                  <div className="description">
                    <span className="step-check unchecked"></span>
                    <span className="airdrop-row__heading">Twitter Follow</span>&nbsp;
                    <span className="icon-arrow-right"></span>&nbsp;
                    {this.props.airdropInfo.twitterProfile
                      ? <span>Social media activity for <span className="profile-name">{this.props.airdropInfo.twitterProfile}</span> is being verified. You can still <a href="#" onClick={(e) => { this.handleEdit('twitter', e); }}>change</a> your profile.</span>
                      : <span>Please click <a href="#" onClick={(e) => { this.handleEdit('twitter', e); }}>here</a> to complete this step and be eligible to claim your tokens.</span>
                    }
                  </div>
                  {this.state.twitterEdit &&
                    <div className="airdrop-profile-edit">
                      <input type="text" placeholder="Twitter Profile" name="twitterProfile" value={this.state.twitterProfile} onChange={this.onChange} />
                      <button className="btn" onClick={() => this.handleEditSubmit('twitter')}>Save</button>
                    </div>
                  }
                </div>
                <div className="airdrop-row">
                  <div className="description">
                    <span className="step-check unchecked"></span>
                    <span className="airdrop-row__heading">Twitter Share</span>&nbsp;
                    <span className="icon-arrow-right"></span>&nbsp;
                    {this.props.airdropInfo.twitterProfile
                      ? <span>Social media activity for <span className="profile-name">{this.props.airdropInfo.twitterProfile}</span> is being verified. You can still <a href="#" onClick={(e) => { this.handleEdit('twitter', e); }}>change</a> your profile.</span>
                      : <span>Please click <a href="#" onClick={(e) => { this.handleEdit('twitter', e); }}>here</a> to complete this step and be eligible to claim your tokens.</span>
                    }
                  </div>
                </div>
                <div className="airdrop-row">
                  <div className="description">
                    <span className="step-check unchecked"></span>
                    <span className="airdrop-row__heading">Facebook Like</span>&nbsp;
                    <span className="icon-arrow-right"></span>&nbsp;
                    {this.props.airdropInfo.facebookProfile
                      ? <span>Social media activity for <span className="profile-name">{this.props.airdropInfo.facebookProfile}</span> is being verified. You can still <a href="#" onClick={(e) => { this.handleEdit('facebook', e); }}>change</a> your profile.</span>
                      : <span>Please click <a href="#" onClick={(e) => { this.handleEdit('facebook', e); }}>here</a> to complete this step and be eligible to claim your tokens.</span>
                    }
                  </div>
                  {this.state.facebookEdit &&
                    <div className="airdrop-profile-edit">
                      <input type="text" placeholder="Facebook Profile" name="facebookProfile" value={this.state.facebookProfile} onChange={this.onChange} />
                      <button className="btn" onClick={() => this.handleEditSubmit('facebook')}>Save</button>
                    </div>
                  }
                </div>
                <hr />
                <div className="airdrop-row final">
                  <div className="description">
                    <span className="step-check unchecked"></span><span className="airdrop-row__heading">Final Step</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div>
              Email: {this.props.airdropInfo.email}
            </div>
            <div>
              Facebook: {this.props.airdropInfo.facebookProfile}
            </div>
            <div>
              Twitter: {this.props.airdropInfo.twitterProfile}
            </div>
            <div>
              Reddit: {this.props.airdropInfo.redditProfile}
            </div>
            <div>
              telegram: {this.props.airdropInfo.telegramProfile}
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userInfo, modalsInfo, airdropInfo } = state;
  return {
    userInfo,
    modalsInfo,
    airdropInfo
  };
}

export default withRouter(connect(mapStateToProps)(AirdropPage));
