import React, { FC, FormEvent, InputHTMLAttributes } from 'react'

import Input from '../../InputSearch/index'

export type InputSearchProps = InputHTMLAttributes<HTMLInputElement> & {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const InputSearch: FC<InputSearchProps> = ({ onSubmit, ...inputProps }) => {
  return (
    <form className="w-40" onSubmit={onSubmit}>
      <Input {...inputProps} />
    </form>
  )
}

export default InputSearch
