import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadImg = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ['image/png', 'image/jpeg'];
  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
    if (!selected) {
      setFile(null);
      setError(null);
    }
  };
  return (
    <form>
      <label htmlFor='image'>
        <span>+</span>
        <input type='file' id='image' onChange={handleChange} />
      </label>
      <div className='output'>
        {error && <div className='error'>{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadImg;
