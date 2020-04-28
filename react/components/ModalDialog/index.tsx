import React, { FC } from 'react'
import PropTypes from 'prop-types'

import Modal, { Props as ModalProps } from '../Modal'
import Button from '../Button'

type DialogOption = {
  label: string
  onClick: () => unknown
}

type Props = Pick<
  ModalProps,
  'children' | 'isOpen' | 'onClose' | 'onCloseTransitionFinish'
> & {
  loading?: boolean
  confirmation: DialogOption & { isDangerous?: boolean | null }
  cancelation: DialogOption
}

const ModalDialog: FC<Props> = ({
  children,
  confirmation,
  cancelation,
  loading,
  ...props
}) => {
  const handleCancelation = () => {
    cancelation.onClick?.()
  }

  const handleConfirmation = () => {
    confirmation.onClick?.()
  }

  return (
    <Modal
      {...props}
      bottomBar={
        <div>
          <Button
            size="small"
            type="button"
            variation="tertiary"
            disabled={loading}
            onClick={handleCancelation}
          >
            {cancelation.label}
          </Button>
          <Button
            size="small"
            type="button"
            variation={confirmation.isDangerous ? 'danger' : 'primary'}
            isLoading={loading}
            onClick={handleConfirmation}
          >
            {confirmation.label}
          </Button>
        </div>
      }
    >
      {children}
    </Modal>
  )
}

ModalDialog.propTypes = {
  /** Content of the Modal. */
  children: PropTypes.node,
  /** Function called when Modal is closed. */
  onClose: PropTypes.func.isRequired,
  /** Show or hide the modal. */
  isOpen: PropTypes.bool.isRequired,
  /** Loading state. */
  loading: PropTypes.bool,
  /** Event fired when the closing transition is finished. */
  onCloseTransitionFinish: PropTypes.func,
  /** Confirmation option. */
  confirmation: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isDangerous: PropTypes.bool,
  }).isRequired,
  /** Cancelation option. */
  cancelation: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
}

ModalDialog.defaultProps = {
  isOpen: false,
  loading: false,
}

export default ModalDialog
