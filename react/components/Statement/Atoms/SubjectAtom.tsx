/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import Select from '../../EXPERIMENTAL_Select/index'
import { VerbOption } from './VerbAtom'
import {
  GroupedOptions,
  SelectOptionGroup,
  SelectedOption,
  SelectOption,
} from '../typings'

const ATOM_COMPONENT_MIN_WIDTH = '20%'

export type SubjectOptions = {
  [key: string]: {
    group?: string
    label: string
    unique?: boolean
    verbs: VerbOption[]
  }
}

type Props = {
  subject?: string
  onChange: (e: string) => void
  options: SubjectOptions
  placeholder: string
  isFullWidth: boolean
}

const groupOptions = (options: Record<string, any>) => {
  const groupedOptions = Object.keys(options).reduce<GroupedOptions>(
    (optionsGroup, subject) => {
      const option = options[subject]
      return {
        ...optionsGroup,
        [option.group]: [
          ...(optionsGroup[option.group] || []),
          {
            value: subject,
            label: option.label || subject,
          },
        ],
      }
    },
    {}
  )

  return Object.keys(groupedOptions).map<SelectOptionGroup>(group => {
    return {
      label: group,
      options: groupedOptions[group],
    }
  })
}

const SubjectAtom: React.FC<Props> = ({
  isFullWidth,
  onChange,
  options,
  placeholder,
  subject,
}) => {
  const optionsGroup = groupOptions(options)

  const subjectOptions =
    optionsGroup.length === 1 && optionsGroup[0].label === 'undefined'
      ? optionsGroup[0].options
      : optionsGroup

  const selected = optionsGroup.reduce<SelectedOption | undefined>(
    (selectedOption: any, group: any) => {
      if (selectedOption) {
        return selectedOption
      }

      const option = group.options.find(
        (groupOption: SelectOption<string>) => groupOption.value === subject
      )

      if (option) {
        return {
          group: group.label !== 'undefined' ? group.label : undefined,
          option,
        }
      }

      return undefined
    },
    undefined
  )

  return (
    <div
      className={`mh3 ${isFullWidth ? 'pb3' : ''}`}
      style={{ minWidth: ATOM_COMPONENT_MIN_WIDTH }}
    >
      <Select
        clearable={false}
        multi={false}
        onChange={(option: SelectOption<string>) => onChange(option.value)}
        options={subjectOptions}
        placeholder={placeholder}
        value={selected?.option}
      />
    </div>
  )
}

export default SubjectAtom
