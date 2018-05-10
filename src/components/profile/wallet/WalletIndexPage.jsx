import React from 'react';

import 'react-notifications/lib/notifications.css';

import { NotificationManager } from 'react-notifications';
import { getUserInfo, getCurrentlyLoggedUserJsonFile } from '../../../requester';

import { Config } from '../../../config';
import { TokenTransactions } from '../../../services/blockchain/tokenTransactions';

export default class WalletIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonFile: null,
      locAddress: null,
      canProceed: false,
      recipientAddress: '',
      locAmount: 0,
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.sendTokens = this.sendTokens.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState({ canProceed: this.state.locAddress !== null && this.state.password !== '' && this.state.recipientAddress !== '' && this.state.locAmount > 0 });
    });
  }

  sendTokens() {
    // console.log('amount : ' + this.state.locAmount * Math.pow(10, 18));
    NotificationManager.info('We are processing your transaction through the ethereum network. It might freeze your screen for about 10 seconds...', 'Transactions');
    setTimeout(() => {
      TokenTransactions.sendTokens(
        this.state.jsonFile,
        this.state.password,
        this.state.recipientAddress,
        (this.state.locAmount * Math.pow(10, 18)).toString()
      ).then(() => {
        NotificationManager.success('Transaction made successfully', 'Send Tokens');
        this.setState({
          recipientAddress: '',
          locAmount: 0,
          password: ''
        });
        // console.log(x); 
      }).catch(x => {
        if (x.hasOwnProperty('message')) {
          NotificationManager.warning(x.message, 'Send Tokens');
        } else if (x.hasOwnProperty('err') && x.err.hasOwnProperty('message')) {
          NotificationManager.warning(x.err.message, 'Send Tokens');
        } else if (typeof x === 'string') {
          NotificationManager.warning(x, 'Send Tokens');
        } else {
          console.log(x);
        }
      });
    }, 1000);
  }

  componentDidMount() {
    getUserInfo().then(info => {
      this.setState({ locAddress: info.locAddress }, () => {
        getCurrentlyLoggedUserJsonFile().then(res => {
          this.setState({ jsonFile: res.jsonFile });
        });
      });
    });
  }

  render() {
    if (!this.state.locAddress) {
      return <div className="loader"></div>;
    }
    const etherscanUrl = `https://etherscan.io/address/${this.state.locAddress}#tokentxns`;
    return (
      <div>
        <section id="wallet-index">
          <div className="container">
            <div className="row">
              <div className="after-header" />
              <div className="col-md-11">
                <div id="profile-edit-form">
                  <h2>Withdraw LOC</h2>
                  <hr />
                  <form onSubmit={(e) => { e.preventDefault(); this.sendTokens(); }}>
                    <div className="loc-address">
                      <label htmlFor="loc-address">Your ETH/LOC address <img src={Config.getValue('basePath') + 'images/icon-lock.png'} className="lock" alt="lock-o" /></label>
                      <input className="form-control form-control-disabled" id="loc-address" name="locAddress" onChange={this.onChange} value={this.state.locAddress} type="text" disabled="disabled" />
                    </div>
                    <div className="loc-address">
                      <label htmlFor="recipient-loc-address">Recipient ETH/LOC address</label>
                      <input className="form-control" id="recipient-loc-address" name="recipientAddress" onChange={this.onChange} value={this.state.recipientAddress} type="text" placeholder="Valid ERC-20 compliant wallet address" />
                    </div>
                    <div className="name">
                      <label htmlFor="loc-amount">LOC Amount</label>
                      <input className="form-control" id="loc-amount" name="locAmount" onChange={this.onChange} type="number" value={this.state.locAmount} placeholder="0.000" />
                    </div>
                    <div className="name">
                      <label htmlFor="password">Your wallet password</label>
                      <input className="form-control" id="password" name="password" onChange={this.onChange} type="password" value={this.state.password} placeholder="The password is needed to unlock your wallet for a single transaction" />
                    </div>
                    {this.state.canProceed ? <button className="btn btn-primary" type="submit">Send Tokens</button> : <button className="btn btn-primary" disabled="disabled">Send Tokens</button>}
                    &nbsp; &nbsp;
                                        <span><a href={etherscanUrl} target="_blank"><u>Check your transactions</u></a></span>
                  </form>
                </div>
              </div>
              <div className="before-footer clear-both" />
            </div>
          </div>
        </section>
      </div>
    );
  }
}