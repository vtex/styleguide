import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import IconPlus from '../icon/Plus'
import IconClose from '../icon/Close'
import Separator from './Separator'
import StrategySelector from './StrategySelector'
import Statement from '../Statement'

class Conditions extends React.Component {
  objectIsEmpty = object => {
    if (object === undefined) return true
    if (object === null) return true
    if (object === '') return true
    if (Array.isArray(object) && object.length === 0) return true
    return false
  }

  canAddNewCondition = () => {
    const { statements } = this.props
    if (statements.length === 0) return true

    const hasIncompleteCondition = statements.some(
      condition =>
        condition.subject === '' ||
        condition.verb === '' ||
        this.objectIsEmpty(condition.object)
    )
    return !hasIncompleteCondition
  }

  handleAddNewCondition = () => {
    const emptyStatement = {
      subject: '',
      verb: '',
      object: null,
    }

    this.props.onChangeStatements([...this.props.statements, emptyStatement])
  }

  handleRemoveStatement = index => {
    const currentStatements = this.props.statements
    const updatedStatements = currentStatements
      .slice(0, index)
      .concat(currentStatements.slice(index + 1))

    this.props.onChangeStatements(updatedStatements)
  }

  render() {
    const {
      canDelete,
      statements,
      options,
      subjectPlaceholder,
      isFullWidth,
      isRtl,
      labels,
      showOperator,
      operator,
      onChangeStatements,
    } = this.props

    return (
      <div>
        {showOperator && (
          <div className="mh6">
            <StrategySelector
              operator={operator}
              labels={labels}
              onChangeOperator={operator =>
                this.props.onChangeOperator({ operator })
              }
            />
          </div>
        )}

        <div className="t-body c-on-base ph5 mt4 br3 b--muted-4 ba">
          {this.props.statements.length === 0 ? (
            <div className="mv6 mh3">
              <span className="light-gray">{labels.noConditions}</span>
            </div>
          ) : (
            <div className="mv5">
              {statements.map((statement, statementIndex) => {
                // if statement is configured as unique we should filter subject
                // options that were already selected in other statements.
                const uniqueBasedSubjects = Object.keys(options).filter(
                  subject =>
                    !options[subject].unique ||
                    !statements.some(
                      (stmt, idx) =>
                        stmt.subject === subject && idx !== statementIndex
                    )
                )

                const uniqueBasedOptions = uniqueBasedSubjects.reduce(
                  (uniqueOptions, subject) => ({
                    ...uniqueOptions,
                    [subject]: options[subject],
                  }),
                  {}
                )

                return (
                  <div
                    className="flex flex-column w-100 mv3"
                    key={statementIndex}>
                    <div
                      className={`flex ${
                        isFullWidth
                          ? 'flex-column items-strech'
                          : 'flex-row items-center'
                      }`}>
                      <div className="flex-grow-1">
                        <Statement
                          isRtl={isRtl}
                          isFullWidth={isFullWidth}
                          onChangeStatement={newStatement => {
                            const newStatements = statements.map(
                              (statement, idx) =>
                                idx === statementIndex
                                  ? newStatement
                                  : statement
                            )
                            onChangeStatements(newStatements)
                          }}
                          options={uniqueBasedOptions}
                          subjectPlaceholder={subjectPlaceholder}
                          statement={statement}
                          labels={labels}
                        />
                      </div>

                      {canDelete &&
                        (!isFullWidth ? (
                          <div
                            className="ma3 c-muted-2 pointer hover-c-danger"
                            onClick={() =>
                              this.handleRemoveStatement(statementIndex)
                            }>
                            <IconClose size={25} />
                          </div>
                        ) : (
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
                        ))}
                    </div>

                    {statementIndex !== statements.length - 1 && (
                      <Separator
                        label={
                          operator === 'all'
                            ? labels.operatorAnd || 'and'
                            : labels.operatorOr || 'or'
                        }
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <div
            style={{
              marginLeft: -17,
              width: 'calc(100% + 34px)',
            }}
            className="flex flex-row w-100 nowrap items-center mv3">
            <hr className="ma0 b--black-10 bb bb-0 w-100" />
          </div>

          <div style={{ marginLeft: -10 }} className="mv5">
            <Button
              variation="tertiary"
              size="small"
              disabled={!this.canAddNewCondition()}
              onClick={this.handleAddNewCondition}>
              <span className="flex align-baseline">
                <span className="mr2">
                  <IconPlus solid size={16} color="currentColor" />
                </span>
                {labels.addNewCondition}
              </span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

Conditions.defaultProps = {
  operator: 'any',
  showOperator: true,
  statements: [],
  onChangeOperator: () => {},
  onChangeStatements: () => {},
  labels: {
    addConditionBtn: 'add condition',
    addNewCondition: 'add new condition',
    delete: 'Remove',
    headerPrefix: 'Matching',
    headerSufix: 'following conditions:',
    noConditions: 'No conditions selected.',
    operatorAll: 'all',
    operatorAnd: 'and',
    operatorAny: 'any',
    operatorOr: 'or',
  },
}

Conditions.propTypes = {
  /** Shows or hides the delete button */
  canDelete: PropTypes.bool,
  /** Wether to show this component stretched to the width */
  isFullWidth: PropTypes.bool,
  /** Whether the order of elements and text if right to left */
  isRtl: PropTypes.bool,
  /** Labels for the controls and texts, default is english */
  labels: PropTypes.shape({
    addNewCondition: PropTypes.string,
    addConditionBtn: PropTypes.string,
    delete: PropTypes.string,
    noConditions: PropTypes.string,
    operatorAll: PropTypes.string,
    operatorAnd: PropTypes.string,
    operatorAny: PropTypes.string,
    operatorOr: PropTypes.string,
    headerPrefix: PropTypes.string,
    headerSufix: PropTypes.string,
  }),
  /** Conditions change callback: array of statement definitions */
  onChangeStatements: PropTypes.func.isRequired,
  /** Operator (any, all) change callback  */
  onChangeOperator: PropTypes.func,
  /** Operator indicates whether all the statements should be met or any of them */
  operator: PropTypes.oneOf(['all', 'any']),
  /** Possible options and respective data types, verb options */
  options: PropTypes.object.isRequired,
  /** Show or hide the header that selects the operator (any vs all) */
  showOperator: PropTypes.bool,
  /** Current selected options for all statements */
  statements: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.string,
      verb: PropTypes.string,
      object: PropTypes.any,
      error: PropTypes.any,
    })
  ),
  /** Placeholder for subject dropdown */
  subjectPlaceholder: PropTypes.string.isRequired,
}

export default Conditions
