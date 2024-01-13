// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// App.js
// import React from 'react';
// import VideoProcessor from './components/VideoProcessor.js';

// const App = () => {
//   return (
//     <div>
//       <h1>Video Processor App</h1>
//       <VideoProcessor />
//     </div>
//   );
// };

// export default App;

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
