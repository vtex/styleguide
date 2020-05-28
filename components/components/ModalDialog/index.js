import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Button from '../Button'

const NOOP = () => {}

class ModalDialog extends Component {
  handleCloseTransitionFinish = () => {
    this.props.onCloseTransitionFinish && this.props.onCloseTransitionFinish()
  }

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
    const { confirmation, cancelation, loading, onClose } = this.props

    return (
      <Modal
        {...this.props}
        onClose={loading ? NOOP : onClose}
        onCloseTransitionFinish={this.handleCloseTransitionFinish}>
        {this.props.children}
        <div className="vtex-modal__confirmation flex justify-end mt8">
          <span className="mr4">
            <Button
              size="small"
              variation="tertiary"
              disabled={loading}
              onClick={this.handleCancelation}>
              {cancelation.label}
            </Button>
          </span>

          <Button
            size="small"
            variation={confirmation.isDangerous ? 'danger' : 'primary'}
            isLoading={loading}
            onClick={this.handleConfirmation}>
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
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isDangerous: PropTypes.bool,
  }).isRequired,
  cancelation: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  onClose: PropTypes.func,
  loading: PropTypes.bool,
  onCloseTransitionFinish: PropTypes.func,
}

export default ModalDialog
