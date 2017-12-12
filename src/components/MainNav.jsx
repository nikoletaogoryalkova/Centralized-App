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
    }

    closeSignUp() {
        this.setState({ showSignUpModal: false });
    }

    openSignUp() {
        this.setState({ showSignUpModal: true });
    }

    closeLogIn() {
        this.setState({ showLoginModal: false });
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
                localStorage[".auth.lockchain"] = 'asdasdasdasd';
                localStorage[".auth.username"] = 'Pesho';
                this.setState({
                    showSignUpModal: false,
                    signUpEmail: '',
                    signUpFirstName: '',
                    signUpLastName: '',
                    signUpPassword: '',
                    userName: 'Pesho'
                })
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
            console.log(res);
            // let responseJson = res.json();
            // if (res.status === 200) {
            //     responseJson.then((data) => {
            //         localStorage[".auth.lockchain"] = data.Authorization;
            //         localStorage[".auth.username"] = user.email;
            //         console.log(data);
            //     })
            // }
            // else {
            //     responseJson.then((data) => {
            //         this.setState({ loginError: data.message });
            //     })
            // }
        })
    }

    render() {
        return (
            <div>
                <Modal id="myModal_login" show={this.state.showLoginModal} onHide={this.closeLogIn} className="modal fade">
                    <Modal.Header>
                        <h1>Login</h1>
                        <button type="button" className="close" onClick={this.closeLogIn}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.loginError !== null ? <div class="error">{this.state.loginError}</div> : ''}
                        <form onSubmit={this.login}>
                            <div className="form-group">
                                <input type="mail" name="loginEmail" value={this.state.loginEmail} onChange={this.onChange} className="form-control" id="login-mail" placeholder="Email address" />
                            </div>
                            <div className="form-group">
                                <input type="password" name="loginPassword" value={this.state.loginPassword} onChange={this.onChange} className="form-control" id="login-password" placeholder="Password" />
                            </div>
                            <div className="checkbox login-checkbox pull-left">
                                <label><input type="checkbox" value="" id="login-remember" />Remember me</label>
                            </div>

                            <button type="submit" className="btn btn-primary">Login</button>
                            <div className="clearfix"></div>
                        </form>

                        <hr />
                        <div className="login-sign">Don’t have an account? <a href="#" onClick={(e) => { this.closeLogIn(e); this.openSignUp(e) }}>Sign up</a></div>
                    </Modal.Body>
                </Modal>

                <Modal id="myModal_signup" show={this.state.showSignUpModal} onHide={this.closeSignUp} className="modal fade">
                    <Modal.Header>
                        <h1>Sign up</h1>
                        <button type="button" className="close" onClick={this.closeSignUp}>&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.signUpError !== null ? <div class="error">{this.state.signUpError}</div> : ''}
                        <form onSubmit={this.register}>
                            <div className="form-group">
                                <input type="mail" name="signUpEmail" value={this.state.signUpEmail} onChange={this.onChange} className="form-control" id="signup-mail" placeholder="Email address" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="signUpFirstName" value={this.state.signUpFirstName} onChange={this.onChange} className="form-control" id="signup-lastname" placeholder="First Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="signUpLastName" value={this.state.signUpLastName} onChange={this.onChange} className="form-control" id="signup-lastname" placeholder="Last Name" />
                            </div>
                            <div className="form-group">
                                <input type="password" name="signUpPassword" value={this.state.signUpPassword} onChange={this.onChange} className="form-control" id="signup-password" placeholder="Password" />
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
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/"><img src={Config.getValue("basePath") + (this.props.location.pathname === "/" ? "images/logo-w.png" : "images/logo.png")} alt='logo' /></Link>
                    </div>

                    <div className="collapse navbar-collapse pull-right" id="bs-example-navbar-collapse-1">

                        {localStorage[".auth.lockchain"] ?
                            <ul className="nav navbar-nav session-nav" id="top-nav">
                                <li className="session-nav-hosting session-nav-simple"><span>Hosting</span></li>
                                <li className="session-nav-traveling session-nav-simple"><span>Traveling</span></li>
                                <li className="session-nav-help session-nav-simple"><span>Help</span></li>
                                <li className="session-nav-inbox"><span><img src="/images/mail-notification.png" /></span></li>
                                <li className="session-nav-user"><span><span className="session-nav-user-thumb"></span>{localStorage[".auth.username"]}</span></li>
                            </ul> :
                            <ul className="nav navbar-nav" id="top-nav">
                                <li className="first-nav-button"><a href="#"><i className="icon icon-home"></i>List Your Property</a></li>
                                <li><a href="#" onClick={this.openLogIn}>Login</a></li>
                                <li><a href="#" onClick={this.openSignUp}>Register</a></li>
                            </ul>
                        }
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(MainNav);