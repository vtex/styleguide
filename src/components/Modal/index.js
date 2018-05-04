import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ResponsiveModal from 'react-responsive-modal'

class Modal extends PureComponent {
  render() {
    const { isOpen, centered, onClose } = this.props

    return (
      <ResponsiveModal
        open={isOpen}
        little={centered}
        onClose={onClose}
        classNames={{
          overlay: 'vtex-modal__overlay',
          modal: 'vtex-modal__modal br2',
          closeIcon: 'vtex-modal__close-icon',
        }}
        styles={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          modal: {
            padding: '3rem',
          },
          closeIcon: {
            top: '8px',
            right: '8px',
            padding: '10px',
          },
        }}
        closeIconSize={18}
      >
        {this.props.children}
      </ResponsiveModal>
    )
  }
}

Modal.defaultProps = {
  isOpen: false,
}

Modal.propTypes = {
  /** Content of the modal */
  children: PropTypes.node.isRequired,
  /** Center the modal (for small content) */
  centered: PropTypes.bool,
  /** Show or hide the modal */
  isOpen: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,
}

export default Modal
