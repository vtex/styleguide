import React, { Component } from 'react'

import Button from '../Button'
import ButtonWithIcon from '../ButtonWithIcon'
import ActionMenu from '../ActionMenu'
import { childrenOf } from '../utils'

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
  buttons: childrenOf(Button, ButtonWithIcon, ActionMenu),
}

export default ButtonGroup
