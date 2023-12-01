import React, { useState } from 'react';
import './ctyle.css';
const DescriptionTextArea = ({ onChange }) => {
  const [description, setDescription] = useState('');

  const handleChange = (e) => {
    setDescription(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="description" className="form-label">
        Description:
      </label>
      <textarea
        className="form-control"
        id="description"
        value={description}
        onChange={handleChange}
        required
        maxLength="200"
      />
    </div>
  );
};

export default DescriptionTextArea;
