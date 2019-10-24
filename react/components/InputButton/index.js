import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'

import { withForwardedRef } from '../../modules/withForwardedRef'

class InputButton extends Component {
  render() {
    const { button, ...props } = this.props

    return (
      <div>
        <Input {...props} button={button} />
      </div>
    )
  }
}

InputButton.propTypes = {
  button: PropTypes.string,
}

export default withForwardedRef(InputButton)
