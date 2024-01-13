// VideoPlayer.js
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

  return (
    <div>
      <label>
        Video URL:
        <input type="text" value={videoUrl} onChange={handleInputChange} />
      </label>
      <br />
      {videoUrl && <ReactPlayer url={videoUrl} controls />}
    </div>
  );
};

export default VideoPlayer;