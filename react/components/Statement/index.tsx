import React from 'react'

import SubjectAtom, { SubjectOptions } from './Atoms/SubjectAtom'
import VerbAtom, { VerbOption } from './Atoms/VerbAtom'
import ObjectAtom from './Atoms/ObjectAtom'
import { StatementProp } from './typings'

type StatementProps = {
  isFullWidth?: boolean
  isRtl?: boolean
  omitSubject?: boolean
  omitVerbs?: boolean
  onChangeStatement: (statement: StatementProp) => void
  options: SubjectOptions
  statement?: StatementProp
  subjectPlaceholder: string
}

const NoopComponent = () => <></>

const Statement: React.FC<StatementProps> = ({
  isFullWidth = false,
  isRtl,
  omitSubject,
  omitVerbs,
  onChangeStatement,
  options,
  statement = { subject: '', verb: '', object: null },
  subjectPlaceholder,
}) => {
  let verbOptions: VerbOption = {
    label: '',
    value: '',
    object: NoopComponent,
  }

  if (statement.subject) {
    const foundOption = options[statement.subject].verbs.find(
      verb => verb.value === statement.verb
    )

    if (foundOption) {
      verbOptions = foundOption
    }
  }

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
            object: undefined,
            error: undefined,
          }
          onChangeStatement(newStatement)
        }}
        verb={statement.verb}
        verbOptions={statement.subject ? options[statement.subject].verbs : []}
      />
    ),
    <ObjectAtom
      key="object"
      disabled={!statement.verb}
      error={statement.error}
      object={statement.object}
      onChange={(object, error) => {
        const newStatement = {
          ...statement,
          object,
          error,
        }
        onChangeStatement(newStatement)
      }}
      renderObject={verbOptions?.object}
    />,
  ]

  return (
    <div className="flex-column w-100 mv6 mv3-ns">
      <div
        className={`flex w-100 items-start ${
          isFullWidth ? 'flex-column items-stretch' : ''
        }`}
      >
        {isRtl ? statementAtoms.reverse() : statementAtoms}
      </div>
      {statement.error && (
        <div className="red t-small mh3 mt2 lh-title">{statement.error}</div>
      )}
    </div>
  )
}

export default Statement
