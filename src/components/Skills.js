import React from 'react';
import base from '../base';
import { BrowserRouter, Match, Miss, Redirect, Link } from 'react-router';
import { makeGreeting } from '../helpers';

const Skills = (props) => {
  const { details } = props;

  return(
    <label className="mentors__info__skills__skill avenir">
      {details}
    </label>
  )
}

// Mentor.propTypes = {
//   details: React.PropTypes.object.isRequired,
//   index: React.PropTypes.string.isRequired,
//   addToOrder: React.PropTypes.func.isRequired
// }


export default Skills;
