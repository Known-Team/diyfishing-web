import React from 'react';

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
          <div className="dtc v-mid tr  dropdown">
            <a href="#" onClick={this.showDropDown} className="no-underline avenir navlinks displayName"><img className="br-100 h3 w3 dib img" src={this.props.userDetail.photoURL} alt="avatar" />{this.props.userDetail.displayName}</a>
            <div className={`dropdown__content ${this.state.dropDownopen ? `dropdown--open` :  `dropdown--closed` }`}>
              <div onClick={this.props.logout} className="dropdown__item avenir">Logout</div>
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
            <a href="/" className="dib w2 h2 pa1 grow-large logo avenir">
              DIYFishing
            </a>
          </div>
          {nav}

        </nav>

      </header>
    )
  }
}

export default Header;
