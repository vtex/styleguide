import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'
import Button from '../Button'

class ModalDialog extends Component {
  handleConfirmation = () => {
    this.props.confirmation &&
      this.props.confirmation.onClick &&
      this.props.confirmation.onClick()
  }

  handleCancelation = () => {
    this.props.cancelation &&
      this.props.cancelation.onClick &&
      this.props.cancelation.onClick()
  }

  render() {
    const { confirmation, cancelation } = this.props

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
              {cancelation.label}
            </Button>
          </span>

          <Button
            size="small"
            variation="primary"
            onClick={this.handleConfirmation}
          >
            {confirmation.label}
          </Button>
        </div>
      </Modal>
    )
  }
}

ModalDialog.propTypes = {
  children: PropTypes.node,
  confirmation: PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  }).isRequired,
  cancelation: PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  }).isRequired,
}

export default ModalDialog
