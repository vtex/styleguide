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

    this.state = {
      error: null,
    }
  }

  handleChangeStatement = (newValue, structure) => {
    this.props.onChangeStatement(newValue, structure)
  }

  handleRemoveStatement = () => {
    this.props.onRemoveStatement()
  }

  getChoiceBySubject = subject => {
    const { choices } = this.props
    return choices[subject]
  }

  clearPredicate = () => {
    this.handleChangeStatement(
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
      choices,
      isRtl,
      isFullWidth,
      statements,
      statementIndex,
      labels,
    } = this.props
    const condition = statements[statementIndex]
    const atomProps = {
      statements: statements,
      choices: choices,
      isFullWidth: isFullWidth,
      statementIndex: statementIndex,
    }

    const statementAtoms = [
      <SubjectAtom
        key="subject"
        {...atomProps}
        onChangeStatement={(value, structure) => {
          this.handleChangeStatement(value, structure)
          this.clearPredicate()
        }}
      />,
      <VerbAtom
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
            {canDelete &&
              !isFullWidth &&
              isRtl && (
                <div
                  className="ma3 c-muted-2 pointer hover-c-danger"
                  onClick={this.handleRemoveStatement}>
                  <IconClose size={25} />
                </div>
              )}
            {isRtl ? [...statementAtoms].reverse() : statementAtoms}
            {canDelete &&
              !isFullWidth &&
              !isRtl && (
                <div
                  className="ma3 c-muted-2 pointer hover-c-danger"
                  onClick={this.handleRemoveStatement}>
                  <IconClose size={25} />
                </div>
              )}
            {canDelete &&
              isFullWidth && (
                <div className="tr">
                  <Button
                    variation="tertiary"
                    size="small"
                    onClick={this.handleRemoveStatement}>
                    <div className="dib">
                      <IconClose className="c-on-action-primary" />
                    </div>

                    <div
                      className="dib mb1 v-mid"
                      style={{ lineHeight: '10px' }}>
                      {labels.delete}
                    </div>
                  </Button>
                </div>
              )}
          </div>
          {condition.error &&
            condition.error.message && (
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
      subject: PropTypes.string,
      verb: PropTypes.string,
      object: PropTypes.any,
      error: PropTypes.string,
    })
  ),
  /** Possible choices and respective data types, verb options */
  choices: PropTypes.object.isRequired,
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
}

export default Statement
