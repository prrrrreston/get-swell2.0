import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../stylesheets/Post.css';
import octopus from '../assets/octopus-tentacles.png';
import testImg from '../assets/testImg.js';
import Comment from './Comments';


function Post(props) {
  const { setFeedChange, postInfo } = props;
  const [comment, setComment] = useState('');
  console.log('creating a post');
  console.log('postInfo:', postInfo);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

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
    console.log('post ID in likePost', postID);
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

  const submitComment = (event) => {
    const postID = event.target.parentNode.parentNode.id;
    const username = Cookies.get('username');
    fetch('/api/posts/comment', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postID, username, comment }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFeedChange(true);
      })
      .catch((error) => console.log(error));
  };

  const commentList = [];

  for (let i = 0; i < postInfo.comments.length; i++) {
    commentList.push(<Comment key={i} username={postInfo.comments[i].username} comment={postInfo.comments[i].comment} />);
  }

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
      <div className="comment-section">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <button onClick={submitComment}>Comment</button>
      </div>
      {commentList}
    </div>
  );
}

export default Post;
