import React, { FC, useEffect } from 'react'
import PropTypes from 'prop-types'

import Modal, { Props as ModalProps } from '../Modal'
import Button from '../Button'

type DialogOption = {
  label: string
  onClick: () => unknown
}

type Props = Pick<
  ModalProps,
  'children' | 'isOpen' | 'onClose' | 'onCloseTransitionFinish' | 'container'
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
  useEffect(() => {
    console.warn(
      'ModalDialog will be deprecated soon, please prefer to use Modal component. https://styleguide.vtex.com/#/Components/Overlays/Modal'
    )
  }, [])

  return (
    <Modal
      {...props}
      bottomBar={
        <div>
          <span className="mr4">
            <Button
              size="small"
              type="button"
              variation="tertiary"
              disabled={loading}
              onClick={() => {
                cancelation.onClick?.()
              }}
            >
              {cancelation.label}
            </Button>
          </span>
          <Button
            size="small"
            type="button"
            variation={confirmation.isDangerous ? 'danger' : 'primary'}
            isLoading={loading}
            onClick={() => {
              confirmation.onClick?.()
            }}
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
