import React, { useState } from 'react';
import './ctyle.css';
const TitleInput = ({ onChange }) => {
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="title" className="form-label">
        Title:
      </label>
      <input
        type="text"
        className="form-control"
        id="title"
        value={title}
        onChange={handleChange}
        required
        maxLength="50"
      />
    </div>
  );
};

export default TitleInput;
