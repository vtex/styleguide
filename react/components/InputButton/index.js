import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'
import { withForwardedRef } from '../../modules/withForwardedRef'

class InputButton extends Component {
  render() {
    const { button, isLoading, buttonProps, ...props } = this.props

    return (
      <div>
        <Input
          {...props}
          button={button}
          buttonProps={buttonProps}
          isLoadingButton={isLoading}
        />
      </div>
    )
  }
}

InputButton.defaultProps = {
  buttonProps: {},
  isLoading: false,
}

InputButton.propTypes = {
  /** (InputButton spec attribute) */
  button: PropTypes.string,
  /** (InputButton spec attribute) */
  buttonProps: PropTypes.object,
  /** Loading state */
  isLoading: PropTypes.bool,
}

export default withForwardedRef(InputButton)
