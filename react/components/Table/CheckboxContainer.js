import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Checkbox from '../Checkbox'

class CheckboxContainer extends PureComponent {
  static defaultProps = {
    partial: false,
  }

  static propTypes = {
    checked: PropTypes.bool.isRequired,
    partial: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  render() {
    const { checked, partial, id, onClick } = this.props

    return (
      <Checkbox
        checked={checked}
        partial={partial}
        value={`${id}`}
        name={`row_${id}`}
        onChange={() => onClick(id)}
      />
    )
  }
}

export default CheckboxContainer
