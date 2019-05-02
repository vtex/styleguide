import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import SubjectAtom from './Atoms/SubjectAtom'
import VerbAtom from './Atoms/VerbAtom'
import ObjectAtom from './Atoms/ObjectAtom'

class Statement extends Component {
  handleChangeStatement = (newValue, structure) => {
    this.props.onChangeStatement(newValue, structure)
  }

  resetPredicate = subjectValue => {
    const { options } = this.props

    this.handleChangeStatement(
      options[subjectValue].verbs[0].value ||
        Statement.defaultProps.statements[0].verb,
      'verb'
    )

    this.handleChangeStatement(
      Statement.defaultProps.statements[0].object,
      'object'
    )

    this.handleChangeStatement(null, 'error')
  }

  render() {
    const {
      options,
      subjectPlaceholder,
      isFullWidth,
      statements,
      statementIndex,
      omitSubject,
      omitVerbs,
      onChangeObjectCallback,
    } = this.props
    const condition = statements[statementIndex]
    const atomProps = {
      statements: statements,
      options: options,
      isFullWidth: isFullWidth,
      statementIndex: statementIndex,
      onChangeObjectCallback,
    }

    return (
      <div>
        <div className="flex-column w-100 mv3">
          <div
            className={`flex w-100 items-start ${
              isFullWidth ? 'flex-column items-stretch' : ''
            }`}>
            {omitSubject ? (
              omitVerbs ? (
                <ObjectAtom key="object" {...atomProps} />
              ) : (
                <Fragment>
                  {condition.subject && (
                    <VerbAtom
                      key="verb"
                      {...atomProps}
                      onChangeStatement={(value, structure) => {
                        this.handleChangeStatement(value, structure)
                      }}
                    />
                  )}
                  {condition.verb && <ObjectAtom key="object" {...atomProps} />}
                </Fragment>
              )
            ) : (
              <Fragment>
                <SubjectAtom
                  key="subject"
                  {...atomProps}
                  placeholder={subjectPlaceholder}
                  onChangeStatement={(value, structure) => {
                    this.handleChangeStatement(value, structure)
                    this.resetPredicate(value)
                  }}
                />
                {condition.subject && (
                  <VerbAtom
                    key="verb"
                    {...atomProps}
                    onChangeStatement={(value, structure) => {
                      this.handleChangeStatement(value, structure)
                    }}
                  />
                )}
                {condition.verb && <ObjectAtom key="object" {...atomProps} />}
              </Fragment>
            )}
          </div>
          {condition.error && condition.error.message && (
            <div className="red t-small mh3 mt2 lh-title">
              {condition.error.message}
            </div>
          )}
        </div>
      </div>
    )
  }
}

Statement.defaultProps = {
  onRemoveStatement: () => {},
  onChangeStatement: () => {},
  onChangeObjectCallback: () => {},
  statements: [{ subject: '', verb: '', object: null, error: null }],
  isFullWidth: false,
  statementIndex: 0,
  omitSubject: false,
  omitVerbs: false,
}

Statement.propTypes = {
  /** Current selected options for this Statement */
  statements: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.string,
      verb: PropTypes.string,
      object: PropTypes.any,
      error: PropTypes.string,
    })
  ),
  /** Possible options and respective data types, verb options */
  options: PropTypes.object.isRequired,
  /** Placeholder for subject dropdown */
  subjectPlaceholder: PropTypes.string.isRequired,
  /** Stretch component to 100% of the width */
  isFullWidth: PropTypes.bool,
  /** Statement change callback */
  onChangeStatement: PropTypes.func,
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
