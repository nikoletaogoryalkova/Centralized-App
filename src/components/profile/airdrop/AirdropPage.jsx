import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AirdropPage extends Component {


  componentDidMount() {
    console.log(this.props.match.params.token);
  }


  render() {
    return (
      <div>
        Airdrop Page
      </div>
    );
  }
}

export default withRouter(AirdropPage);