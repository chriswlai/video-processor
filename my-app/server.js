// // server.js
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const { spawn } = require('child_process');

// const app = express();
// const port = 5001;

// app.use(cors());

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// app.post('/upload', upload.single('video'), (req, res) => {
//     const processedVideoBuffer = req.file.buffer;
//     const processedVideoPath = path.join(__dirname, 'processed_video.mp4');

//     // Save the processed video
//     require('fs').writeFileSync(processedVideoPath, processedVideoBuffer);

//     // Invoke the Python script
//     const pythonProcess = spawn('python', ['process_video.py', processedVideoPath]);

//     let outputText = '';

//     pythonProcess.stdout.on('data', (data) => {
//         outputText += data.toString();
//     });

//     pythonProcess.on('close', (code) => {
//         console.log(`Python script exited with code ${code}`);
//         res.json({ videoUrl: `/processed_video.mp4`, outputText });
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import the cors middleware
// const { spawn } = require('child_process');

const app = express();
const port = 5001;

app.use(cors()); // Enable CORS

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('video'), (req, res) => {
    // Process the video (you can replace this with your algorithm)
    // For simplicity, this example just echoes back the uploaded video

    const processedVideoBuffer = req.file.buffer;
    const processedVideoUrl = `data:video/mp4;base64,${processedVideoBuffer.toString('base64')}`;

    res.json({ videoUrl: processedVideoUrl });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});