import React, { FC } from 'react'

import CheckboxBase from '../../Checkbox/index.js'

/**
 * Wrapper around Checkbox to avoid event propagation
 */
const Checkbox: FC<Props> = ({ checked, partial, id, onClick, disabled }) => (
  <div onClick={e => e.stopPropagation()}>
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

type Props = {
  id: string | number
  checked: boolean
  onClick: Function
  disabled?: boolean
  partial?: boolean
}

Checkbox.defaultProps = {
  partial: false,
  disabled: false,
}

export default Checkbox
