import React from 'react'
import PropTypes from 'prop-types'

import IconUpload from '../../icon/Upload'
import ButtonToolbar from './ButtonToolbar'

import { constants } from '../util'

const ButtonUpload = ({ upload, disabled }) => {
  return (
    <ButtonToolbar
      id="upload"
      title={upload.label}
      label={upload.label}
      icon={<IconUpload size={constants.HEAVY_ICON_SIZE} />}
      isLoading={upload.isLoading}
      disabled={disabled}
      onClick={upload.handleCallback}
    />
  )
}

ButtonUpload.propTypes = {
  upload: PropTypes.shape({
    label: PropTypes.string,
    handleCallback: PropTypes.func,
    isLoading: PropTypes.bool,
  }),
  disabled: PropTypes.bool,
}

export default ButtonUpload
