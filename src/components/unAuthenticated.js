import React from 'react';
import {Link} from 'react-router';

class unAuthenticated extends React.Component{
  render(){
    return(
        <Link to="/home" className="home-page__navbuttons--button avenir">Login</Link>
    )
  }
}

export default unAuthenticated;
