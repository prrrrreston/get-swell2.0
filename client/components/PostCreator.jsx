import React, { useState, useEffect } from 'react';
import '../stylesheets/PostCreator.css';
import Cookies from 'js-cookie';
import octopus from '../assets/octopus-tentacles.png';
import DropdownMenu from './Dropdown.jsx';

function PostCreator(props) {
  const { _id, username } = props.user;
  const [postText, setPostText] = useState('');
  const [postCategory, setPostCategory] = useState('Motivation');
  const { feedChange, setFeedChange } = props;

  console.log('username', props.user.username);
  const cookieUsername = Cookies.get('username');
  console.log('id', _id);

  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/datlwdq78';
  const UPLOAD_PRESET = 'm6vf4adm';
  const handlePost = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formImage = form.get('imageRaw');

    const formData = new FormData();
    formData.append('file', formImage);
    formData.append('upload_preset', UPLOAD_PRESET);
    // fetch(CLOUDINARY_URL, {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.secure_url) {
    //       console.log('cloudinary url', data.secure_url);
    //       form.append('image', data.secure_url);
    //     } else {
    //       throw new Error('failed to upload image to cloudinary');
    //     }
    //   });

    // console.log('working');
    console.log('form desc', form.get('description'));
    form.append('userID', _id);
    // console.log('form userID', form.get('userID'))
    form.append('preference', postCategory);
    // form.append('description', postText);
    // form.append('image')
    fetch('/api/posts/', {
      method: 'POST',
      body: form,
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
        <form onSubmit={handlePost}>
          <input
            name="description"
            type="text"
            value={postText}
            onChange={(event) => setPostText(event.target.value)}
            style={inputStyles}
            className="post-input"
          />
          <input
            name="imageRaw"
            type="file"
            label="image"
            id="fileUpload"
            accept=".jpeg, .png,"
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}

export default PostCreator;
