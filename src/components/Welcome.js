import React from 'react';
import UnAuth from './unAuthenticated';
import { BrowserRouter, Match, Miss, Redirect, Link } from 'react-router';

class Welcome extends React.Component{

  render(){
    return(
      <div>
        <div className="home-page">

          <div className="home-page__sub-header avenir">
            Find local dev experts <br /> to help level up your coding game.
            <br />


          </div>
          <div className="home-page__navbuttons">
            <Link to="/home" className="home-page__navbuttons--button avenir">Get Started</Link>

          </div>

        </div>
      </div>
    )
  }
}


export default Welcome;
