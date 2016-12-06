import React, { Component } from 'react';
import { BrowserRouter, Match, Miss, Redirect } from 'react-router';
import base from '../base';

import Header from './Header';
import Home from './Home';
import NotFound from './NotFound';
import Admin from './Admin';

import POIContainer from '../containers/POIContainer';
import FishingContainer from '../containers/FishingContainer';


class App extends Component {

  state = {
    uid: null,
    userDetail:null,
    currentlyViewing: 'poi'
  };


componentWillMount(){

  const localStorageRef = localStorage.getItem(`lastView`);

  if (localStorageRef) {
      this.setState({
        currentlyViewing: JSON.parse(localStorageRef)
      });
    }

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
    this.setState({
        uid: authData.user.uid,
        userDetail: authData.user
    })
  }

  handleViewChange = (view) => {
    this.setState({
      currentlyViewing: view
    })
    localStorage.setItem(`lastView`, JSON.stringify(view));

    return (
        <Redirect to={'/poi'} />
    )
  }

  render() {
      return (
        <div>
          <Header switchView={this.handleViewChange} dropDownopen={false} logout={this.logout} {...this.state} />
          <BrowserRouter>
            <div>
              <Match exactly pattern="/" render={() => <Home login={this.authenticate} {...this.state} />} />
              <Match pattern="/admin" render={() => <Admin  {...this.state} />} />

              <Match pattern="/poi" render={() => <POIContainer />} />
              <Match pattern="/fishing" render={() => <FishingContainer />} />

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
