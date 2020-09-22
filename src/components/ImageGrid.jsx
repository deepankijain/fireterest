import React, { useState } from 'react';
import Masonry from 'react-masonry-component';
import useFirestore from '../hooks/useFirestore';
import { Modal, Backdrop, Fade, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteImage } from '../hooks/useStorage';

const ImageGrid = () => {
  const { docs } = useFirestore('images');
  const [selectedImg, setSelectedImg] = useState(null);
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* Image layout */}
      <Masonry>
        {docs &&
          docs.map((doc) => (
            <div
              className='img-wrap'
              key={doc.id}
              id={doc.id}
              onClick={handleOpen}>
              <img
                src={doc.url}
                alt='uploaded pic'
                onClick={() => {
                  setSelectedImg(doc.url);
                  setId(doc.id);
                }}
              />
            </div>
          ))}
      </Masonry>
      {/* Image Modal */}
      {selectedImg && (
        <Modal
          className='modal'
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={open}>
            <div className='paper'>
              <img src={selectedImg} alt='uploaded-img' />
              <div className='buttons'>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <IconButton
                  onClick={async () => {
                    await deleteImage(`${selectedImg}`, id);
                    handleClose();
                  }}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default ImageGrid;
