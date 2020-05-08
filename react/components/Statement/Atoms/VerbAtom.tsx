import React from 'react'

import Select from '../../EXPERIMENTAL_Select/index'
import { ObjectOption } from './ObjectAtom'

export type VerbOption = {
  label: string
  value: string
  object: ObjectOption
}

type Props = {
  disabled?: boolean
  verb?: string
  verbOptions: VerbOption[]
  onChange: (string) => void
}

const VerbAtom: React.FC<Props> = ({
  disabled,
  onChange,
  verb,
  verbOptions,
}) => {
  const value = verbOptions.find(option => option.value === verb)

  return value?.label ? (
    <div
      className="mh3 pb3 flex items-center"
      style={verbOptions.length !== 1 ? { minWidth: '20%' } : {}}>
      {verbOptions.length !== 1 ? (
        <div className="flex-auto">
          <Select
            clearable={false}
            disabled={disabled}
            multi={false}
            onChange={option => onChange(option && option.value)}
            options={verbOptions}
            placeholder=""
            value={value}
          />
        </div>
      ) : (
        <span className="pt3">{value.label}</span>
      )}
    </div>
  ) : (
    <span className="pt3" />
  )
}

export default VerbAtom
