import React, { FC, FormEvent, InputHTMLAttributes } from 'react'

import Input from '../../InputSearch/index'
import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'

export type InputSearchProps = InputHTMLAttributes<HTMLInputElement> & {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const InputSearch: FC<InputSearchProps> = ({ onSubmit, ...inputProps }) => {
  return (
    <form
      id={NAMESPACES.TOOLBAR.INPUT_SEARCH}
      className={ORDER_CLASSNAMES.TOOLBAR_CHILD.INPUT}
      onSubmit={onSubmit}>
      <Input {...inputProps} />
    </form>
  )
}

export default InputSearch
