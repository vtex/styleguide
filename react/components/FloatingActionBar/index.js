import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

import './action-bar.global.css'

const FloatingActionBar = ({ onSave, onCancel, cancelLabel, saveLabel }) => (
  <div className="styleguide__floating-action-bar shadow-active w-100 bg-base tr pv5 absolute fixed bottom-0 left-0 z-2">
      <span className="mr5">
        <Button variation="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
      </span>
      <span>
        <Button variation="primary" onClick={onSave}>
          {saveLabel}
        </Button>
      </span>
  </div>
)

FloatingActionBar.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  cancelLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  saveLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default FloatingActionBar
