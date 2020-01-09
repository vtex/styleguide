import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import IconClose from '../icon/Close'
import SubjectAtom from './Atoms/SubjectAtom'
import VerbAtom from './Atoms/VerbAtom'
import ObjectAtom from './Atoms/ObjectAtom'

class Statement extends React.Component {
  constructor(props) {
    super(props)
    this.handleChangeStatement(
      {
        subject: React.createRef(),
        verb: React.createRef(),
        object: React.createRef(),
      },
      'refs'
    )
  }

  handleChangeStatement = (newValue, structure) => {
    this.props.onChangeStatement(newValue, structure)
  }

  handleRemoveStatement = () => {
    this.props.onRemoveStatement()
  }

  getChoiceBySubject = subject => {
    const { options } = this.props
    return options[subject]
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

  clearObjects = () => {
    this.handleChangeStatement(
      Statement.defaultProps.statements[0].object,
      'object'
    )
    this.handleChangeStatement(null, 'error')
  }

  render() {
    const {
      canDelete,
      options,
      subjectPlaceholder,
      isRtl,
      isFullWidth,
      statements,
      statementIndex,
      labels,
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

    const statementAtoms = [
      <SubjectAtom
        ref={condition.refs.subject}
        key="subject"
        {...atomProps}
        placeholder={subjectPlaceholder}
        onChangeStatement={(value, structure) => {
          this.handleChangeStatement(value, structure)
          this.resetPredicate(value)
        }}
      />,
      <VerbAtom
        ref={condition.refs.verb}
        key="verb"
        {...atomProps}
        onChangeStatement={(value, structure) => {
          this.handleChangeStatement(value, structure)
        }}
      />,
      <ObjectAtom key="object" {...atomProps} />,
    ]

    return (
      <div>
        <div className="flex-column w-100 mv3">
          <div
            className={`flex w-100 items-start ${
              isFullWidth ? 'flex-column items-stretch' : ''
            }`}>
            {canDelete && !isFullWidth && isRtl && (
              <div
                className="ma3 c-muted-2 pointer hover-c-danger"
                onClick={this.handleRemoveStatement}>
                <IconClose size={25} />
              </div>
            )}
            {isRtl ? [...statementAtoms].reverse() : statementAtoms}
            {canDelete && !isFullWidth && !isRtl && (
              <div
                className="ma3 c-muted-2 pointer hover-c-danger"
                onClick={this.handleRemoveStatement}>
                <IconClose size={25} />
              </div>
            )}
            {canDelete && isFullWidth && (
              <div className="tr">
                <Button
                  variation="tertiary"
                  size="small"
                  onClick={this.handleRemoveStatement}>
                  <div className="dib">
                    <IconClose className="c-on-action-primary" />
                  </div>

                  <div className="dib mb1 v-mid" style={{ lineHeight: '10px' }}>
                    {labels.delete}
                  </div>
                </Button>
              </div>
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
  canDelete: true,
  statements: [{ subject: '', verb: '', object: null }],
  isRtl: false,
  isFullWidth: false,
  statementIndex: 0,
  labels: { delete: 'DELETE' },
}

Statement.propTypes = {
  /** Shows or hides the delete button */
  canDelete: PropTypes.bool,
  /** Current selected options for this Statement */
  statements: PropTypes.arrayOf(
    PropTypes.shape({
      refs: PropTypes.shape({
        subject: PropTypes.string,
        verb: PropTypes.string,
        object: PropTypes.any,
      }),
      error: PropTypes.string,
    })
  ),
  /** Possible options and respective data types, verb options */
  options: PropTypes.object.isRequired,
  /** Placeholder for subject dropdown */
  subjectPlaceholder: PropTypes.string.isRequired,
  /** Stretch component to 100% of the width */
  isFullWidth: PropTypes.bool,
  /** Whether the order of elements and text if right to left */
  isRtl: PropTypes.bool,
  /** Statement change callback */
  onChangeStatement: PropTypes.func,
  /** Statement remove callback */
  onRemoveStatement: PropTypes.func,
  /** To which row does this Statement belong to?  */
  statementIndex: PropTypes.number,
  /** Labels for the controls and texts, default is english */
  labels: PropTypes.shape({
    delete: PropTypes.string,
  }),
  /** Please use the following one with caution, I did not test it, so it can break everything */
  onChangeObjectCallback: PropTypes.func,
}

export default Statement
