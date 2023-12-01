import React, { useState } from 'react';
import './ctyle.css';
const VideoUpload = ({ onUpload }) => {
  const [video, setVideo] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    onUpload(file);
  };

  return (
    <div className="mb-3">
      <label htmlFor="video" className="form-label">
        Upload Video (MPG/AVI/MP4):
      </label>
      <input
        type="file"
        className="form-control"
        id="video"
        accept=".mpg, .avi, .mp4"
        required
        onChange={handleUpload}
      />
    </div>
  );
};

export default VideoUpload;
