import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

import TitleInput from './TitleInput';
import DescriptionTextArea from './DescriptionTextArea';
import ThumbnailUpload from './ThumbnailUpload';
import VideoUpload from './VideoUpload';

const SecureUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadFile = async (type, file) => {
    const folder = type === 'image' ? 'images' : 'videos';

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`http://localhost:5000/api/sign-upload`,{ folder });
      const { timestamp, signature } = res.data;
      
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
      formData.append('folder', folder);

      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      const resourceType = type === 'image' ? 'image' : 'video';
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const uploadRes = await axios.post(api, formData);
      return uploadRes.data.secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const imgUrl = await uploadFile('image', img);
      const videoUrl = await uploadFile('video', video);

       await axios.post(`http://localhost:5000/api/videos`, {
        title,
        description,
        imgUrl,
        videoUrl,
      });
      
      setTitle('');
      setDescription('');
      setImg(null);
      setVideo(null);

      console.log('File upload success!');
      setLoading(false);
      // Navigate to the new page with the uploaded data
      navigate('/display-upload', { state: { title, imgUrl } });
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TitleInput onChange={(newTitle) => setTitle(newTitle)} />
        <DescriptionTextArea onChange={(newDesc) => setDescription(newDesc)} />
        <ThumbnailUpload onUpload={(file) => setImg(file)} />
        <VideoUpload onUpload={(file) => setVideo(file)} />
        <br />
        <button type="submit">Upload</button>
      </form>

      {loading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
    </div>
  );
};

export default SecureUpload;
