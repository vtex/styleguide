import React from 'react'
import PropTypes from 'prop-types'

import SubjectAtom from './Atoms/SubjectAtom'
import VerbAtom from './Atoms/VerbAtom'
import ObjectAtom from './Atoms/ObjectAtom'

class Statement extends React.Component {
  render() {
    const {
      isFullWidth,
      omitSubject,
      omitVerbs,
      onChangeStatement,
      options,
      statement,
      subjectPlaceholder,
    } = this.props

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
      statement.verb && ( // remove if there should be a disabled object input
        <ObjectAtom
          key="object"
          disabled={!statement.verb}
          error={statement.error}
          isFullWidth={isFullWidth}
          object={statement.object}
          onChange={(object, error) => {
            const newStatement = {
              ...statement,
              object,
              error,
            }
            onChangeStatement(newStatement)
          }}
          renderObject={
            options[statement.subject].verbs.find(
              verb => verb.value === statement.verb
            ).object
          }
        />
      ),
    ]

    return (
      <div className="flex-column w-100 mv3">
        <div
          className={`flex w-100 items-start ${
            isFullWidth ? 'flex-column items-stretch' : ''
          }`}>
          {statementAtoms}
        </div>
        {statement.error && statement.error.message && (
          <div className="red t-small mh3 mt2 lh-title">
            {statement.error.message}
          </div>
        )}
      </div>
    )
  }
}

Statement.defaultProps = {
  onChangeObjectCallback: () => {},
  statements: [{ subject: '', verb: '', object: null, error: null }],
  isFullWidth: false,
  statementIndex: 0,
  omitSubject: false,
  omitVerbs: false,
}

Statement.propTypes = {
  /** Current selected options for this Statement */
  statement: PropTypes.shape({
    subject: PropTypes.string,
    verb: PropTypes.string,
    object: PropTypes.any,
    error: PropTypes.string,
  }),
  /** Possible options and respective data types, verb options */
  options: PropTypes.object.isRequired,
  /** Placeholder for subject dropdown */
  subjectPlaceholder: PropTypes.string.isRequired,
  /** Stretch component to 100% of the width */
  isFullWidth: PropTypes.bool,
  /** Statement change callback */
  onChangeStatement: PropTypes.func.isRequired,
  /** To which row does this Statement belong to?  */
  statementIndex: PropTypes.number,
  /** Omits statement subject */
  omitSubject: PropTypes.bool,
  /** Omits statement verb */
  omitVerbs: PropTypes.bool,
  /** callback injected in object atom onChange so the state can be controlled by a HOC */
  onChangeObjectCallback: PropTypes.func,
}

export default Statement
