import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import { Config } from '../config';
import { register, login } from '../requester';

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
            signUpError: null,
            loginEmail: '',
            loginPassword: '',
            loginError: null,
            userName: ''
        }

        this.closeSignUp = this.closeSignUp.bind(this);
        this.openSignUp = this.openSignUp.bind(this);
        this.closeLogIn = this.closeLogIn.bind(this);
        this.openLogIn = this.openLogIn.bind(this);
        this.onChange = this.onChange.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    closeSignUp() {
        this.setState({ showSignUpModal: false });
        this.setState({
            showSignUpModal: false,
            signUpEmail: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpPassword: ''
        })
    }

    openSignUp() {
        this.setState({ showSignUpModal: true });
    }

    closeLogIn() {
        this.setState({ showLoginModal: false });

        this.setState({
            showLoginModal: false,
            loginEmail: '',
            loginPassword: '',
            loginError: ''
        })
    }

    openLogIn() {
        this.setState({ showLoginModal: true })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    register(e) {
        e.preventDefault();

        let user = {
            email: this.state.signUpEmail,
            firstName: this.state.signUpFirstName,
            lastName: this.state.signUpLastName,
            password: this.state.signUpPassword
        }

        register(JSON.stringify(user)).then((res) => {
            if (res.status === 200) {
                this.closeSignUp();
                this.openLogIn();
            }
            else {
                let responseJson = res.json();
                responseJson.then((data) => {
                    this.setState({ signUpError: data.message });
                })
            }
        });
    }

    login(e) {
        e.preventDefault();

        let user = {
            email: this.state.loginEmail,
            password: this.state.loginPassword
        }

        login(JSON.stringify(user)).then((res) => {
            let responseJson = res.json();
            if (res.status === 200) {
                responseJson.then((data) => {
                    localStorage[".auth.lockchain"] = data.Authorization;
                    // TODO Get first name + last name from response included with Authorization token (Backend)

                    localStorage[".auth.username"] = user.email;
                    this.setState({ userName: user.email });

                    this.closeLogIn();
                })
            }
            else {
                responseJson.then((data) => {
                    this.setState({ loginError: data.message });
                })
            }
        })
    }

    logout() {
        localStorage.removeItem(".auth.lockchain");
        localStorage.removeItem(".auth.username");

        this.setState({ userName: '' })

        this.props.history.push('/');
    }

    render() {
        return (
            <div style={{ background: 'rgba(255,255,255, 0.8)' }}>
                <Modal show={this.state.showLoginModal} onHide={this.closeLogIn} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Login</h1>
                        <button type="button" className="close" onClick={this.closeLogIn}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.loginError !== null ? <div className="error">{this.state.loginError}</div> : ''}
                        <form onSubmit={this.login}>
                            <div className="form-group">
                                <img src="/images/login-mail.png" alt="mail" />
                                <input type="email" name="loginEmail" value={this.state.loginEmail} onChange={this.onChange} className="form-control" placeholder="Email address" />
                            </div>
                            <div className="form-group">
                                <img src="/images/login-pass.png" alt="pass" />
                                <input type="password" name="loginPassword" value={this.state.loginPassword} onChange={this.onChange} className="form-control" placeholder="Password" />
                            </div>
                            <div className="checkbox login-checkbox pull-left">
                                <label><input type="checkbox" value="" id="login-remember" />Remember me</label>
                            </div>

                            <button type="submit" className="btn btn-primary">Login</button>
                            <div className="clearfix"></div>
                        </form>

                        <hr />
                        <div className="login-sign">Don’t have an account? <a onClick={(e) => { this.closeLogIn(e); this.openSignUp(e) }}>Sign up</a></div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showSignUpModal} onHide={this.closeSignUp} className="modal fade myModal">
                    <Modal.Header>
                        <h1>Sign up</h1>
                        <button type="button" className="close" onClick={this.closeSignUp}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.signUpError !== null ? <div className="error">{this.state.signUpError}</div> : ''}
                        <form onSubmit={this.register}>
                            <div className="form-group">
                                <img src="/images/login-mail.png" alt="email" />
                                <input type="email" name="signUpEmail" value={this.state.signUpEmail} onChange={this.onChange} className="form-control" placeholder="Email address" />
                            </div>
                            <div className="form-group">
                                <img src="/images/login-user.png" alt="user" />
                                <input type="text" name="signUpFirstName" value={this.state.signUpFirstName} onChange={this.onChange} className="form-control" placeholder="First Name" />
                            </div>
                            <div className="form-group">
                                <img src="/images/login-user.png" alt="user" />
                                <input type="text" name="signUpLastName" value={this.state.signUpLastName} onChange={this.onChange} className="form-control" placeholder="Last Name" />
                            </div>
                            <div className="form-group">
                                <img src="/images/login-pass.png" alt="pass" />
                                <input type="password" name="signUpPassword" value={this.state.signUpPassword} onChange={this.onChange} className="form-control" placeholder="Password" />
                            </div>

                            <button type="submit" className="btn btn-primary">Sign up</button>
                            <div className="clearfix"></div>
                        </form>

                        <div className="signup-rights">
                            <p>By creating an account, you're agreeing with our Terms and Conditions and Privacy Statement.</p>
                        </div>
                    </Modal.Body>
                </Modal>

                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">
                            <img src={Config.getValue("basePath") + "images/logo.png"} alt='logo' />
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse pull-right">
                        {localStorage[".auth.lockchain"] ?
                            <ul className="nav navbar-nav session-nav" id="top-nav">
                                {/* <li className="session-nav-hosting session-nav-simple"><span><Link to="/listings/create"><i className="icon icon-home"></i>List Your Property</Link></span></li> */}
                                <li className="session-nav-hosting session-nav-simple"><span><Link to="/profile/reservations">Hosting</Link></span></li>
                                <li className="session-nav-traveling session-nav-simple"><span><Link to="/profile/trips">Traveling</Link></span></li>
                                {/* <li className="session-nav-help session-nav-simple"><span>Help</span></li> */}
                                <li className="session-nav-inbox"><span><img src={Config.getValue("basePath") + "images/mail-notification.png"} alt="mail-notification" /></span></li>
                                <li className="session-nav-user">
                                    <span className="info">
                                        <span className="session-nav-user-thumb"></span>
                                        <Link to="/profile/dashboard">{localStorage[".auth.username"]}</Link>
                                    </span>
                                    <span className="sub">
                                        <ul>
                                            <li className="opal profile"><span className="ico"></span><span><Link to="/profile/dashboard">View Profile</Link></span></li>
                                            <li><span><Link to="/profile/me/edit">Edit Profile</Link></span></li>
                                            <li><span><Link to="/profile/dashboard/#profile-dashboard-reviews">Reviews</Link></span></li>
                                            <li onClick={this.logout} className="opal logout"><span className="ico"></span><span>Logout</span></li>
                                        </ul>
                                    </span>
                                </li>
                            </ul> :
                            <ul className="nav navbar-nav session-nav" id="top-nav">
                                <li onClick={this.openLogIn} className="session-nav-simple"><span><a>Login</a></span></li>
                                <li onClick={this.openSignUp} className="session-nav-simple"><span><a>Register</a></span></li>
                            </ul>
                        }
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(MainNav);