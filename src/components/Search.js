import React from 'react';
import UnAuth from './unAuthenticated';
import { BrowserRouter, Match, Miss, Redirect, Link } from 'react-router';
import Mentor from './Mentor';

class Search extends React.Component{


  componentWillMount(){
    console.log(this.props);
  }

  render(){

    if ( !this.props.uid ){
        return (
          <Redirect to={'/home'} />
        )
    }
    return(
      <div className="app-container app-container__search">
        <div className="home-page">
          <div className="cities avenir">
            <label className="cities__city " value="saltlake">Salt Lake City</label>
            <label className="cities__city ">San Francisco</label>
            <label className="cities__city ">Richmond</label>
            <label className="cities__city ">Seattle</label>
            <label className="cities__city ">Austin</label>

          </div>
          <div className="cities avenir">

            <label className="cities__city ">New York City</label>
            <label className="cities__city ">Los Angeles</label>
            <label className="cities__city ">Boston</label>
          </div>
          <div className="mentors">
            {
              Object
              .keys(this.props.mentors)
                .map(key => <Mentor key={key} details={this.props.mentors[key]} />)
            }
          </div>
        </div>
      </div>
    )
  }
}


export default Search;
