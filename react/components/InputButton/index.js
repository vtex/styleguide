import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'
import { withForwardedRef } from '../../modules/withForwardedRef'

class InputButton extends Component {
  render() {
    const { button, isLoading, ...props } = this.props

    return (
      <div>
        <Input {...props} button={button} isLoadingButton={isLoading} />
      </div>
    )
  }
}

InputButton.defaultProps = {
  isLoading: false,
}

InputButton.propTypes = {
  /** (InputButton spec attribute) */
  button: PropTypes.string,
  /** Loading state */
  isLoading: PropTypes.bool,
}

export default withForwardedRef(InputButton)
