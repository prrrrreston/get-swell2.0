import React, { useState, useEffect } from 'react';
import Post from './Post.jsx';
import '../stylesheets/Feed.css';

// const url = 'http://localhost:3000/api/posts';

function Feed(props) {
  const [feedData, setFeedData] = useState([]);
  const { feedChange, setFeedChange } = props;
  useEffect(() => {
    fetch('/api/posts')
      .then((data) => data.json())
      .then((postObjArr) => {
        // console.log(postObjArr);
        const filteredPostObjArr = postObjArr.filter((el) => props.prefs[el.preference]).reverse();
        setFeedData(filteredPostObjArr);
        setFeedChange(false);
      });
  }, [props.prefs, props.feedChange]);

  const feedArray = [];

  for (let i = 0; i < feedData.length; i++) {
    feedArray.push(<Post key={i} postInfo={feedData[i]} feedChange={props.feedChange} setFeedChange={props.setFeedChange} />);
    // console.log(`<Post key=${i} postInfo=${feedData[i]}/>)`);
    // console.log(feedData[i]);
  }

  return (
    <div className="feed-container">
      <div className="feed">{feedArray}</div>
    </div>
  );
}

export default Feed;
