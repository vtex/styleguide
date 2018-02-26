import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'

import Spinner from '../Spinner'

class Button extends Component {
  handleClick = event => {
    !this.props.disabled && this.props.onClick && this.props.onClick(event)
  }

  render() {
    const {
      primary,
      secondary,
      disabled,
      isLoading,
      children,
      htmlProps,
    } = this.props
    const isIconButton = children.type === Icon
    const CustomTag = isIconButton ? 'div' : 'button'

    if (secondary && primary) {
      throw new Error('Button component cannot be primary AND secondary')
    }

    let classes = 'fw5 ttu br2 fw4 f7 '

    classes += isIconButton ? 'icon-button pa3 ' : 'pv3 ph5 '

    if (!secondary && !primary && !disabled) {
      classes +=
        'bw1 ba b--white blue hover-bg-light-silver hover-b--light-silver '
    }

    if (secondary && !disabled) {
      classes += 'bw1 ba b--blue blue hover-white '
    }
    if (secondary && !isLoading) {
      classes += 'hover-bg-blue '
    }

    if (primary && !disabled) {
      classes +=
        'bw1 ba b--blue bg-blue white hover-bg-heavy-blue hover-b--heavy-blue '
    }

    if (disabled) {
      classes += 'bw1 ba b--light-gray bg-light-gray gray '
    } else {
      classes += 'pointer '
    }

    classes += ` ${htmlProps.className}`

    return (
      <CustomTag
        {...this.props.htmlProps}
        className={`${classes}`}
        onClick={this.handleClick}
        disabled={!isIconButton && disabled}
      >
        {isLoading ? (
          <Spinner width={11} height={11} secondary={primary} />
        ) : (
          this.props.children
        )}
      </CustomTag>
    )
  }
}

Button.defaultProps = {
  primary: false,
  secondary: false,
  disabled: false,
  isLoading: false,
  htmlProps: {},
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  htmlProps: PropTypes.object,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
