import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import IconPlus from '../icon/Plus'
import Separator from './Separator'
import StrategySelector from './StrategySelector'
import Statement from './Statement'

class Conditions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentStatements: props.statements,
    }
  }

  static defaultProps = {
    operator: 'any',
    showOperator: true,
    statements: [],
    onChangeOperator: () => {},
    onChangeStatements: () => {},
    labels: {
      operatorAll: 'all',
      operatorAnd: 'and',
      operatorAny: 'any',
      operatorOr: 'or',
      headerPrefix: 'Matching',
      headerSufix: 'following conditions:',
      addConditionBtn: 'add condition',
      noConditions: 'No conditions selected.',
      addNewCondition: 'add new condition',
    },
  }

  canAddNewCondition = () => {
    const { statements } = this.props
    if (statements.length === 0) return true

    const hasIncompleteCondition = statements.some(
      condition =>
        condition.subject === '' || condition.verb === '' || !condition.object
    )
    return !hasIncompleteCondition
  }

  handleAddNewCondition = () => {
    const emptyStatement = {
      subject: '',
      verb: '',
      object: null,
    }

    this.setState(
      prevState => {
        const updatedStatements = [...this.props.statements, emptyStatement]

        return {
          ...prevState,
          currentStatements: updatedStatements,
        }
      },
      () => {
        this.props.onChangeStatements(this.state.currentStatements)
      }
    )
  }

  handleRemoveStatement = index => {
    this.setState(
      prevState => {
        const currentStatements = this.props.statements
        const updatedStatements = currentStatements
          .slice(0, index)
          .concat(currentStatements.slice(index + 1))

        return {
          ...prevState,
          currentStatements: updatedStatements,
        }
      },
      () => {
        this.props.onChangeStatements(this.state.currentStatements)
      }
    )
  }

  handleChangeStatement = (statementIndex, newValue, structure) => {
    this.setState(
      prevState => {
        const updatedCurrentStatements = [...prevState.currentStatements]
        updatedCurrentStatements[statementIndex][structure] = newValue

        return {
          ...prevState,
          currentStatements: updatedCurrentStatements,
        }
      },
      () => {
        this.props.onChangeStatements(this.state.currentStatements)
      }
    )
  }

  componentDidMount() {
    console.warn(
      `Experimental component warning:
      
       Conditions component is in an experimental state.
       This component may suffer breaking changes in a near future, even in minor or patch versions.
       It may even cease to exist without further notice 👻`
    )
  }
  render() {
    const {
      canDelete,
      statements,
      choices,
      isFullWidth,
      isRtl,
      labels,
      showOperator,
      operator,
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
                return (
                  <div
                    className="flex flex-column w-100 mv3"
                    key={statementIndex}>
                    <Statement
                      canDelete={canDelete}
                      choices={choices}
                      isRtl={isRtl}
                      isFullWidth={isFullWidth}
                      onChangeStatement={(newValue, structure) => {
                        this.handleChangeStatement(
                          statementIndex,
                          newValue,
                          structure
                        )
                      }}
                      onRemoveStatement={() =>
                        this.handleRemoveStatement(statementIndex)
                      }
                      statements={statements}
                      statementIndex={statementIndex}
                      labels={labels}
                    />

                    {statementIndex !== statements.length - 1 && (
                      <Separator
                        label={
                          operator === 'all'
                            ? labels.operatorAnd
                            : labels.operatorOr
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

Conditions.propTypes = {
  /** Shows or hides the delete button */
  canDelete: PropTypes.bool,
  /** Operator indicates whether all the statements should be met or any of them */
  operator: PropTypes.oneOf(['all', 'any']),
  /** Current selected options for all statements */
  statements: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.string,
      verb: PropTypes.string,
      object: PropTypes.any,
      error: PropTypes.any,
    })
  ),
  /** Possible choices and respective data types, verb options */
  choices: PropTypes.object.isRequired,
  /** Wether to show this component stretched to the width */
  isFullWidth: PropTypes.bool,
  /** Conditions change callback: array of statement definitions */
  onChangeStatements: PropTypes.func,
  /** Operator (any, all) change callback  */
  onChangeOperator: PropTypes.func,
  /** Whether the order of elements and text if right to left */
  isRtl: PropTypes.bool,
  /** Show or hide the header that selects the operator (any vs all) */
  showOperator: PropTypes.bool,
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
}

export default Conditions
