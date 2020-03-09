import React, { FC, FormEvent, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

import Input from '../../InputSearch/index'
import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'
import { useToolbarContext } from './context'

export type InputSearchProps = InputHTMLAttributes<HTMLInputElement> & {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  standalone?: boolean
}

const InputSearch: FC<InputSearchProps> = ({
  onSubmit,
  standalone = false,
  ...inputProps
}) => {
  const { testId } = useToolbarContext()
  return (
    <form
      id={NAMESPACES.TOOLBAR.INPUT_SEARCH}
      data-testid={`${testId}__search-form`}
      className={classNames(ORDER_CLASSNAMES.TOOLBAR_CHILD.INPUT, {
        'w-100': standalone,
        'w-40': !standalone,
      })}
      onSubmit={onSubmit}>
      <Input testId={`${testId}__search-form__input`} {...inputProps} />
    </form>
  )
}

export default InputSearch
