import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'
import Button from '../Button'

class ModalDialog extends Component {
  handleConfirmation = () => {
    this.props.handleConfirmation && this.props.handleConfirmation()
  }

  handleCancelation = () => {
    this.props.handleCancelation && this.props.handleCancelation()
  }

  render() {
    const { confirmationLabel, cancelationLabel } = this.props

    return (
      <Modal {...this.props}>
        {this.props.children}

        <div className="vtex-modal__confirmation flex justify-end mt8">
          <span className="mr4">
            <Button
              size="small"
              variation="tertiary"
              onClick={this.handleCancelation}
            >
              {cancelationLabel}
            </Button>
          </span>

          <Button
            size="small"
            variation="primary"
            onClick={this.handleConfirmation}
          >
            {confirmationLabel}
          </Button>
        </div>
      </Modal>
    )
  }
}

ModalDialog.propTypes = {
  children: PropTypes.node,
  handleConfirmation: PropTypes.func.isRequired,
  confirmationLabel: PropTypes.string.isRequired,
  handleCancelation: PropTypes.func.isRequired,
  cancelationLabel: PropTypes.string.isRequired,
}

export default ModalDialog
