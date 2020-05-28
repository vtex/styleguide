import React, { FC } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button/index.js'

import './action-bar.global.css'

const propTypes = {
  /** The Save button props (label + Styleguide Button props) */
  save: PropTypes.shape({
    /** Label to save button */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** Styleguide Button props */
    ...Button.propTypes,
  }),
  /** The Cancel button props (label + Styleguide Button props) */
  cancel: PropTypes.shape({
    /** Label to save button */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** Styleguide Button props */
    ...Button.propTypes,
  }),
}

const defaultProps = {
  save: {},
  cancel: {},
}

const FloatingActionBar: FC<PropTypes.InferProps<typeof propTypes>> = ({
  save: { label: saveLabel, ...saveProps },
  cancel: { label: cancelLabel, ...cancelProps },
}) => (
  <div className="styleguide__floating-action-bar shadow-active w-100 bg-base tr pv5 pr7 absolute fixed bottom-0 left-0 z-999">
    <span className="mr5">
      <Button variation="tertiary" {...cancelProps}>
        {cancelLabel}
      </Button>
    </span>
    <span>
      <Button variation="primary" {...saveProps}>
        {saveLabel}
      </Button>
    </span>
  </div>
)

FloatingActionBar.propTypes = propTypes
FloatingActionBar.defaultProps = defaultProps

export default FloatingActionBar
