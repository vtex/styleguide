import React from 'react'
import PropTypes from 'prop-types'

import IconUpload from '../icon/Upload'
import ToolbarButton from './ToolbarButton'

const HEAVY_ICON_SIZE = 13

const UploadBtn = ({ upload, disabled }) => {
  return (
    <ToolbarButton
      id="upload"
      title={upload.label}
      label={upload.label}
      icon={<IconUpload size={HEAVY_ICON_SIZE} />}
      isLoading={upload.isLoading}
      disabled={disabled}
      onClick={upload.handleCallback}
    />
  )
}

UploadBtn.propTypes = {
  upload: PropTypes.shape({
    label: PropTypes.string,
    handleCallback: PropTypes.func,
    isLoading: PropTypes.bool,
  }),
  disabled: PropTypes.bool,
}

export default UploadBtn
