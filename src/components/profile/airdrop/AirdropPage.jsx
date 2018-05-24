import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { checkIfAirdropUserExists, getUserAirdropInfo, verifyUserAirdropInfo } from '../../../requester';
import { connect } from 'react-redux';
import { setIsLogged } from '../../../actions/userInfo';
import { openModal, closeModal } from '../../../actions/modalsInfo';
import { Config } from '../../../config';
import { setAirdropInfo } from '../../../actions/airdropInfo';
import { NotificationManager } from 'react-notifications';

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

  render() {
    if (!this.isUserLogged()) {
      return (<div>You must be logged to view this page</div>);
    }

    return (
      <div>
        <div>
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
