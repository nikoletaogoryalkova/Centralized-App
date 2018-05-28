import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { checkIfAirdropUserExists, getUserAirdropInfo, verifyUserAirdropInfo } from '../../../requester';
import { connect } from 'react-redux';
import { setIsLogged } from '../../../actions/userInfo';
import { openModal, closeModal } from '../../../actions/modalsInfo';
import { Config } from '../../../config';
import { setAirdropInfo } from '../../../actions/airdropInfo';
import { NotificationManager } from 'react-notifications';
import NavProfile from '../NavProfile';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
      token: null
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.isUserLogged = this.isUserLogged.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.location.search) {
      const token = this.props.location.search.split('=')[1];
      this.handleAirdropUser(token);
    } else if (this.isUserLogged()) {
      getUserAirdropInfo().then(json => {
        this.dispatchAirdropInfo(json);
      });
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
    this.props.dispatch(setAirdropInfo(email, facebookProfile, telegramProfile, twitterProfile, redditProfile));
  }

  handleEdit(media, e) {
    e.preventDefault();
    this.setState({ [media + 'Edit']: true });
  }

  handleEditSubmit(media) {
    this.setState({ [media + 'Edit']: false });
  }

  render() {
    if (!this.isUserLogged()) {
      return (<div>You must be logged to view this page</div>);
    }

    return (
      <div>
        <NavProfile />
        <div className="container">
          <div id="airdrop-main">
            <h4>Personal Dashboard</h4>
            <p>You can view your current status, the number of people you have referred, as well as your unique Referral Link.</p>
            <p>Every Person who joins our airdrop via your unique referral link, will generate $5 for you! <span className="emphasized-text">Make sure you refer as much friends and family as you can!</span></p>

            <div className="balance-info">
              <div className="balance-row">
                <div className="balance-row__label"><span className="emphasized-text">Current Balance</span></div>
                <div className="balance-row__content">$515</div>
              </div>

              <div className="balance-row">
                <div className="balance-row__label"><span className="emphasized-text">Your Referral URL</span></div>
                <div className="balance-row__content"><span className="referral-url">https://locktrip.com/airdrop/562418</span></div>
                <CopyToClipboard text={'fasdf'} onCopy={() => { NotificationManager.info('Copied to clipboard'); }}><button className="referral-url-copy">Copy to Clipboard</button></CopyToClipboard>
              </div>

              <div className="balance-row">
                <div className="balance-row__label"><span className="emphasized-text">Number of Referred People</span></div>
                <div className="balance-row__content">101</div>
              </div>
            </div>

            <div className="airdrop-info">
              <div className="airdrop-info__header">Airdrop Program</div>
              <div className="airdrop-info__content">
                <div className="airdrop-row email">
                  <div className="description">
                    <span className="step-check checked"></span><span className="airdrop-row__heading">Email Signup - Completed</span>
                  </div>
                </div>
                <hr />
                <div className="airdrop-row">
                  <div className="description">
                    <span className="step-check checked"></span>
                    <span className="airdrop-row__heading">Telegram Join</span>&nbsp;
                    <span className="icon-arrow-right"></span> Please click <a href="#" onClick={(e) => { this.handleEdit('telegram', e); }}>here</a> to complete this step to be eligible to claim your tokens.
                  </div>
                  {this.state.telegramEdit &&
                    <div className="airdrop-profile-edit">
                      <input type="text" placeholder="Telegram Profile" />
                      <button className="btn" onClick={() => this.handleEditSubmit('telegram')}>Submit</button>
                    </div>
                  }
                </div>
                <div className="airdrop-row">
                  <div className="description">
                    <span className="step-check checked"></span><span className="airdrop-row__heading">Twitter Follow</span> <span className="icon-arrow-right"></span> Please click <a href="#">here</a> to complete this step to be eligible to claim your tokens.
                  </div>
                  <div className="airdrop-profile-edit">
                    <input type="text" placeholder="Twitter Profile" />
                    <button className="btn">Submit</button>
                  </div>
                </div>
                <div className="airdrop-row">
                  <div className="description">
                    <span className="step-check unchecked"></span><span className="airdrop-row__heading">Twitter Share</span> <span className="icon-arrow-right"></span> Please click <a href="#">here</a> to complete this step to be eligible to claim your tokens.
                  </div>
                </div>
                <div className="airdrop-row">
                  <div className="description">
                    <span className="step-check unchecked"></span><span className="airdrop-row__heading">Facebook Like</span> <span className="icon-arrow-right"></span> Please click <a href="#">here</a> to complete this step to be eligible to claim your tokens.
                  </div>
                  <div className="airdrop-profile-edit">
                    <input type="text" placeholder="Facebook Profile" />
                    <button className="btn">Submit</button>
                  </div>
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
