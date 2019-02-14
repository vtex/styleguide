import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Checkbox from '../Checkbox'

class CheckboxContainer extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.any,
  }

  render() {
    const { checked, id, onClick } = this.props

    return (
      <Checkbox
        checked={checked}
        value={`${id}`}
        name={`row_${id}`}
        onChange={() => onClick(id)}
      />
    )
  }
}

export default CheckboxContainer
