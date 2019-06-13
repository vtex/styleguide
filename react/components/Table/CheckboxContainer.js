import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Checkbox from '../Checkbox'

class CheckboxContainer extends Component {
  static defaultProps = {
    partial: false,
  }

  static propTypes = {
    checked: PropTypes.bool.isRequired,
    partial: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  render() {
    const { checked, partial, id, onClick, disabled } = this.props

    return (
      <div
        onClick={e => {
          e.stopPropagation()
          // prevents the onRowClick event from happening
        }}>
        <Checkbox
          checked={checked}
          partial={partial}
          value={`${id}`}
          name={`row_${id}`}
          onChange={() => onClick(id)}
          disabled={disabled}
        />
      </div>
    )
  }
}

export default CheckboxContainer
