import React from 'react'
import PropTypes from 'prop-types'

import ButtonWithIcon from '../ButtonWithIcon/index'
import IconPlus from '../icon/Plus/index'
import IconClose from '../icon/Close/index'
import Separator from './Separator'
import StrategySelector from './StrategySelector'
import Statement from '../Statement/index'
import { Labels, Operator } from './typings'
import { DEFAULT_LABELS, MEDIUM_ICON_SIZE } from './constants'
import { SubjectOptions } from '../Statement/Atoms/SubjectAtom'

type Props = {
  canDelete?: boolean
  isFullWidth?: boolean
  isRtl?: boolean
  labels?: Labels
  onChangeStatements: (statement: Props['statements']) => void
  onChangeOperator: (operator: Props['operator']) => void
  operator: Operator
  options: SubjectOptions
  hideOperator?: boolean
  statements: {
    subject: string
    verb: string
    object?: unknown
    error?: string
  }[]
  subjectPlaceholder: string
}

const Conditions: React.FC<Props> = ({
  canDelete,
  statements,
  options,
  subjectPlaceholder,
  isFullWidth,
  isRtl,
  labels = {} as Props['labels'],
  hideOperator,
  operator,
  onChangeOperator,
  onChangeStatements,
}) => {
  const objectIsEmpty = object => {
    if (object === undefined) return true
    if (object === null) return true
    if (object === '') return true
    if (Array.isArray(object) && object.length === 0) return true
    return false
  }

  const canAddNewCondition = () => {
    if (statements.length === 0) return false

    const hasIncompleteCondition = statements.some(
      condition =>
        condition.subject === '' ||
        condition.verb === '' ||
        objectIsEmpty(condition.object)
    )
    return !hasIncompleteCondition
  }

  const handleAddNewCondition = () => {
    const emptyStatement = {
      subject: '',
      verb: '',
      object: null,
    }

    onChangeStatements([...statements, emptyStatement])
  }

  const handleRemoveStatement = index => {
    const updatedStatements = statements
      .slice(0, index)
      .concat(statements.slice(index + 1))

    onChangeStatements(updatedStatements)
  }

  const handleUpdatestatement = (newStatement, statementIndex) => {
    const newStatements = statements.map((statement, idx) =>
      idx === statementIndex ? newStatement : statement
    )
    onChangeStatements(newStatements)
  }

  return (
    <div>
      {!hideOperator && (
        <div className={`mh6 ${isRtl ? 'flex justify-end' : ''}`}>
          <StrategySelector
            isRtl={isRtl}
            operator={operator}
            labels={labels}
            onChangeOperator={operator => onChangeOperator(operator)}
          />
        </div>
      )}

      <div className="t-body c-on-base ph5 mt4 br3 b--muted-4 ba">
        {statements.length === 0 ? (
          <div className="flex-grow-1 mv6">
            <Statement
              isRtl={isRtl}
              isFullWidth={isFullWidth}
              onChangeStatement={newStatement =>
                onChangeStatements([newStatement])
              }
              options={options}
              subjectPlaceholder={subjectPlaceholder}
            />
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

              const statementContent = [
                <div key="1" className="flex-grow-1">
                  <Statement
                    isRtl={isRtl}
                    isFullWidth={isFullWidth}
                    onChangeStatement={newStatement => {
                      handleUpdatestatement(newStatement, statementIndex)
                    }}
                    options={uniqueBasedOptions}
                    subjectPlaceholder={subjectPlaceholder}
                    statement={statement}
                  />
                </div>,
                canDelete &&
                  (!isFullWidth ? (
                    <div
                      key="2"
                      className="ma3 c-muted-2 pointer hover-c-danger"
                      onClick={() => handleRemoveStatement(statementIndex)}>
                      <IconClose size={25} />
                    </div>
                  ) : (
                    <div key="3" className="tr mh3">
                      <ButtonWithIcon
                        variation="tertiary"
                        collapseRight
                        size="small"
                        icon={<IconClose className="c-on-action-primary" />}
                        onClick={() => handleRemoveStatement(statementIndex)}>
                        {labels.delete || DEFAULT_LABELS.delete}
                      </ButtonWithIcon>
                    </div>
                  )),
              ]

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
                    {isRtl ? statementContent.reverse() : statementContent}
                  </div>

                  {statementIndex !== statements.length - 1 && (
                    <Separator
                      label={
                        operator === 'all'
                          ? labels.operatorAnd || DEFAULT_LABELS.operatorAnd
                          : labels.operatorOr || DEFAULT_LABELS.operatorOr
                      }
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}
        <Separator />
        <div className={`mv5 mh3 ${isRtl ? 'flex justify-end' : ''}`}>
          <ButtonWithIcon
            variation="tertiary"
            collapseLeft
            size="small"
            icon={<IconPlus solid size={MEDIUM_ICON_SIZE} />}
            iconPosition={isRtl ? 'right' : 'left'}
            disabled={!canAddNewCondition()}
            onClick={handleAddNewCondition}>
            {labels.addNewCondition || DEFAULT_LABELS.addNewCondition}
          </ButtonWithIcon>
        </div>
      </div>
    </div>
  )
}

// this is so styleguidist can pick the prop types reference
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
  options: PropTypes.any.isRequired,
  /** Show or hide the header that selects the operator (any vs all) */
  hideOperator: PropTypes.bool,
  /** one statement = {subject: string, verb: string, object: unknown, error: string} */
  statements: PropTypes.array,
  /** Placeholder for subject dropdown */
  subjectPlaceholder: PropTypes.string.isRequired,
}

Conditions.defaultProps = {
  operator: 'any',
  hideOperator: false,
  statements: [],
  onChangeOperator: () => {},
  onChangeStatements: () => {},
  labels: {
    addNewCondition: 'add new condition',
    delete: 'Remove',
    headerPrefix: 'Matching',
    headerSufix: 'following conditions:',
    operatorAll: 'all',
    operatorAnd: 'and',
    operatorAny: 'any',
    operatorOr: 'or',
  },
}

export default Conditions
