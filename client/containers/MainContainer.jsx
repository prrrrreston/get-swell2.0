import React, { useState, useEffect } from 'react';
import '../stylesheets/MainContainer.css';
import Feed from '../components/Feed.jsx';
import PostCreator from '../components/PostCreator.jsx';
import Cookies from 'js-cookie';
// IMPORT COMPONENTS
import DrawerAppBar from '../components/Menu.jsx';

// const getUserUrl = 'http://localhost:3000/api/users?userName=';

function MainContainer() { // changed this to capital
  const cookieUsername = Cookies.get('username');
  console.log('cookie username', cookieUsername)
  console.log('cookies', Cookies.get())
  const [prefs, setPrefs] = useState({
    Motivation: true,
    Milestones: true,
    Mindfulness: true,
  });
  const [user, setUser] = useState({});
  const [feedChange, setFeedChange] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function getUserAndUpdatePrefs(username) {
    fetch('/api/users?username=' + username)
      .then((data) => data.json())
      .then((userInfo) => {
        console.log('user info:',userInfo);
        setUser(userInfo);
        const lowercaseKeys = Object.keys(userInfo.preferences);
        console.log('prev prefs', userInfo.preferences);
        const uppercaseKeys = lowercaseKeys.map((key) => key[0].toUpperCase() + key.slice(1));
        const newPrefsObj = {};
        for (let i = 0; i < lowercaseKeys.length; i++) {
          // the code here accounts for handling how the prefs object is written
          // lowercase motivation vs uppercase, string boolean vs boolean boolean
          newPrefsObj[uppercaseKeys[i]] = userInfo.preferences[lowercaseKeys[i]] === 'true' || userInfo.preferences[lowercaseKeys[i]] === true;
        }
        console.log('new prefs before updating state:', newPrefsObj);
        setPrefs(newPrefsObj); // 'motivation' 'Motivation'
      });
  }

  console.log('the new prefs state is: ', prefs);

  useEffect(() => {
    console.log('getting user and updating prefs');
    getUserAndUpdatePrefs(cookieUsername); // hard-coded for now
  }, [isLoggedIn]);

  return (
    <div>
      <div id="menuBar">
        <DrawerAppBar
          prefs={prefs}
          setPrefs={setPrefs}
          user={user}
          setUser={setUser}
        />
      </div>
      <div id="postCreator">
        <PostCreator user={user} feedChange={feedChange} setFeedChange={setFeedChange} />
      </div>
      <div id="feed">

        <Feed prefs={prefs} setPrefs={setPrefs} feedChange={feedChange} setFeedChange={setFeedChange} />
      </div>
    </div>
  );
}

export default MainContainer;
