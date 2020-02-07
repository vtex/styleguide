import React, { FC } from 'react'
import classNames from 'classnames'

import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'
import AutocompleteInput, {
  AutocompleteInputProps,
} from '../../AutocompleteInput'
import { useToolbarContext } from './context'

const InputAutocomplete: FC<AutocompleteInputProps> = props => {
  const { testId } = useToolbarContext()
  return (
    <span
      className={classNames(ORDER_CLASSNAMES.TOOLBAR_CHILD.INPUT, 'w-40')}
      id={NAMESPACES.TOOLBAR.INPUT_SEARCH}
      data-testid={`${testId}__input-autocomplete`}>
      <AutocompleteInput {...props} />
    </span>
  )
}

export default InputAutocomplete
