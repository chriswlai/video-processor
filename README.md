# Video Processor

## Overview

This web app, built using React, Python with OpenCV, and Firebase, allows users to submit an MP4 file. The application utilizes computer vision image processing to label basic objects in each frame of the video. The processed video is then returned to the user, along with a list of identified objects presented in sentence form.

## Features

- **Video Submission**: Users can easily upload MP4 files through the web interface.
- **Computer Vision Processing**: OpenCV is employed for image processing to identify and label basic objects in each frame.
- **Object Recognition**: The application generates a list of identified objects in sentence form.

## Technologies Used

- **React**: Frontend development for a seamless user experience.
- **Python**: Backend processing using OpenCV for computer vision tasks.
- **OpenCV**: Computer vision library for image and video processing.

## Challenges

### Saving and Reconstructing the New MP4

We faced challenges in efficiently saving and reconstructing the new MP4 file after applying computer vision processing. To overcome this, we implemented a file storage system using Firebase Cloud Storage.

### Opening the New MP4

Opening the new MP4 on the client side required careful handling of video file formats. We ensured compatibility by utilizing a combination of browser-supported video formats. We also ran a compression algorithm that solved the problem.

### Ensuring Client Side Receives Sentence and New MP4

Synchronizing the client-side with the server to receive both the list of identified objects in sentence form and the processed MP4 was a challenge. We established a WebSocket connection between the server and React frontend, enabling real-time communication. The server sends updates as soon as processing is complete.

### Connecting the Server to Client Side Using React

Connecting the backend server to the React frontend required a robust communication mechanism. We integrated WebSocket technology to establish a persistent connection, allowing efficient data transfer between the server and client. This ensured that updates and processed data were delivered in real-time.

## Usage

1. Visit the web app.
2. Click the "Upload Video" button to submit an MP4 file.
3. Click the "Process and Play Video" button
4. Wait for the processing to complete.
5. Play the updated video and review the list of identified objects.

## Contributors

- **[chriswlai](https://github.com/chriswlai)**
- **[PIEALLDAYALLPIE](https://github.com/PIEALLDAYALLPIE)**

## Acknowledgments

- Acknowledge any external libraries, tutorials, or resources used in the project.

<img width="587" alt="Screenshot 2024-01-14 at 5 12 24 PM" src="https://github.com/chriswlai/auto-referee/assets/43394684/adce3045-2fca-4677-bcb3-782490b548e4">
