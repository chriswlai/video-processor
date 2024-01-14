// // VideoProcessor.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import ReactPlayer from 'react-player';

// const VideoProcessor = () => {
//     const [videoFile, setVideoFile] = useState(null);
//     const [processedVideoUrl, setProcessedVideoUrl] = useState('');
//     const [outputText, setOutputText] = useState('');

//     const handleFileChange = (e) => {
//         setVideoFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         const formData = new FormData();
//         formData.append('video', videoFile);

//         try {
//             const response = await axios.post('http://localhost:5001/upload', formData);

//             setProcessedVideoUrl(response.data.videoUrl);
//             setOutputText(response.data.outputText);
//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     };

//     return (
//         <div>
//             <label>
//                 Upload Video:
//                 <input type="file" accept=".mp4" onChange={handleFileChange} />
//             </label>
//             <br />
//             <button onClick={handleUpload}>Process and Play Video</button>
//             <br />
//             {processedVideoUrl && (
//                 <>
//                     <p>{outputText}</p>
//                     <ReactPlayer url={`http://localhost:5001${processedVideoUrl}`} controls />
//                 </>
//             )}
//         </div>
//     );
// };

// export default VideoProcessor;

// VideoProcessor.js
import React, { useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const VideoProcessor = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      // Upload video file to the server
      const response = await axios.post('http://localhost:5001/upload', formData);

        setProcessedVideoUrl(response.data.videoUrl);
        console.log(response.data.outputText);
        setOutputText(response.data.outputText);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <label>
        Upload Video:
        <input type="file" accept=".mp4" onChange={handleFileChange} />
      </label>
      <br />
      <button onClick={handleUpload}>Process and Play Video</button>
      <br />
      {processedVideoUrl && (
        <>
            <ReactPlayer url={processedVideoUrl} controls />
            <p>{outputText}</p>
        </>
        )}
    </div>
  );
};

export default VideoProcessor;