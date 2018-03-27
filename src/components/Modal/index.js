import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as ReactModal from 'react-modal'
import Button from '../Button'

ReactModal.setAppElement('body')

class Modal extends PureComponent {
  render() {
    const { innerText, isOpen, handleClose, style } = this.props
    return (
      <ReactModal
        isOpen={isOpen}
        shouldCloseOnOverlayClick
        onRequestClose={handleClose}
        overlayClassName={`fixed ${
          style.modaloverlay
        } z-4 top-0 bottom-0 right-0 left-0 flex items-center justify-center`}
        className="absolute outline-0 w-50 mw7 bg-white o-100 b--light-gray br2"
      >
        <div className="pa8">
          <div className="pv6 f5 fw4 near-black lh-copy">{innerText}</div>
          <div className="fr pv7">
            <Button secondary onClick={handleClose}>
              close
            </Button>
          </div>
        </div>
      </ReactModal>
    )
  }
}

Modal.propTypes = {
  innerText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
}

export default Modal
