import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../stylesheets/Post.css';
import octopus from '../assets/octopus-tentacles.png';
import testImg from '../assets/testImg.js';

function Post(props) {
  const { setFeedChange, postInfo } = props;
  console.log('creating a post');
  console.log('postInfo:', postInfo);

  const deletePost = (event) => {
    const postID = event.target.parentNode.id;
    fetch(`/api/posts/${postID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFeedChange(true);
      })
      .catch((error) => console.log(error));
  };

  const likePost = (event) => {
    // console.log('event.target', event.target, 'event.target.parentNode', event.target.parentNode.parentNode)
    const postID = event.target.parentNode.parentNode.id;
    console.log('post ID in likePost', postID)
    fetch(`/api/posts/likepost/${postID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFeedChange(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="post" id={props.postInfo._id}>
      <img src={props.postInfo.image || octopus} />
      <p>
        <b>Category: </b>
        {' '}
        {props.postInfo.preference}
      </p>
      <p>
        <b>
          {props.postInfo.userID.username}
          :
        </b>
        {' '}
        {props.postInfo.description}
      </p>
      <p>
        <b>Likes: </b>
        {props.postInfo.likes}
        <button onClick={likePost} style={{ marginLeft: '10px' }}>Like Post</button>
      </p>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default Post;
