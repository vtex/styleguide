import React from 'react'

import Select from '../../EXPERIMENTAL_Select/index'
import { ObjectOption } from './ObjectAtom'
import { SelectOption } from '../typings'

export type VerbOption = {
  label: string
  value: string
  object: ObjectOption
}

type Props = {
  disabled?: boolean
  isFullWidth?: boolean
  verb?: string
  verbOptions: VerbOption[]
  onChange: (e: string) => void
}

const VerbAtom: React.FC<Props> = ({
  disabled,
  isFullWidth,
  onChange,
  verb,
  verbOptions,
}) => {
  const value = verbOptions.find(option => option.value === verb)

  return (
    <div
      className={`mh3 ${isFullWidth ? 'pb3' : ''} flex items-center`}
      style={verbOptions.length !== 1 ? { minWidth: '20%' } : {}}
    >
      {verbOptions.length !== 1 ? (
        <div className="flex-auto">
          <Select
            clearable={false}
            disabled={disabled}
            multi={false}
            onChange={(option: SelectOption<string>) => onChange(option.value)}
            options={verbOptions}
            placeholder=""
            value={value}
          />
        </div>
      ) : (
        <span>{value?.label ?? ''}</span>
      )}
    </div>
  )
}

export default VerbAtom
