import React, { useState, useEffect } from 'react';
import '../stylesheets/Post.css';
import octopus from '../assets/octopus-tentacles.png';

function Comment(props) {

  


  return (
    <div className="post">
      <b>{props.username}</b>
      {': '}
      {props.comment}
    </div>
  );
}

export default Comment;
