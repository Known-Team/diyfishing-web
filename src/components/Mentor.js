import React from 'react';
import base from '../base';
import { BrowserRouter, Match, Miss, Redirect, Link } from 'react-router';
import { makeGreeting } from '../helpers';
import Skills from './Skills';

const Mentor = (props) => {
  const { details } = props;

  return(
    <div className="mentors__brick">
      <div className="mentors__avatar">
        <img className="br-100 dib mentorImg" src={details.image} />
      </div>
      <div className="mentors__info">
        <div className="mentors__info__name avenir">{details.name}</div>
        <div className="mentors__info__title avenir">{details.title}</div>
        <div className="mentors__info__shortbio avenir">{details.shortbio}</div>
        <div className="mentors__info__skills">
          {
            Object
            .keys(details.skills)
              .map(key => <Skills key={key} details={details.skills[key]} />)
          }
        </div>
      </div>
      <div className="mentors__actions">
        <button className="home-page__navbuttons--button avenir small-font grow profile_button">Send Message</button>
        <label className="mentors__actions__price avenir">{details.price}</label>
      </div>

    </div>
  )
}

// Mentor.propTypes = {
//   details: React.PropTypes.object.isRequired,
//   index: React.PropTypes.string.isRequired,
//   addToOrder: React.PropTypes.func.isRequired
// }


export default Mentor;
