import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from '../Checkbox'

const CheckboxContainer = ({ checked, partial, id, onClick, disabled }) => {
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
        id={`${id}`}
        name={`row_${id}`}
        onChange={() => onClick(id)}
        disabled={disabled}
      />
    </div>
  )
}

CheckboxContainer.defaultProps = {
  partial: false,
  disabled: false,
}

CheckboxContainer.propTypes = {
  checked: PropTypes.bool.isRequired,
  partial: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default CheckboxContainer
