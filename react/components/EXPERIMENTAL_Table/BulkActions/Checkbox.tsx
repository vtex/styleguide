import React, { FC } from 'react'

import CheckboxBase from '../../Checkbox/index.js'

/**
 * Wrapper around Checkbox to avoid event propagation
 */
const Checkbox: FC<Props> = ({ id, onClick, ...props }) => (
  <div onClick={e => e.stopPropagation()}>
    <CheckboxBase
      id={id}
      name={`row_${id}`}
      onChange={() => onClick(id)}
      {...props}
    />
  </div>
)

type Props = {
  id: string
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
