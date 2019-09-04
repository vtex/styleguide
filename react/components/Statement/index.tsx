import React from 'react'

import SubjectAtom from './Atoms/SubjectAtom'
import VerbAtom from './Atoms/VerbAtom'
import ObjectAtom from './Atoms/ObjectAtom'

type Props = {
  isFullWidth?: boolean
  isRtl?: boolean
  omitSubject?: boolean
  omitVerbs?: boolean
  onChangeStatement: (statement: Props['statement']) => void
  options: object
  statement?: {
    subject: string
    verb: string
    object?: unknown
    error?: string
  }
  subjectPlaceholder: string
}

const Statement: React.FC<Props> = ({
  isFullWidth = false,
  omitSubject,
  omitVerbs,
  onChangeStatement,
  options,
  statement = { subject: '', verb: '', object: null, error: null },
  subjectPlaceholder,
}) => {

  const statementAtoms = [
    !omitSubject && (
      <SubjectAtom
        key="subject"
        isFullWidth={isFullWidth}
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
    !omitVerbs && (
      <VerbAtom
        key="verb"
        disabled={!statement.subject}
        isFullWidth={isFullWidth}
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
    ),
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
      renderObject={
        statement.subject && options[statement.subject].verbs.find(
          verb => verb.value === statement.verb
        ).object
      }
    />,
  ]

    return (
      <div className="flex-column w-100 mv3">
        <div
          className={`flex w-100 items-start ${
            isFullWidth ? 'flex-column items-stretch' : ''
          }`}>
          {statementAtoms}
        </div>
        {statement.error && (
          <div className="red t-small mh3 mt2 lh-title">
            {statement.error}
          </div>
        )}
      </div>
    )
}

export default Statement
