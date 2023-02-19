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
          <img src={srcLargeImg} alt={alt} />
        </Modal>
      )}
    </>
  );
}

// export default class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   render() {
//     const { srcSmallImg, srcLargeImg, alt } = this.props;
//     const { showModal } = this.state;
//     return (
//       <>
//         <li className={css.galleryItem} onClick={this.toggleModal}>
//           <img
//             className={css.imageGalleryItemImage}
//             src={srcSmallImg}
//             alt={alt}
//           />
//         </li>
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={srcLargeImg} alt={alt} />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }

ImageGalleryItem.propTypes = {
  srcSmallImg: PropTypes.string.isRequired,
  srcLargeImg: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
