import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as ReactModal from 'react-modal'
import Button from '../Button'
import CloseIcon from '../icon/Close'
import config from 'vtex-tachyons/config.json'

ReactModal.setAppElement('body')

class Modal extends PureComponent {
  render() {
    const {
      title,
      innerText,
      isOpen,
      handleClose,
      style,
      handlePrimaryAction,
      primaryActionTitle,
      handleSecondaryAction,
      secondaryActionTitle,
    } = this.props
    return (
      <ReactModal
        isOpen={isOpen}
        shouldCloseOnOverlayClick
        onRequestClose={handleClose}
        overlayClassName={`fixed ${
          style.modaloverlay
        } z-4 top-0 bottom-0 right-0 left-0 flex items-center justify-center`}
        className={`absolute ${
          style.modalheight
        } overflow-auto outline-0 w-50 mw7 bg-white o-100 b--light-gray br2`}
      >
        <div className="pa8">
          <div className={`${title ? 'flex justify-between mb7' : 'mb2'}`}>
            {title && <div className="f3 b near-black">{title}</div>}
            <div className="tr">
              <button
                className="pointer bg-transparent b--transparent outline-0"
                onClick={handleClose}
              >
                <CloseIcon color={config.colors['near-black']} size={12} />
              </button>
            </div>
          </div>
          <div className="f5 fw4 near-black">{innerText}</div>
          {((handleSecondaryAction && secondaryActionTitle) ||
            (handlePrimaryAction && primaryActionTitle)) && (
              <div className="flex justify-around fr mv8">
                {handleSecondaryAction &&
                  secondaryActionTitle && (
                    <div className="mr5">
                      <Button secondary onClick={handleSecondaryAction}>
                        {secondaryActionTitle}
                      </Button>
                    </div>
                  )}
                {handlePrimaryAction &&
                  primaryActionTitle && (
                    <Button primary onClick={handlePrimaryAction}>
                      {primaryActionTitle}
                    </Button>
                  )}
              </div>
            )}
        </div>
      </ReactModal>
    )
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  innerText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  handlePrimaryAction: PropTypes.func,
  primaryActionTitle: PropTypes.string,
  handleSecondaryAction: PropTypes.func,
  secondaryActionTitle: PropTypes.string,
}

export default Modal
