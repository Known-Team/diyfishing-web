import React from 'react';
import Header from './Header';
//import {Link} from 'react-router';

class MentorSignup extends React.Component{

  loginWithFacebook(){
    alert("about to login with Facebook");
  }

  render(){
    return(
      <div>

        <div className="content-container content-container--form">

          <article className="pa4 black-80">

            <h3 className="fw1 f5 black-80 mt3 mb4 lh-title form-title">Sign up to join our beta.</h3>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <div className="mt3">
                <label className="db fw4 lh-copy f6">Name</label>
                <input className="pa2 input-reset ba bg-transparent w-100 " type="email" name="email-address"  id="email-address" />
              </div>

              <div className="mt3">
                <label className="db fw4 lh-copy f6">City</label>
                <select className="pa2 input-reset ba bg-transparent w-100  select" type="email" name="email-address"  id="email-address">
                  <option></option>
                  <option>Richmond, VA</option>
                  <option>Salt Lake City, UT</option>
                </select>
              </div>

              <div className="mt3">
                <label className="db fw4 lh-copy f6">Skills</label>

                <input type="checkbox" id="android" name="android" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="android">Android</label>

                <input type="checkbox" id="csharp" name="csharp" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="csharp">C#</label>

                <input type="checkbox" id="css" name="css" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="css">CSS</label>

                <input type="checkbox" id="db" name="db" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="db">Databases</label>

                <input type="checkbox" id="design" name="design" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="design">Design</label>

                <input type="checkbox" id="devtools" name="devtools" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="devtools">Dev Tools</label>

                <input type="checkbox" id="game" name="game" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="game">Game Development</label>

                <input type="checkbox" id="html" name="html" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="html">HTML</label>

                <input type="checkbox" id="ios" name="ios" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="ios">iOS</label>

                <input type="checkbox" id="java" name="java" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="java">Java</label>

                <input type="checkbox" id="js" name="js" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="js">JavaScript</label>

                <input type="checkbox" id="php" name="php" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="php">PHP</label>

                <input type="checkbox" id="python" name="python" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="python">Python</label>

                <input type="checkbox" id="ruby" name="ruby" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="ruby">Ruby</label>

                <input type="checkbox" id="vb" name="vb" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="vb">VB.NET</label>

                <input type="checkbox" id="wordpress" name="wordpress" />
                <label className="f6 link br-pill ba ph3 pv1 mb2 dib light-purple" htmlFor="wordpress">Wordpress</label>


              </div>

              <div className="mt3">
                <label className="db fw4 lh-copy f6">Email address</label>
                <input className="pa2 input-reset ba bg-transparent w-100 " type="email" name="email-address"  id="email-address" />
              </div>


              <div className="mt3">
                <label className="db fw4 lh-copy f6">Password</label>
                <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password"/>
              </div>

              <div className="mt3">
                <label className="db fw4 lh-copy f6">Repeat Password</label>
                <input className="b pa2 input-reset ba bg-transparent" type="password" name="passwordtwo"  id="passwordtwo"/>
              </div>
            </fieldset>
            <div className="mt3"><button onClick={this.loginWithFacebook} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" >Sign Up</button></div>

          </article>
        </div>
      </div>
    )
  }
}

export default MentorSignup;
