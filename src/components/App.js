import React, { Component } from 'react';
import { BrowserRouter, Match, Miss, Redirect } from 'react-router';
import base from '../base';

import Header from './Header';
import Home from './Home';
import Search from './Search';
import NotFound from './NotFound';
import Welcome from './Welcome';
import Mentors from '../mentors';
import Db from './Db';


class App extends Component {

  state = {
    uid: null,
    userDetail:null,
    mentors: null
  };

  componentWillMount(){
    this.setState({
         mentors: Mentors
    });
  }


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

    console.log(authData);

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
              <Match exactly pattern="/" component={Welcome} />
              <Match pattern="/home" render={() => <Home login={this.authenticate} {...this.state} />} />
              <Match pattern="/search" render={() => <Search {...this.state} />} />
              <Match pattern="/firebase" render={() => <Db {...this.state} />} />
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
