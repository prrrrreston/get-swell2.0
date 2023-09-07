import React from 'react';
import './stylesheets/App.css';
import MainContainer from './containers/MainContainer';

function App() {
  return (
    <div id="app">
      <MainContainer />
      <div>
        Image by
        {' '}
        <a href="https://www.freepik.com/free-photo/side-view-fit-man-training-gym_40133040.htm#&position=0&from_view=collections">Freepik</a>
      </div>
    </div>
  );
}

export default App;
