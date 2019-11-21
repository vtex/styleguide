import React, { FC } from 'react'
import csx from 'classnames'

import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'
import AutocompleteInput, {
  AutocompleteInputProps,
} from '../../AutocompleteInput'

const InputAutocomplete: FC<AutocompleteInputProps> = props => {
  return (
    <span
      className={csx(ORDER_CLASSNAMES.TOOLBAR_CHILD.INPUT, 'w-40')}
      id={NAMESPACES.TOOLBAR.INPUT_SEARCH}>
      <AutocompleteInput {...props} />
    </span>
  )
}

export default InputAutocomplete
