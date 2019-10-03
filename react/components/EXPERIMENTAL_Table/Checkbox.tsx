import React, { FC } from 'react'

import CheckboxBase from '../Checkbox/index.js'

const Checkbox: FC<CheckboxProps> = ({ id, onClick, ...props }) => (
  <div onClick={e => e.stopPropagation()}>
    <CheckboxBase
      id={id}
      name={`row_${id}`}
      onChange={() => onClick(id)}
      {...props}
    />
  </div>
)

export type CheckboxProps = {
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
