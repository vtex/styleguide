import React from 'react'
import PropTypes from 'prop-types'

import IconDownload from '../../icon/Download'
import ButtonToolbar from './ButtonToolbar'
import { constants } from '../util'

const ButtonDownload = ({ download, disabled }) => {
  return (
    <ButtonToolbar
      id="download"
      title={download.label}
      label={download.label}
      icon={<IconDownload size={constants.MEDIUM_ICON_SIZE} />}
      isLoading={download.isLoading}
      disabled={disabled}
      onClick={download.handleCallback}
    />
  )
}

ButtonDownload.propTypes = {
  download: PropTypes.shape({
    label: PropTypes.string,
    handleCallback: PropTypes.func,
    isLoading: PropTypes.bool,
  }),
  disabled: PropTypes.bool,
}

export default ButtonDownload
