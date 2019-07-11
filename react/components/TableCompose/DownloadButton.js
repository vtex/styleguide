import React from 'react'
import PropTypes from 'prop-types'

import IconDownload from '../icon/Download'
import ToolbarButton from './ToolbarButton'

const MEDIUM_ICON_SIZE = 14

const DownloadBtn = ({ download, disabled }) => {
  return (
    <ToolbarButton
      id="download"
      title={download.label}
      label={download.label}
      icon={<IconDownload size={MEDIUM_ICON_SIZE} />}
      isLoading={download.isLoading}
      disabled={disabled}
      onClick={download.handleCallback}
    />
  )
}

DownloadBtn.propTypes = {
  download: PropTypes.shape({
    label: PropTypes.string,
    handleCallback: PropTypes.func,
    isLoading: PropTypes.bool,
  }),
  disabled: PropTypes.bool,
}

export default DownloadBtn
