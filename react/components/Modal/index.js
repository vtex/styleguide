import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ResponsiveModal from 'react-responsive-modal'

class Modal extends PureComponent {
  render() {
    const {
      isOpen,
      centered,
      onClose,
      closeOnEsc,
      closeOnOverlayClick,
      showCloseIcon,
      className,
      styles
    } = this.props

    return (
      <ResponsiveModal
        open={isOpen}
        little={centered}
        onClose={onClose}
        closeOnEsc={closeOnEsc}
        closeOnOverlayClick={closeOnOverlayClick}
        showCloseIcon={showCloseIcon}
        classNames={className}
        styles={styles}
        closeIconSize={18}
      >
        {this.props.children}
      </ResponsiveModal>
    )
  }
}

Modal.defaultProps = {
  isOpen: false,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseIcon: true,
  className: {
    overlay: 'vtex-modal__overlay',
    modal: 'vtex-modal__modal br2',
    closeIcon: 'vtex-modal__close-icon',
  },
  styles: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 10000,
    },
    modal: {
      padding: '3rem',
    },
    closeIcon: {
      top: '8px',
      right: '8px',
      padding: '10px',
    },
  }
}

Modal.propTypes = {
  /** Content of the modal */
  children: PropTypes.node.isRequired,
  /** Center the modal (for small content) */
  centered: PropTypes.bool,
  /** Show or hide the modal */
  isOpen: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,

  /** Close the modal on ESC key press (default true) */
  closeOnEsc: PropTypes.bool,
  /** Close the modal on overlay click (default true) */
  closeOnOverlayClick: PropTypes.bool,
  /** Show the close icon on upper right corner (default true) */
  showCloseIcon: PropTypes.bool,
  /** Inject class names into modal */
  className: PropTypes.object,
  /** The modal styles */
  styles: PropTypes.object,
}

export default Modal
