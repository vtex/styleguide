import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

class ButtonGroup extends Component {
  render() {
    const { buttons } = this.props

    return (
      <div className="button_group flex flex-row">
        {buttons.map((btn, i) =>
          i === 0 ? (
            // First button
            <span key={i} className="mr1 isFirstOfGroup">
              <Button {...btn.props} isGrouped isFirstOfGroup />
            </span>
          ) : buttons.length - 1 === i ? (
            // Last button
            <Button key={i} {...btn.props} isGrouped isLastOfGroup />
          ) : (
            // Others
            <span key={i} className="mr1">
              <Button {...btn.props} isGrouped />
            </span>
          )
        )}
      </div>
    )
  }
}

ButtonGroup.defaultProps = {}

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.instanceOf(Button)),
}

export default ButtonGroup
