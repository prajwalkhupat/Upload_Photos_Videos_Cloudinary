// // DisplayUpload.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DisplayUpload = () => {
  const [latestUpload, setLatestUpload] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        const uploads = response.data;

        if (uploads.length > 0 && uploads[uploads.length - 1].title && uploads[uploads.length - 1].imgUrl) {
          setLatestUpload(uploads[uploads.length - 1]);
        } else {
          console.error('No valid title or imgUrl found in the latest upload');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Click Title Or Image to See Video</h1>
      {latestUpload && (
        <Link to={`/video/${latestUpload._id}`}>
          <div key={latestUpload._id}>
            <h2> Title - {latestUpload.title}</h2>
            <img src={latestUpload.imgUrl} alt={latestUpload.title} />
          </div>
        </Link>
      )}
    </div>
  );
};

export default DisplayUpload;
