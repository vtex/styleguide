import React from 'react'
import PropTypes from 'prop-types'

import CheckboxBase from '../../Checkbox/index.js'

const Checkbox = ({ checked, partial, id, onClick, disabled }) => {
  return (
    <div
      onClick={e => {
        e.stopPropagation()
        // prevents the onRowClick event from happening
      }}>
      <CheckboxBase
        checked={checked}
        partial={partial}
        value={`${id}`}
        id={`${id}`}
        name={`row_${id}`}
        onChange={() => onClick(id)}
        disabled={disabled}
      />
    </div>
  )
}

Checkbox.defaultProps = {
  partial: false,
  disabled: false,
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  partial: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Checkbox
