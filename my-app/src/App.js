// App.js
import React from 'react';
import VideoProcessor from './components/VideoProcessor.js';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h1>Video Processor App</h1>
      <VideoProcessor />
    </div>
  );
};

export default App;
