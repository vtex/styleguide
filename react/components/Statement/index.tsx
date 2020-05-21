import React from 'react'

import SubjectAtom, { SubjectOptions } from './Atoms/SubjectAtom'
import VerbAtom from './Atoms/VerbAtom'
import ObjectAtom from './Atoms/ObjectAtom'

type Props = {
  isFullWidth?: boolean
  isRtl?: boolean
  omitSubject?: boolean
  omitVerbs?: boolean
  onChangeStatement: (statement: Props['statement']) => void
  options: SubjectOptions
  statement?: {
    subject: string
    verb: string
    object?: unknown
    error?: string
  }
  subjectPlaceholder: string
  noOptionsMessage?: (value: string) => string | null
}

const Statement: React.FC<Props> = ({
  isFullWidth = false,
  isRtl,
  omitSubject,
  omitVerbs,
  onChangeStatement,
  options,
  statement = { subject: '', verb: '', object: null, error: null },
  subjectPlaceholder,
  noOptionsMessage,
}) => {
  const verbOptions =
    statement.subject &&
    options[statement.subject].verbs.find(verb => verb.value === statement.verb)
  const statementAtoms = [
    !omitSubject && (
      <SubjectAtom
        key="subject"
        noOptionsMessage={noOptionsMessage}
        onChange={subject => {
          const newStatement = {
            ...statement,
            subject,
            verb: options[subject].verbs[0].value,
            object: null,
            error: null,
          }
          onChangeStatement(newStatement)
        }}
        options={options}
        placeholder={subjectPlaceholder}
        subject={statement.subject}
      />
    ),
    !omitVerbs &&
      (verbOptions?.label ? (
        <VerbAtom
          key="verb"
          disabled={!statement.subject}
          onChange={verb => {
            const newStatement = {
              ...statement,
              verb,
              object: null,
              error: null,
            }
            onChangeStatement(newStatement)
          }}
          verb={statement.verb}
          verbOptions={
            statement.subject ? options[statement.subject].verbs : []
          }
        />
      ) : (
        <span className="mt3" />
      )),
    <ObjectAtom
      key="object"
      disabled={!statement.verb}
      error={statement.error}
      object={statement.object}
      onChange={(object, error = null) => {
        const newStatement = {
          ...statement,
          object,
          error,
        }
        onChangeStatement(newStatement)
      }}
      renderObject={verbOptions && verbOptions.object}
    />,
  ]

  return (
    <div className="flex-column w-100 mv6 mv3-ns">
      <div
        className={`flex items-start flex-wrap ${
          isFullWidth ? 'flex-column items-stretch' : ''
        }`}>
        {isRtl ? statementAtoms.reverse() : statementAtoms}
      </div>
      {statement.error && (
        <div className="red t-small mh3 mt2 lh-title">{statement.error}</div>
      )}
    </div>
  )
}

export default Statement
