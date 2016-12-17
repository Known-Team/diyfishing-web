import React from 'react';
import { Redirect, Link } from 'react-router';

class Header extends React.Component{

  constructor(){
    super()
    this.showDropDown = this.showDropDown.bind(this);
    this.state = {
      dropDownopen:false
    }
  }

  showDropDown(){
    this.setState({
      dropDownopen: this.state.dropDownopen ? false : true
    })
  }

  getNav(user){

      if (user){
        return (
          <div id="header" className="dtc v-mid tr  dropdown">
            <a href="#" onClick={this.showDropDown} className="no-underline avenir navlinks displayName"><i className="fa fa-bars"></i></a>
            <div className={`dropdown__content ${this.state.dropDownopen ? `dropdown--open` :  `dropdown--closed` }`}>
              <div><a className="dropdown__item avenir" href="/poi">Points of Interest</a></div>
              <div><a className="dropdown__item avenir" href="/fishing">Fishing Info</a></div>
              <div onClick={this.props.logout} className="dropdown__item avenir logout">Logout</div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="dtc v-mid tr">
            {/* <a href="#" className="no-underline avenir navlinks displayName">Become a Mentor</a> */}
          </div>

        )
      }
  }

  render(){
    let nav = this.getNav(this.props.uid);

    return(
      <header className="sans-serif">
        <nav className="dt w-100 mw8 center">
          <div className="dtc w2 v-mid pa3">
            {/* <button onClick={()=> this.logout()}>logout </button> */}
            <a href="/" className="dib h2 pa1 grow-large logo avenir">
              <img src="https://diyfishing.com/wp-content/uploads/2016/09/diyfishing_logo.png" />
            </a>
          </div>
          {nav}

        </nav>

      </header>
    )
  }
}



export default Header;
