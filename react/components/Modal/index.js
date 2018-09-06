import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ResponsiveModal from 'react-responsive-modal'
import Button from '../Button'

class Modal extends PureComponent {
  handleCancelation = () => {
    this.props.cancelation && this.props.cancelation()
  }
  handleConfirmation = () => {
    this.props.confirmation && this.props.confirmation()
  }

  render() {
    const {
      isOpen,
      centered,
      onClose,
      closeOnEsc,
      closeOnOverlayClick,
      confirmation,
      confirmationLabel,
      cancelation,
      cancelationLabel,
      showCloseIcon,
    } = this.props

    return (
      <ResponsiveModal
        open={isOpen}
        little={centered}
        onClose={onClose}
        closeOnEsc={closeOnEsc}
        closeOnOverlayClick={closeOnOverlayClick}
        showCloseIcon={showCloseIcon}
        classNames={{
          overlay: 'vtex-modal__overlay',
          modal: 'vtex-modal__modal br2',
          closeIcon: 'vtex-modal__close-icon',
        }}
        styles={{
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
        }}
        closeIconSize={18}
      >
        {this.props.children}

        {confirmation && (
          <div className="vtex-modal__confirmation flex justify-end mt8">
            {cancelation && (
              <span className="mr4">
                <Button
                  size="small"
                  variation="secondary"
                  onClick={this.handleCancelation}
                >
                  {cancelationLabel}
                </Button>
              </span>
            )}
            <Button
              size="small"
              variation="primary"
              onClick={this.handleConfirmation}
            >
              {confirmationLabel}
            </Button>
          </div>
        )}
      </ResponsiveModal>
    )
  }
}

Modal.defaultProps = {
  isOpen: false,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseIcon: true,
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

  /** Confirmation & Cancelation actions */
  confirmation: PropTypes.func,
  confirmationLabel: PropTypes.string,
  cancelation: PropTypes.func,
  cancelationLabel: PropTypes.string,
}

export default Modal
