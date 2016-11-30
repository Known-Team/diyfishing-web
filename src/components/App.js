import React, { Component } from 'react';
import { BrowserRouter, Match, Miss, Redirect } from 'react-router';
import base from '../base';

import Header from './Header';
import Home from './Home';
import NotFound from './NotFound';
import PointsofInterest from './PointsofInterest';


class App extends Component {

  state = {
    uid: null,
    userDetail:null,

  };


  componentDidMount(){
  base.onAuth((user) => {
    if (user){
      this.authHandler(null, {user});
    }
  })
}

logout = () => {
    base.unauth();
    this.setState({
      uid:null,
      userDetail:null
    })
  };

  authenticate = (provider) => {
    base.authWithOAuthPopup(provider, this.authHandler);
  };

  authHandler = (err, authData) =>{

    if (err){
      console.error(err);
      return
    }

    this.setState({
        uid: authData.user.uid,
        userDetail: authData.user
    })

  }

  render() {
      return (
        <div>
          <Header dropDownopen={false} logout={this.logout} {...this.state} />
          <BrowserRouter>
            <div>
              <Match exactly pattern="/" render={() => <Home login={this.authenticate} {...this.state} />} />
              <Match pattern="/admin" render={() => <PointsofInterest {...this.state} />} />
              <Miss component={NotFound} />
            </div>
          </BrowserRouter>
        </div>
        );
      }
}

App.contextTypes = {
  history: React.PropTypes.object,
  router: React.PropTypes.object
}

export default App;
