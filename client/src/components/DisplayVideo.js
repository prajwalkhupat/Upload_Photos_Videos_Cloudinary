// DisplayVideo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DisplayVideo = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/${id}`);
        const videoData = response.data;
        setVideoUrl(videoData.videoUrl);
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    fetchVideoUrl();
  }, [id]);

  if (!videoUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Video Player</h1>
      <video controls autoPlay width="600" height="400">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default DisplayVideo;
