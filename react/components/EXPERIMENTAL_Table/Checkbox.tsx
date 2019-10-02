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
  id?: string
  onClick?: (id: string) => void
  checked?: boolean
  disabled?: boolean
  partial?: boolean
}

Checkbox.defaultProps = {
  id: '',
  onClick: () => {},
  checked: false,
  partial: false,
  disabled: false,
}

export default Checkbox
