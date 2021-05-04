import React, { FC, FormEvent, InputHTMLAttributes } from 'react'

import Input from '../../InputSearch/index'
import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'
import { useToolbarContext } from './context'

export type InputSearchProps = InputHTMLAttributes<HTMLInputElement> & {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const InputSearch: FC<InputSearchProps> = props => {
  const { testId } = useToolbarContext()
  return (
    <form
      id={NAMESPACES.TOOLBAR.INPUT_SEARCH}
      data-testid={`${testId}__search-form`}
      className={ORDER_CLASSNAMES.TOOLBAR_CHILD.INPUT}
      onSubmit={e => {
        e.preventDefault()
      }}>
      <Input testId={`${testId}__search-form__input`} {...props} />
    </form>
  )
}

export default InputSearch
