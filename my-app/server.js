// // // server.js
// // const express = require('express');
// // const multer = require('multer');
// // const path = require('path');
// // const cors = require('cors');
// // const { spawn } = require('child_process');

// // const app = express();
// // const port = 5001;

// // app.use(cors());

// // const storage = multer.memoryStorage();
// // const upload = multer({ storage: storage });

// // app.use(express.json());
// // app.use(express.static(path.join(__dirname, 'public')));

// // app.post('/upload', upload.single('video'), (req, res) => {
// //     const processedVideoBuffer = req.file.buffer;
// //     const processedVideoPath = path.join(__dirname, 'processed_video.mp4');

// //     // Save the processed video
// //     require('fs').writeFileSync(processedVideoPath, processedVideoBuffer);

// //     // Invoke the Python script
// //     const pythonProcess = spawn('python', ['process_video.py', processedVideoPath]);

// //     let outputText = '';

// //     pythonProcess.stdout.on('data', (data) => {
// //         outputText += data.toString();
// //     });

// //     pythonProcess.on('close', (code) => {
// //         console.log(`Python script exited with code ${code}`);
// //         res.json({ videoUrl: `/processed_video.mp4`, outputText });
// //     });
// // });

// // app.listen(port, () => {
// //     console.log(`Server is running on http://localhost:${port}`);
// // });

// // server.js
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors'); // Import the cors middleware
// // const { spawn } = require('child_process');

// const app = express();
// const port = 5001;

// app.use(cors()); // Enable CORS

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// app.post('/upload', upload.single('video'), (req, res) => {
//     // Process the video (you can replace this with your algorithm)
//     // For simplicity, this example just echoes back the uploaded video

//     const processedVideoBuffer = req.file.buffer;
//     const processedVideoUrl = `data:video/mp4;base64,${processedVideoBuffer.toString('base64')}`;

//     res.json({ videoUrl: processedVideoUrl });
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const port = 5001;

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Save files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, 'uploaded_video.mp4'); // Save the uploaded file as 'uploaded_video.mp4'
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('video'), (req, res) => {
    const uploadedVideoPath = path.join('uploads', 'uploaded_video.mp4');
    
    function runPyScript(scriptPath, args) {
        const pythonProcess = spawn('python', [scriptPath].concat(args));
        
        let out = '';

        pythonProcess.stdout.on('data', (stdout) => {
            out += stdout.toString();
        });

        pythonProcess.on('data', stderr => {
            console.log(`stderr: ${stderr}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);
            console.log(out)
            res.json({ outputText: out });
        });
    }
    runPyScript('process_video.py', [uploadedVideoPath]);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});