import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MenuItem, Nav, NavDropdown, NavItem, Navbar } from 'react-bootstrap/lib';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import ChangePasswordModal from './modals/ChangePasswordModal';
import EnterRecoveryTokenModal from './modals/EnterRecoveryTokenModal';
import PropTypes from 'prop-types';
import React from 'react';
import SendRecoveryEmailModal from './modals/SendRecoveryEmailModal';
import CreateWalletModal from './modals/CreateWalletModal';
import SaveWalletModal from './modals/SaveWalletModal';
import ConfirmWalletModal from './modals/ConfirmWalletModal';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';

import { Config } from '../../config';
import { Wallet } from '../../services/blockchain/wallet.js';
import { setIsLogged, setUserInfo } from '../../actions/userInfo';
import { openModal, closeModal } from '../../actions/modalsInfo';
import { setAirdropInfo } from '../../actions/airdropInfo';

import {
  getCountOfUnreadMessages,
  postNewPassword,
  postRecoveryEmail,
  login,
  register,
  getUserInfo,
  sendRecoveryToken,
  getUserAirdropInfo,
  verifyUserAirdropInfo,
  checkIfAirdropUserExists
} from '../../requester';

import {
  LOGIN,
  REGISTER,
  CREATE_WALLET,
  SEND_RECOVERY_EMAIL,
  ENTER_RECOVERY_TOKEN,
  CHANGE_PASSWORD,
  SAVE_WALLET,
  CONFIRM_WALLET
} from '../../constants/modals.js';

import { PROFILE_SUCCESSFULLY_CREATED, PASSWORD_SUCCESSFULLY_CHANGED } from '../../constants/successMessages.js';
import {
  PASSWORDS_DONT_MATCH,
  INVALID_PASSWORD,
  INVALID_TOKEN,
  INVALID_EMAIL
} from '../../constants/warningMessages';
import { NOT_FOUND } from '../../constants/errorMessages';


class MainNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpEmail: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpPassword: '',
      signUpLocAddress: '',
      loginEmail: '',
      loginPassword: '',
      walletPassword: '',
      mnemonicWords: '',
      userName: '',
      userToken: '',
      newPassword: '',
      confirmNewPassword: '',
      enterRecoveryToken: false,
      recoveryToken: '',
      recoveryEmail: '',
      unreadMessages: '',
      isUpdatingWallet: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.messageListener = this.messageListener.bind(this);
    this.getCountOfMessages = this.getCountOfMessages.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleMnemonicWordsChange = this.handleMnemonicWordsChange.bind(this);
    this.handleSubmitRecoveryToken = this.handleSubmitRecoveryToken.bind(this);
    this.handleSubmitRecoveryEmail = this.handleSubmitRecoveryEmail.bind(this);
    this.handleConfirmWallet = this.handleConfirmWallet.bind(this);
  }

  componentDidMount() {
    // if localStorage data shows that user is logged in, then setIsLogged(true) in Redux
    if (
      localStorage[Config.getValue('domainPrefix') + '.auth.locktrip'] &&
      localStorage[Config.getValue('domainPrefix') + '.auth.username']
    ) {
      this.setUserInfo();
    }

    const search = this.props.location.search;
    const searchParams = search.split('=');
    if (searchParams[0] === '?token') {
      this.openModal(ENTER_RECOVERY_TOKEN);
      // this.setState({
      //   recoveryToken: searchParams[1],
      //   enterRecoveryToken: true,
      // });
    }


    this.messageListener();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleMnemonicWordsChange(e) {
    const value = e.target.value.replace(/\n/g, '');
    this.setState({ [e.target.name]: value });
  }

  handleRegister(captchaToken) {
    let user = {
      email: this.state.signUpEmail,
      firstName: this.state.signUpFirstName,
      lastName: this.state.signUpLastName,
      password: this.state.signUpPassword,
      locAddress: localStorage.walletAddress,
      jsonFile: localStorage.walletJson,
      image: Config.getValue('basePath') + 'images/default.png'
    };

    this.clearLocalStorage();

    register(user, captchaToken).then((res) => {
      if (res.success) {
        this.openModal(LOGIN);
        NotificationManager.success(PROFILE_SUCCESSFULLY_CREATED);
      }
      else {
        res.response.then(res => {
          const errors = res.errors;
          for (let key in errors) {
            if (typeof errors[key] !== 'function') {
              NotificationManager.warning(errors[key].message, 'Field: ' + key.toUpperCase());
            }
          }
        });
      }
    });
  }

  handleLogin(captchaToken) {
    let user = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    };

    if (this.state.isUpdatingWallet) {
      user.locAddress = localStorage.walletAddress;
      user.jsonFile = localStorage.walletJson;
      this.clearLocalStorage();
      this.setState({ isUpdatingWallet: false });
    }

    login(user, captchaToken).then((res) => {
      if (res.success) {
        res.response.json().then((data) => {
          localStorage[Config.getValue('domainPrefix') + '.auth.locktrip'] = data.Authorization;
          localStorage[Config.getValue('domainPrefix') + '.auth.username'] = user.email;

          this.setUserInfo();
          this.closeModal(LOGIN);

          if (this.props.location.pathname.indexOf('/airdrop') !== -1) {
            this.handleAirdropUser();
          }
        });
      } else {
        res.response.then(res => {
          const errors = res.errors;
          console.log(errors);
          if (errors.hasOwnProperty('JsonFileNull')) {
            NotificationManager.warning(errors['JsonFileNull'].message);
            this.setState({ isUpdatingWallet: true }, () => {
              this.closeModal(LOGIN);
              this.openModal(CREATE_WALLET);
            });
          } else {
            for (let key in errors) {
              if (typeof errors[key] !== 'function') {
                NotificationManager.warning(errors[key].message);
              }
            }
          }
        }).catch(errors => {
          for (var e in errors) {
            NotificationManager.warning(errors[e].message);
          }
        });
      }
    });
  }

  handleAirdropUser() {
    getUserAirdropInfo().then(json => {
      console.log(json)
      if (json.participates) {
        this.dispatchAirdropInfo(json);
      } else {
        console.log('user not yet moved from temp to main')
        const token = this.props.location.search.split('=')[1];
        checkIfAirdropUserExists(token).then(user => {
          const currentEmail = localStorage[Config.getValue('domainPrefix') + '.auth.username'];
          if (user.email === currentEmail && user.exists) {
            console.log('users match')
            verifyUserAirdropInfo(token).then(() => {
              console.log('user moved from temp to main')
              NotificationManager.info('Verification email has been sent. Please follow the link to confirm your email.');
              getUserAirdropInfo().then(json => {
                this.dispatchAirdropInfo(json);
              });
            });
          } else {
            console.log('users dont match', user.email, currentEmail)
          }
        });
      }
    }).catch(e => {
      NotificationManager.warning('No airdrop information about this profile');
      this.props.history.push('/airdrop');
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
    console.log('user info dispatched')
  }

  clearLocalStorage() {
    localStorage['walletAddress'] = '';
    localStorage['walletMnemonic'] = '';
    localStorage['walletJson'] = '';
  }

  setUserInfo() {
    getUserInfo().then(res => {
      Wallet.getBalance(res.locAddress).then(eth => {
        const ethBalance = eth / (Math.pow(10, 18));
        Wallet.getTokenBalance(res.locAddress).then(loc => {
          const locBalance = loc / (Math.pow(10, 18));
          const { firstName, lastName, phoneNumber, email, locAddress } = res;
          this.props.dispatch(setIsLogged(true));
          this.props.dispatch(setUserInfo(firstName, lastName, phoneNumber, email, locAddress, ethBalance, locBalance));
        });
      });
    });
  }

  logout(e) {
    e.preventDefault();

    localStorage.removeItem(Config.getValue('domainPrefix') + '.auth.locktrip');
    localStorage.removeItem(Config.getValue('domainPrefix') + '.auth.username');

    // reflect that the user is logged out, both in Redux and in the local component state
    this.props.dispatch(setIsLogged(false));
    this.setState({ userName: '' });

    this.props.history.push('/');
  }

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

  messageListener() {
    this.getCountOfMessages();

    setInterval(() => {
      this.getCountOfMessages();
    }, 120000);
  }

  getCountOfMessages() {
    if (localStorage[Config.getValue('domainPrefix') + '.auth.locktrip']) {
      getCountOfUnreadMessages().then(data => {
        this.setState({ unreadMessages: data.count });
      });
    }
  }

  handlePasswordChange(token) {
    const password = this.state.newPassword;
    const confirm = this.state.confirmNewPassword;
    if (password !== confirm) {
      NotificationManager.warning(PASSWORDS_DONT_MATCH);
      return;
    }

    if (password.length < 6) {
      NotificationManager.warning(INVALID_PASSWORD);
      return;
    }

    const postObj = {
      token: this.state.recoveryToken,
      password: password,
    };

    postNewPassword(postObj, token).then((res) => {
      if (res.success) {
        this.closeModal(CHANGE_PASSWORD);
        this.openModal(LOGIN);
        NotificationManager.success(PASSWORD_SUCCESSFULLY_CHANGED);
      }
      else {
        NotificationManager.error(NOT_FOUND);
      }
    });
  }

  handleSubmitRecoveryToken() {
    sendRecoveryToken(this.state.recoveryToken).then((res) => {
      if (res.success) {
        this.closeModal(ENTER_RECOVERY_TOKEN);
        this.openModal(CHANGE_PASSWORD);
      }
      else {
        NotificationManager.warning(INVALID_TOKEN);
      }
    });
  }

  handleSubmitRecoveryEmail(token) {
    const email = { email: this.state.recoveryEmail };
    postRecoveryEmail(email, token).then((res) => {
      if (res.success) {
        this.closeModal(SEND_RECOVERY_EMAIL);
        this.openModal(ENTER_RECOVERY_TOKEN);
      }
      else {
        NotificationManager.warning(INVALID_EMAIL);
      }
    });
  }

  handleConfirmWallet(token) {
    if (this.state.isUpdatingWallet) {
      this.handleLogin(token);
    } else {
      this.handleRegister(token);
    }
  }

  render() {
    return (
      <nav id="main-nav" className="navbar">
        <div style={{ background: 'rgba(255,255,255, 0.8)' }}>
          <NotificationContainer />
          <CreateWalletModal setUserInfo={this.setUserInfo} userToken={this.state.userToken} userName={this.state.userName} walletPassword={this.state.walletPassword} isActive={this.props.modalsInfo.modals.get(CREATE_WALLET)} openModal={this.openModal} closeModal={this.closeModal} onChange={this.onChange} />
          <SaveWalletModal setUserInfo={this.setUserInfo} userToken={this.state.userToken} userName={this.state.userName} isActive={this.props.modalsInfo.modals.get(SAVE_WALLET)} openModal={this.openModal} closeModal={this.closeModal} onChange={this.onChange} />
          <ConfirmWalletModal isActive={this.props.modalsInfo.modals.get(CONFIRM_WALLET)} openModal={this.openModal} closeModal={this.closeModal} handleMnemonicWordsChange={this.handleMnemonicWordsChange} mnemonicWords={this.state.mnemonicWords} handleConfirmWallet={this.handleConfirmWallet} />
          <SendRecoveryEmailModal isActive={this.props.modalsInfo.modals.get(SEND_RECOVERY_EMAIL)} openModal={this.openModal} closeModal={this.closeModal} recoveryEmail={this.state.recoveryEmail} handleSubmitRecoveryEmail={this.handleSubmitRecoveryEmail} onChange={this.onChange} />
          <EnterRecoveryTokenModal isActive={this.props.modalsInfo.modals.get(ENTER_RECOVERY_TOKEN)} openModal={this.openModal} closeModal={this.closeModal} onChange={this.onChange} recoveryToken={this.state.recoveryToken} handleSubmitRecoveryToken={this.handleSubmitRecoveryToken} />
          <ChangePasswordModal isActive={this.props.modalsInfo.modals.get(CHANGE_PASSWORD)} openModal={this.openModal} closeModal={this.closeModal} newPassword={this.state.newPassword} confirmNewPassword={this.state.confirmNewPassword} onChange={this.onChange} handlePasswordChange={this.handlePasswordChange} />
          <LoginModal isActive={this.props.modalsInfo.modals.get(LOGIN)} openModal={this.openModal} closeModal={this.closeModal} loginEmail={this.state.loginEmail} loginPassword={this.state.loginPassword} onChange={this.onChange} handleLogin={this.handleLogin} />
          <RegisterModal isActive={this.props.modalsInfo.modals.get(REGISTER)} openModal={this.openModal} closeModal={this.closeModal} signUpEmail={this.state.signUpEmail} signUpFirstName={this.state.signUpFirstName} signUpLastName={this.state.signUpLastName} signUpPassword={this.state.signUpPassword} onChange={this.onChange} />

          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link className="navbar-brand" to="/">
                  <img src={Config.getValue('basePath') + 'images/locktrip_logo.svg'} alt='logo' />
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              {localStorage[Config.getValue('domainPrefix') + '.auth.locktrip']
                ? <Nav>
                  <NavItem componentClass={Link} href="/profile/reservations" to="/profile/reservations">Hosting</NavItem>
                  <NavItem componentClass={Link} href="/profile/trips" to="/profile/trips">Traveling</NavItem>
                  <NavItem componentClass={Link} href="/profile/wallet" to="/profile/wallet">Wallet</NavItem>
                  <NavItem componentClass={Link} href="/profile/messages" to="/profile/messages">
                    <div className={(this.state.unreadMessages === 0 ? 'not ' : '') + 'unread-messages-box'}>
                      {this.state.unreadMessages > 0 && <span className="bold unread" style={{ right: this.state.unreadMessages.toString().split('').length === 2 ? '2px' : '4px' }}>{this.state.unreadMessages}</span>}
                    </div>
                  </NavItem>
                  <NavDropdown title={localStorage[Config.getValue('domainPrefix') + '.auth.username']} id="main-nav-dropdown">
                    <MenuItem componentClass={Link} href="/profile/dashboard" to="/profile/dashboard">Dashboard</MenuItem>
                    <MenuItem componentClass={Link} href="/profile/listings" to="/profile/listings">My Listings</MenuItem>
                    <MenuItem componentClass={Link} href="/profile/trips" to="/profile/trips">My Trips</MenuItem>
                    <MenuItem componentClass={Link} href="/profile/reservations" to="/profile/reservations">My Guests</MenuItem>
                    <MenuItem componentClass={Link} href="/profile/me/edit" to="/profile/me/edit">Profile</MenuItem>
                    <MenuItem componentClass={Link} href="/airdrop" to="/airdrop">Airdrop</MenuItem>
                    <MenuItem componentClass={Link} href="/" to="/" onClick={this.logout}>Logout</MenuItem>
                  </NavDropdown>
                </Nav>
                : <Nav pullRight={true}>
                  <NavItem componentClass={Link} to="/login" onClick={() => this.openModal(LOGIN)}>Login</NavItem>
                  <NavItem componentClass={Link} to="/signup" onClick={() => this.openModal(REGISTER)}>Register</NavItem>
                </Nav>
              }
            </Navbar.Collapse>
          </Navbar>
        </div>
      </nav>
    );
  }
}

export default withRouter(connect(mapStateToProps)(MainNav));

function mapStateToProps(state) {
  const { userInfo, modalsInfo, airdropInfo } = state;
  return {
    userInfo,
    modalsInfo,
    airdropInfo
  };
}

MainNav.propTypes = {
  // start Router props
  location: PropTypes.object,
  history: PropTypes.object,

  // start Redux props
  dispatch: PropTypes.func,
  userInfo: PropTypes.object,
  modalsInfo: PropTypes.object,
};