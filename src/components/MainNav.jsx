import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Modal, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';

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

    openSignUp(e) {
        e.preventDefault();
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

    openLogIn(e) {
        e.preventDefault();
        this.setState({ showLoginModal: true })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    register(captchaToken) {

        let user = {
            email: this.state.signUpEmail,
            firstName: this.state.signUpFirstName,
            lastName: this.state.signUpLastName,
            password: this.state.signUpPassword
        }

        register(JSON.stringify(user), captchaToken).then((res) => {
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

    login(captchaToken) {
        let user = {
            email: this.state.loginEmail,
            password: this.state.loginPassword
        }

        login(JSON.stringify(user), captchaToken).then((res) => {
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

    logout(e) {
        e.preventDefault();

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
                        <form onSubmit={(e) => { e.preventDefault(); this.captcha.execute() }}>
                            <div className="form-group">
                                <img src={Config.getValue("basePath") + "images/login-mail.png"} alt="mail" />
                                <input type="email" name="loginEmail" value={this.state.loginEmail} onChange={this.onChange} className="form-control" placeholder="Email address" />
                            </div>
                            <div className="form-group">
                                <img src={Config.getValue("basePath") + "images/login-pass.png"} alt="pass" />
                                <input type="password" name="loginPassword" value={this.state.loginPassword} onChange={this.onChange} className="form-control" placeholder="Password" />
                            </div>
                            <div className="checkbox login-checkbox pull-left">
                                <label><input type="checkbox" value="" id="login-remember" />Remember me</label>
                            </div>

                            <ReCAPTCHA
                                ref={el => this.captcha = el}
                                size="invisible"
                                sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                                onChange={token => this.login(token)}
                            />

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
                        <form onSubmit={(e) => { e.preventDefault(); this.captcha.execute() }}>
                            <div className="form-group">
                                <img src={Config.getValue("basePath") + "images/login-mail.png"} alt="email" />
                                <input type="email" name="signUpEmail" value={this.state.signUpEmail} onChange={this.onChange} className="form-control" placeholder="Email address" />
                            </div>
                            <div className="form-group">
                                <img src={Config.getValue("basePath") + "images/login-user.png"} alt="user" />
                                <input type="text" name="signUpFirstName" value={this.state.signUpFirstName} onChange={this.onChange} className="form-control" placeholder="First Name" />
                            </div>
                            <div className="form-group">
                                <img src={Config.getValue("basePath") + "images/login-user.png"} alt="user" />
                                <input type="text" name="signUpLastName" value={this.state.signUpLastName} onChange={this.onChange} className="form-control" placeholder="Last Name" />
                            </div>
                            <div className="form-group">
                                <img src={Config.getValue("basePath") + "images/login-pass.png"} alt="pass" />
                                <input type="password" name="signUpPassword" value={this.state.signUpPassword} onChange={this.onChange} className="form-control" placeholder="Password" />
                            </div>

                            <ReCAPTCHA
                                ref={el => this.captcha = el}
                                size="invisible"
                                sitekey="6LdCpD4UAAAAAPzGUG9u2jDWziQUSSUWRXxJF0PR"
                                onChange={token => this.register(token)}
                            />

                            <button type="submit" className="btn btn-primary">Sign up</button>
                            <div className="clearfix"></div>
                        </form>

                        <div className="signup-rights">
                            <p>By creating an account, you're agreeing with our Terms and Conditions and Privacy Statement.</p>
                        </div>
                    </Modal.Body>
                </Modal>

                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link className="navbar-brand" to="/">
                                <img src={Config.getValue("basePath") + "images/logo.png"} alt='logo' />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        {localStorage[".auth.lockchain"] ?
                            <Nav>
                                <NavItem componentClass={Link} href="/profile/reservations" to="/profile/reservations">Hosting</NavItem>
                                <NavItem componentClass={Link} href="/profile/trips" to="/profile/trips">Traveling</NavItem>
                                <NavDropdown title={localStorage[".auth.username"]} id="main-nav-dropdown">
                                    <MenuItem componentClass={Link} className="header" href="/profile/dashboard" to="/profile/dashboard">View Profile<img src={Config.getValue("basePath") + "images/icon-dropdown/icon-user.png"} alt="view profile" /></MenuItem>
                                    <MenuItem componentClass={Link} href="/profile/me/edit" to="/profile/me/edit">Edit Profile</MenuItem>
                                    <MenuItem componentClass={Link} href="/profile/dashboard/#profile-dashboard-reviews" to="/profile/dashboard/#profile-dashboard-reviews">Reviews</MenuItem>
                                    <MenuItem componentClass={Link} className="header" href="/" to="/" onClick={this.logout}>Logout<img src={Config.getValue("basePath") + "images/icon-dropdown/icon-logout.png"} style={{ top: 25 + 'px' }} alt="logout" /></MenuItem>
                                </NavDropdown>
                            </Nav> :
                            <Nav pullRight>
                                <NavItem componentClass={Link} href="/login" to="/login" onClick={this.openLogIn}>Login</NavItem>
                                <NavItem componentClass={Link} href="/signup" to="/signup" onClick={this.openSignUp}>Register</NavItem>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(MainNav);