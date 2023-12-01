import React, { useState } from 'react';
import './ctyle.css';
const ThumbnailUpload = ({ onUpload }) => {
  const [thumbnail, setThumbnail] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    onUpload(file);
  };

  return (
    <div className="mb-3">
      <label htmlFor="thumbnail" className="form-label">
        Upload Thumbnail (JPG/PNG):
      </label>
      <input
        type="file"
        className="form-control"
        id="thumbnail"
        accept=".jpg, .png"
        required
        onChange={handleUpload}
      />
    </div>
  );
};

export default ThumbnailUpload;
