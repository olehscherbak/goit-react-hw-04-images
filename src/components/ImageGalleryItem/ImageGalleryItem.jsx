import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ srcSmallImg, srcLargeImg, alt }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      <li className={css.galleryItem} onClick={toggleModal}>
        <img
          className={css.imageGalleryItemImage}
          src={srcSmallImg}
          alt={alt}
        />
      </li>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={srcLargeImg} alt={alt} className={css.modalImg} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  srcSmallImg: PropTypes.string.isRequired,
  srcLargeImg: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
