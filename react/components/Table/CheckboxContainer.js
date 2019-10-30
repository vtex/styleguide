import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Checkbox from '../Checkbox'

class CheckboxContainer extends Component {
  static defaultProps = {
    partial: false,
    disabled: false,
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
      <div className="flex items-center justify-center aspect-ratio--object">
        <div
          className="br2 h2 w2 flex items-center justify-center"
          onClick={e => {
            e.stopPropagation()
            onClick(id)
            // prevents the onRowClick event from happening
          }}>
          <Checkbox
            checked={checked}
            partial={partial}
            value={`${id}`}
            id={`${id}`}
            name={`row_${id}`}
            onChange={() => {}}
            disabled={disabled}
          />
        </div>
      </div>
    )
  }
}

export default CheckboxContainer
