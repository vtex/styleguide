import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import ButtonWithIcon from '../ButtonWithIcon'

class ButtonGroup extends Component {
  render() {
    const { buttons } = this.props

    return (
      <div className="button_group flex flex-row">
        {buttons.map((btn, i) => {
          const TagName = btn.type

          return i === 0 ? (
            // First button
            <span key={i} className="mr1 isFirstOfGroup">
              <TagName {...btn.props} isGrouped isFirstOfGroup />
            </span>
          ) : buttons.length - 1 === i ? (
            // Last button
            <TagName key={i} {...btn.props} isGrouped isLastOfGroup />
          ) : (
            // Others
            <span key={i} className="mr1">
              <TagName {...btn.props} isGrouped />
            </span>
          )
        })}
      </div>
    )
  }
}

ButtonGroup.defaultProps = {}

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(Button),
      PropTypes.instanceOf(ButtonWithIcon),
    ])
  ),
}

export default ButtonGroup
