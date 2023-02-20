import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const onClickModalClose = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  const modalRoot = document.querySelector('#modal-root');
  return createPortal(
    <div className={css.overlay} onClick={onClickModalClose}>
      <div>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
