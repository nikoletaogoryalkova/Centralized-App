import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator';
import { MenuItem, Nav, NavDropdown, NavItem, Navbar } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { getCountOfUnreadMessages, login, register, getCurrentLoggedInUserInfo, getEmailFreeResponse } from '../../requester';
import { setIsLogged, setUserInfo } from '../../actions/userInfo';
import { openModal, closeModal } from '../../actions/modalsInfo';
import { modals } from '../../constants/constants.js';

import ChangePasswordModal from './modals/ChangePasswordModal';
import { Config } from '../../config';
import EnterRecoveryTokenModal from './modals/EnterRecoveryTokenModal';
import PropTypes from 'prop-types';
import React from 'react';
import SendRecoveryEmailModal from './modals/SendRecoveryEmailModal';

import CreateWalletModal from './modals/CreateWalletModal';
import SaveWalletModal from './modals/SaveWalletModal';
import ConfirmWalletModal from './modals/ConfirmWalletModal';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';
import { Wallet } from '../../services/blockchain/wallet.js';

class MainNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSignUpModal: false,
            showLoginModal: false,
            signUpEmail: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpPassword: '',
            signUpLocAddress: '',
            signUpError: null,
            loginEmail: '',
            loginPassword: '',
            loginError: null,
            userName: '',
            userToken: '',
            sendRecoveryEmail: false,
            enterRecoveryToken: false,
            changePassword: false,
            recoveryToken: '',
            unreadMessages: '',
            canProceed: false
        };

        this.onChange = this.onChange.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.setUserInfo = this.setUserInfo.bind(this);
        this.onEmailDone = this.onEmailDone.bind(this);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openWalletInfo = this.openWalletInfo.bind(this);

        this.messageListener = this.messageListener.bind(this);
        this.getCountOfMessages = this.getCountOfMessages.bind(this);
    }

    componentDidMount() {
        // if localStorage data shows that user is logged in, then setIsLogged(true) in Redux
        if (
            localStorage[Config.getValue('domainPrefix') + '.auth.lockchain'] &&
            localStorage[Config.getValue('domainPrefix') + '.auth.username']
        ) this.setUserInfo();

        const search = this.props.location.search;
        const searchParams = search.split('=');
        if (searchParams[0] === '?token') {
            this.setState({
                recoveryToken: searchParams[1],
                enterRecoveryToken: true,
            });
        }


        this.messageListener();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onEmailDone(e) {
        const email = e.target.value;
        getEmailFreeResponse(email).then(res => {
            if(res.exist) {
                NotificationManager.warning('Email already exists!', 'User registration');
                this.setState({canProceed: false});
            } else {
                this.setState({canProceed: true});
            }
        });
    }
 
    register(captchaToken) {
        let user = {
            email: this.state.signUpEmail,
            firstName: this.state.signUpFirstName,
            lastName: this.state.signUpLastName,
            password: this.state.signUpPassword,
            locAddress: localStorage.walletAddress,
            jsonFile: localStorage.walletJson,
            image: Config.getValue('basePath') + 'images/default.png'
        };

        localStorage.walletAddress = '';
        localStorage.walletMnemonic = '';
        localStorage.walletJson = '';

        register(user, captchaToken).then((res) => {
            if (res.success) {
                this.openModal(modals.LOGIN);
                NotificationManager.success('Succesfully created your account.');
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

    login(captchaToken) {
        let user = {
            email: this.state.loginEmail,
            password: this.state.loginPassword
        };

        login(user, captchaToken).then((res) => {
            if (res.success) {
                res.response.json().then((data) => {

                    localStorage[Config.getValue('domainPrefix') + '.auth.lockchain'] = data.Authorization;
                    // TODO Get first name + last name from response included with Authorization token (Backend)

                    localStorage[Config.getValue('domainPrefix') + '.auth.username'] = user.email;
                    getCurrentLoggedInUserInfo().then(info => {
                        this.setState({ userName: user.email, userToken: data.Authorization });
                        if (info.jsonFile != null && info.jsonFile.length > 1) {
                            this.setUserInfo();
        
                            if (this.state.recoveryToken !== '') {
                                this.props.history.push('/');
                            }
        
                            this.closeModal(modals.LOGIN);
                        } else {
                            localStorage.removeItem(Config.getValue('domainPrefix') + '.auth.lockchain');
                            localStorage.removeItem(Config.getValue('domainPrefix') + '.auth.username');
                            this.openModal(modals.CREATE_WALLET);
                            this.closeModal(modals.LOGIN);
                        }
                    });
                    // reflect that the user is logged in, both in Redux and in the local component state
                    
                });
            } else {
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

    openWalletInfo() {
        getEmailFreeResponse(this.state.signUpEmail).then(res => {
            let isEmailFree = false;
            if(res.exist) {
                isEmailFree = false;
            } else {
                isEmailFree = true;
            }

            if (!validator.isEmail(this.state.signUpEmail)) {
                NotificationManager.warning('Invalid email address');
            } else if (!isEmailFree) {
                NotificationManager.warning('Email already exists!', 'User registration');
            } else if (validator.isEmpty(this.state.signUpFirstName)) {
                NotificationManager.warning('Invalid first name. Must not be empty.');
            } else if (validator.isEmpty(this.state.signUpLastName)) {
                NotificationManager.warning('Invalid last name. Must not be empty.');
            } else if (this.state.signUpPassword.length < 6) {
                NotificationManager.warning('Password should be at least 6 symbols');
            } else if (!this.state.signUpPassword.match('^([^\\s]*[a-zA-Z]+.*?[0-9]+[^\\s]*|[^\\s]*[0-9]+.*?[a-zA-Z]+[^\\s]*)$')) {
                NotificationManager.warning('Password must contain both latin letters and digits.');            
            } else {
                this.closeModal(modals.REGISTER); 
                this.openModal(modals.CREATE_WALLET);
            }
        });
        
    }

    async isEmailFree(email) {
        let isFree = false;
        await getEmailFreeResponse(email).then(res => {
            if(res.exist) {
                isFree = true;
            } else {
                isFree = false;
            }
        });

        return isFree;
    }

    setUserInfo() {
        if (localStorage.getItem(Config.getValue('domainPrefix') + '.auth.lockchain')) {
            getCurrentLoggedInUserInfo()
                .then(res => {
                    Wallet.getBalance(res.locAddress).then(x => {
                        const ethBalance = x / (Math.pow(10, 18));
                        Wallet.getTokenBalance(res.locAddress).then(y => {
                            const locBalance = y / (Math.pow(10, 18));
                            const { firstName, lastName, phoneNumber, email, locAddress } = res;
                            this.props.dispatch(setIsLogged(true));
                            this.props.dispatch(setUserInfo(firstName, lastName, phoneNumber, email, locAddress, ethBalance, locBalance));
                        });
                    });
                    
                });
        }
        else {
            this.setState({ loaded: true, loading: false });
        }
    }

    logout(e) {
        e.preventDefault();

        localStorage.removeItem(Config.getValue('domainPrefix') + '.auth.lockchain');
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
        if (localStorage[Config.getValue('domainPrefix') + '.auth.lockchain']) {
            getCountOfUnreadMessages().then(data => {
                this.setState({ unreadMessages: data.count });
            });
        }
    }

    render() {
        return (
            <nav id="main-nav" className="navbar">
                <div style={{ background: 'rgba(255,255,255, 0.8)' }}>
                    <NotificationContainer />
{/* 
                    <Modal show={this.props.modalsInfo.modals.get(modals.REGISTER)} onHide={() => this.closeModal(modals.REGISTER)} className="modal fade myModal">
                        <Modal.Header>
                            <h1>Sign up</h1>
                            <button type="button" className="close" onClick={() => this.closeModal(modals.REGISTER)}>&times;</button>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={(e) => { e.preventDefault(); this.captcha.execute(); }}>
                                <div className="form-group">
                                    <img src={Config.getValue('basePath') + 'images/login-mail.png'} alt="email" />
                                    <input type="email" name="signUpEmail" value={this.state.signUpEmail} onChange={this.onChange} className="form-control" placeholder="Email address" />
                                </div>
                                <div className="form-group">
                                    <img src={Config.getValue('basePath') + 'images/login-user.png'} alt="user" />
                                    <input type="text" required="required" name="signUpFirstName" value={this.state.signUpFirstName} onChange={this.onChange} className="form-control" placeholder="First Name" />
                                </div>
                                <div className="form-group">
                                    <img src={Config.getValue('basePath') + 'images/login-user.png'} alt="user" />
                                    <input type="text" required="required" name="signUpLastName" value={this.state.signUpLastName} onChange={this.onChange} className="form-control" placeholder="Last Name" />
                                </div>
                                <div className="form-group">
                                    <img src={Config.getValue('basePath') + 'images/login-pass.png'} alt="pass" />
                                    <input type="password" required="required" name="signUpPassword" value={this.state.signUpPassword} onChange={this.onChange} className="form-control" placeholder="Password" />
                                </div>

                                <ReCAPTCHA
                                    ref={el => this.captcha = el}
                                    size="invisible"
                                    sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                                    onChange={token => { this.register(token); this.captcha.reset(); }}
                                />

                                <div className="clearfix"></div>
                            </form>
                            <button className="btn btn-primary" onClick={this.openWalletInfo}>Proceed</button>
                            <div className="signup-rights">
                                <p>By creating an account, you are agreeing with our Terms and Conditions and Privacy Statement.</p>
                            </div>
                        </Modal.Body>
                    </Modal> */}

                    <CreateWalletModal setUserInfo={this.setUserInfo} userToken={this.state.userToken} userName={this.state.userName} isActive={this.props.modalsInfo.modals.get(modals.CREATE_WALLET)} openModal={this.openModal} closeModal={this.closeModal} onChange={this.onChange} />
                    <SaveWalletModal setUserInfo={this.setUserInfo} userToken={this.state.userToken} userName={this.state.userName} isActive={this.props.modalsInfo.modals.get(modals.SAVE_WALLET)} openModal={this.openModal} closeModal={this.closeModal} onChange={this.onChange} />
                    <ConfirmWalletModal setUserInfo={this.setUserInfo} userToken={this.state.userToken} userName={this.state.userName} isActive={this.props.modalsInfo.modals.get(modals.CONFIRM_WALLET)} openModal={this.openModal} closeModal={this.closeModal} onChange={this.onChange} register={this.register} />
                    <SendRecoveryEmailModal isActive={this.props.modalsInfo.modals.get(modals.SEND_RECOVERY_EMAIL)} openModal={this.openModal} closeModal={this.closeModal} />
                    <EnterRecoveryTokenModal isActive={this.props.modalsInfo.modals.get(modals.ENTER_RECOVERY_TOKEN)} openModal={this.openModal} closeModal={this.closeModal} onChange={this.onChange} recoveryToken={this.state.recoveryToken} />
                    <ChangePasswordModal isActive={this.props.modalsInfo.modals.get(modals.CHANGE_PASSWORD)} openModal={this.openModal} closeModal={this.closeModal} recoveryToken={this.state.recoveryToken} />
                    <LoginModal isActive={this.props.modalsInfo.modals.get(modals.LOGIN)} openModal={this.openModal} closeModal={this.closeModal} loginEmail={this.state.loginEmail} loginPassword={this.state.loginPassword} onChange={this.onChange} login={this.login} />
                    <RegisterModal isActive={this.props.modalsInfo.modals.get(modals.REGISTER)} openModal={this.openModal} closeModal={this.closeModal} signUpEmail={this.state.signUpEmail} signUpFirstName={this.state.signUpFirstName} signUpLastName={this.state.signUpLastName} signUpPassword={this.state.signUpPassword} openWalletInfo={this.openWalletInfo} onChange={this.onChange} />

                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link className="navbar-brand" to="/">
                                    <img src={Config.getValue('basePath') + 'images/logo.png'} alt='logo' />
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>

                        <Navbar.Collapse>
                            {localStorage[Config.getValue('domainPrefix') + '.auth.lockchain'] ?
                                <Nav>
                                    <NavItem componentClass={Link} href="/profile/reservations" to="/profile/reservations">Hosting</NavItem>
                                    <NavItem componentClass={Link} href="/profile/trips" to="/profile/trips">Traveling</NavItem>
                                    <NavItem componentClass={Link} href="/profile/wallet" to="/profile/wallet">Wallet</NavItem>
                                    <NavItem componentClass={Link} href="/profile/messages" to="/profile/messages">
                                        <div className={(this.state.unreadMessages === 0 ? 'not ' : '') + 'unread-messages-box'}>
                                            {this.state.unreadMessages > 0 && <span className="bold unread" style={{ right: this.state.unreadMessages.toString().split('').length === 2 ? '2px' : '4px' }}>{this.state.unreadMessages}</span>}
                                        </div>
                                    </NavItem>
                                    <NavDropdown title={localStorage[Config.getValue('domainPrefix') + '.auth.username']} id="main-nav-dropdown">
                                        <MenuItem componentClass={Link} className="header" href="/profile/dashboard" to="/profile/dashboard">View Profile<img src={Config.getValue('basePath') + 'images/icon-dropdown/icon-user.png'} alt="view profile" /></MenuItem>
                                        <MenuItem componentClass={Link} href="/profile/me/edit" to="/profile/me/edit">Edit Profile</MenuItem>
                                        <MenuItem componentClass={Link} href="/profile/dashboard/#profile-dashboard-reviews" to="/profile/dashboard/#profile-dashboard-reviews">Reviews</MenuItem>
                                        <MenuItem componentClass={Link} className="header" href="/" to="/" onClick={this.logout}>Logout<img src={Config.getValue('basePath') + 'images/icon-dropdown/icon-logout.png'} style={{ top: 25 + 'px' }} alt="logout" /></MenuItem>
                                    </NavDropdown>
                                </Nav> :
                                <Nav pullRight>
                                    <MenuItem componentClass={Link} to="/login" onClick={() => this.openModal(modals.LOGIN)}>Login</MenuItem>
                                    <MenuItem componentClass={Link} to="/signup" onClick={() => this.openModal(modals.REGISTER)}>Register</MenuItem>
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
    const { userInfo, modalsInfo } = state;
    return {
        userInfo,
        modalsInfo
    }
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