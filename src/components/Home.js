import React from 'react';
import { Redirect  } from 'react-router';


class Home extends React.Component{

  render(){
    if (this.props.uid){
      return (
          <Redirect to={'/poi'} />
      )
    }
    return(
          <div className="app-container">
            <div className="home-page">

              <h4 className="fw6 f3 f3-ns lh-title mt0 mb3 avenir">
                <small>DIYFishing's</small><br/>
                Points of Interest & Fishing Info
              </h4>
              <div>
                <input id="txtPassword" type="password" className="avenir" placeholder="Password"  />
              </div>
              <div className="home-page__navbuttons">
                <button onClick={()=> this.props.login()} className="home-page__navbuttons--button avenir">Sign In</button>
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
