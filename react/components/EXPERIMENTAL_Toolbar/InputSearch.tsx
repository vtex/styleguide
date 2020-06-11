import React, { InputHTMLAttributes, FormEvent } from 'react'

import Input from '../InputSearch'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  testId?: string
  onSubmit: (event: FormEvent<HTMLElement>) => void
}

function InputSearch({ testId, onSubmit, ...props }: Props) {
  return (
    <form data-testid={testId} className="order-0 w-40" onSubmit={onSubmit}>
      <Input {...props} />
    </form>
  )
}

export default InputSearch
