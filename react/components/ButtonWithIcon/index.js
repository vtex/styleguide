import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

class ButtonWithIcon extends Component {
  static propTypes = {
    /** @ignore Button label */
    children: PropTypes.node,
    /** The icon image */
    icon: PropTypes.node.isRequired,
    /** Position of the icon */
    iconPosition: PropTypes.oneOf(['left', 'right']),
  }

  static defaultProps = {
    iconPosition: 'left',
  }

  render() {
    const { icon, iconPosition, children } = this.props

    const hasIconOnly = !children

    return (
      <Button {...this.props} icon={false} iconOnly={hasIconOnly}>
        {hasIconOnly ? (
          icon
        ) : (
          <span
            className={`flex items-center ${
              iconPosition === 'left' ? 'nr2' : 'nl2'
            }`}>
            {iconPosition === 'left' && (
              <div className="mr3 nl3 flex items-center">{icon}</div>
            )}
            <div>{children}</div>
            {iconPosition === 'right' && (
              <div className="ml3 nr3 flex items-center">{icon}</div>
            )}
          </span>
        )}
      </Button>
    )
  }
}

export default ButtonWithIcon
