import React from 'react';
import ImageGrid from './components/ImageGrid';
import Title from './components/Title';
import UploadImg from './components/UploadImg';

const App = () => {
  return (
    <div className='App'>
      <Title />
      <UploadImg />
      <ImageGrid />
    </div>
  );
};

export default App;
