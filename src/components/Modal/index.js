import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ResponsiveModal from 'react-responsive-modal'

class Modal extends Component {
  render() {
    const { isOpen, centered, wide, onClose } = this.props

    return (
      <ResponsiveModal
        open={isOpen}
        little={centered}
        onClose={onClose}
        classNames={{
          overlay: '',
          modal: 'br2',
          closeIcon: '',
        }}
        styles={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          modal: {
            padding: '3rem',
            maxWidth: wide ? '90%' : '800px',
          },
          closeIcon: {
            top: '30px',
            right: '30px',
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
  children: PropTypes.node,
  /** Center the modal (for small content) */
  centered: PropTypes.bool,
  /** Show or hide the modal */
  isOpen: PropTypes.bool.isRequired,
  /** 90% screen wide modal */
  wide: PropTypes.bool,

  onClose: PropTypes.func.isRequired,
}

export default Modal
