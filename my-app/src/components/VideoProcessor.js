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
// import React, { useState } from 'react';
// import axios from 'axios';
// import ReactPlayer from 'react-player';

// const VideoProcessor = () => {
//   const [videoFile, setVideoFile] = useState(null);
//   const [processedVideoUrl, setProcessedVideoUrl] = useState('');
//   const [outputText, setOutputText] = useState('');

//   const handleFileChange = (e) => {
//     setVideoFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('video', videoFile);

//     try {
//       // Upload video file to the server
//       const response = await axios.post('http://localhost:5001/upload', formData);

//         setProcessedVideoUrl(response.data.videoUrl);
//         console.log("test", response.data.videoUrl)
//         console.log("test2", response.data.outputText);
//         setOutputText("test" + response.data.outputText);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div>
//       <label>
//         Upload Video:
//         <input type="file" accept=".mp4" onChange={handleFileChange} />
//       </label>
//       <br />
//       <button onClick={handleUpload}>Process and Play Video</button>
//       <br />
//       {processedVideoUrl && (
//         <>
//             <ReactPlayer url={'basketball.mp4'} controls />
//             <p>{outputText}</p>
//         </>
//         )}
//     </div>
//   );
// };

// export default VideoProcessor;

import React, { useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const VideoProcessor = () => {
  const [videoFile, setVideoFile] = useState(null);
  //const [processedVideoUrl, setProcessedVideoUrl] = useState('');
  const [outputText, setOutputText] = useState('');
  const [showPlayer, setShowPlayer] = useState(false); // State to control player visibility

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      // Upload video file to the server
      const response = await axios.post('http://localhost:5001/upload', formData);
      console.log(response);
      
      console.log("test", response.data.outputText);
      setOutputText(response.data.outputText);

      setShowPlayer(true);
      console.log(response);
      
      // setTimeout(() => {
      //   //setProcessedVideoUrl(response.data.videoUrl);
      //   //console.log("test", response.data.videoUrl)
      //   // console.log("test2", response.data.outputText);
      //   // setOutputText(response.data.outputText);

      //   // console.log("test", response.data.outputText);
      //   // setOutputText(response.data.outputText);

      //   // setShowPlayer(true);
      //   // console.log(response);
      // }, 16000);

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
      {showPlayer && (
        <>
          {/* <ReactPlayer url={'highway.mp4'} controls /> */}
          <p>{outputText}</p>
        </>
      )}
    </div>
  );
};

export default VideoProcessor;