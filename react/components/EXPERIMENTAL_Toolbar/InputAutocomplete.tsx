import React from 'react'

import AutocompleteInput, { AutocompleteInputProps } from '../AutocompleteInput'

interface Props extends AutocompleteInputProps {
  testId?: string
}

function InputAutocomplete({ testId, ...props }: Props) {
  return (
    <span className="w-40 order-0" data-testid={testId}>
      <AutocompleteInput {...props} />
    </span>
  )
}

export default InputAutocomplete
