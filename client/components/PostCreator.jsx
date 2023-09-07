import React, { useState, useEffect } from 'react';
import '../stylesheets/PostCreator.css';
import octopus from '../assets/octopus-tentacles.png';
import DropdownMenu from './Dropdown.jsx';
import Cookies from 'js-cookie';

function PostCreator(props) {
  const { _id, username } = props.user;
  const [postText, setPostText] = useState('');
  const [postCategory, setPostCategory] = useState('Motivation');
  const { feedChange, setFeedChange } = props;
  console.log('username', props.user.username);
  const cookieUsername = Cookies.get('username')
  console.log('id', _id)
  const handlePost = () => {
    fetch('/api/posts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: _id,
        preference: postCategory,
        // image: image,
        description: postText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('post successfully updated: ', data);
        setFeedChange(true); // this will re-render the feed
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const inputStyles = {
    width: '100%',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyles} className="postCreator">
      <div className="input-and-dropdown">
        <DropdownMenu postCategory={postCategory} setPostCategory={setPostCategory} />
        <form>
          <input
            type="text"
            value={postText}
            onChange={(event) => setPostText(event.target.value)}
            style={inputStyles}
            className="post-input"
          />
          <input
            type="file"
            label="image"
            id="fileUpload"
            accept=".jpeg, .png,"
          />
        </form>
      </div>
      <button onClick={() => handlePost()}>Post</button>
    </div>

  );
}

export default PostCreator;
