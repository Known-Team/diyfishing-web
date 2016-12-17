import React, { Component } from 'react';
import { BrowserRouter, Match, Miss, Redirect } from 'react-router';
import base from '../base';

import Header from './Header';
import Home from './Home';
import NotFound from './NotFound';
import Admin from './Admin';

import POIContainer from '../containers/POIContainer';
import EditPOIContainer from '../containers/EditPOIContainer';

import FishingContainer from '../containers/FishingContainer';
import EditFishingContainer from '../containers/EditFishingContainer';

import ViewFishingInfo from '../components/ViewFishingInfo';

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


authenticate = () => {
  const pass = document.getElementById('txtPassword').value;
  base.authWithPassword({
    email    : 'rva.christian91@gmail.com',
    password : pass
  }, this.authHandler);
}


authHandler = (err, user) => {
    if (err){
      console.error(err);
    
    }
    this.setState({
        uid: user.user.uid,
        userDetail: user
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
              <Match pattern="/poi" render={() => <POIContainer {...this.state} />} />
              <Match pattern="/fishing" render={() => <FishingContainer {...this.state} />} />
              <Match pattern="/edit-poi" render={() => <EditPOIContainer {...this.state} />} />
              <Match pattern="/edit-fishing" render={() => <EditFishingContainer {...this.state} />} />
              <Match pattern="/view-info" render={() => <ViewFishingInfo />} />
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
