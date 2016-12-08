import React from 'react';

import { Redirect,  } from 'react-router';


class Home extends React.Component{

  render(){
    if (this.props.uid){
      console.log("im logged in");
      return (
          <Redirect to={'/poi'} />
      )
    }
    return(
          <div className="app-container">
            <div className="home-page">

              <h1 className="fw6 f3 f2-ns lh-title mt0 mb3 avenir">
                <small>DIYFishing's</small><br/>
                Points of Interest
              </h1>
              <h4 className="avenir">( needs some design love )</h4>
              <div className="home-page__navbuttons">
                <button onClick={()=> this.props.login('google')} className="home-page__navbuttons--button avenir">Login with Google</button>
                {/* <button onClick={()=> this.props.login('facebook')} className="home-page__navbuttons--button avenir">Login with Facebook</button> */}
              </div>
            </div>
          </div>
        )
    }
  }

Home.contextTypes = {
  router: React.PropTypes.object
}

export default Home;
