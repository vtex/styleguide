import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Dropdown from '../Dropdown'
import Input from '../Input'
import IconClose from '../icon/Close'

class Statement extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
    }
  }

  static EmptyObject = () => (
    <div className="flex-auto">
      <div className="mh3 mb3">
        <Input key={'object-0'} disabled />
      </div>
    </div>
  )

  static Dropdown = props => {
    return <Dropdown {...props} style={{ minWidth: '250px' }} />
  }

  static Subject = props => (
    <div className="flex-auto">
      <div className={`mh3 ${props.isFullWidth ? 'pb3' : ''}`}>
        <Statement.Dropdown
          options={props.options}
          value={!props.condition.subject ? '' : props.condition.subject || ''}
          onChange={(e, value) => props.onChange(value)}
        />
      </div>
    </div>
  )

  static Verb = props => (
    <div className={`mh3 ${props.isFullWidth ? 'pb3' : ''}`}>
      <Statement.Dropdown
        disabled={!props.condition.subject}
        options={props.verbs}
        value={!props.condition.subject ? '' : props.condition.verb || ''}
        onChange={(e, value) => {
          const foundVerb = props.verbs.find(verb => verb.value === value)
          props.onChange(foundVerb)
        }}
      />
    </div>
  )

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

  renderSubject = entities => {
    const { choices, statements, isFullWidth, statementIndex } = this.props
    const condition = statements[statementIndex]

    const options = Object.keys(choices).map(choiceKey => {
      return {
        value: choiceKey,
        label: choices[choiceKey].label,
        unique: choices[choiceKey].unique || false,
      }
    })

    const subjectsInUse = statements
      .map(statement => {
        return statement.subject
      })
      .filter(subject => {
        return subject !== ''
      })

    const uniqueOptions = options.filter(option => {
      if (!option.unique) {
        return true
      }

      const alreadyInUse = subjectsInUse.indexOf(option.value) > -1
      if (!alreadyInUse) {
        return true
      }

      if (subjectsInUse.indexOf(option.value) === statementIndex) {
        return true
      }

      return false
    })

    entities.push(
      <Statement.Subject
        condition={condition}
        options={uniqueOptions}
        isFullWidth={isFullWidth}
        onChange={selectedSubjectValue => {
          this.handleChangeStatement(selectedSubjectValue, 'subject')
          this.clearPredicate()
        }}
      />
    )

    return entities
  }

  renderVerbs = entities => {
    const { statements, choices, isFullWidth, statementIndex } = this.props
    const condition = statements[statementIndex]
    const myChoice = this.getChoiceBySubject(condition.subject)
    const desiredVerbs = []

    desiredVerbs.push(
      <Statement.Verb
        condition={condition}
        choices={choices}
        isFullWidth={isFullWidth}
        verbs={(myChoice && myChoice.verbs) || [{ label: '', value: '' }]}
        onChange={verb => {
          this.handleChangeStatement(verb.value, 'verb')
          this.clearObjects()
        }}
      />
    )

    entities.push(<div className="flex-auto">{desiredVerbs}</div>)

    return entities
  }

  renderObjects = entities => {
    const { statements, statementIndex, isFullWidth } = this.props
    const condition = statements[statementIndex]
    const myChoice = this.getChoiceBySubject(condition.subject)

    if (!condition.verb) {
      entities.push(<Statement.EmptyObject />)
      return entities
    }

    if (!myChoice) {
      entities.push(<Statement.EmptyObject />)
      return entities
    }

    const currentVerb = myChoice.verbs.find(
      verb => verb.value === condition.verb
    )

    if (!currentVerb) {
      entities.push(<Statement.EmptyObject />)
      return entities
    }

    entities.push(
      <div className="mh3 flex-auto">
        {currentVerb.object({
          statementIndex: statementIndex,
          statements: statements,
          isFullWidth: isFullWidth,
          values: condition.object,
          error: null,
        })}
      </div>
    )

    return entities
  }

  render() {
    const {
      canDelete,
      statements,
      isRtl,
      isFullWidth,
      statementIndex,
      labels,
    } = this.props
    const condition = statements[statementIndex]
    const order = isRtl ? 'OVS' : 'SVO'
    let statementAtoms = []

    order.split('').map(entity => {
      if (entity === 'S') {
        statementAtoms = this.renderSubject(statementAtoms)
      }

      if (entity === 'V') {
        statementAtoms = this.renderVerbs(statementAtoms)
      }

      if (entity === 'O') {
        statementAtoms = this.renderObjects(statementAtoms)
      }
    })

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
            {statementAtoms}
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
                    onClick={() => this.handleRemoveStatement()}>
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
              <div className="red f6 mh3 mt2 lh-title">
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
  order: 'SVO',
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
  /** In which row does this Statement belong to?  */
  statementIndex: PropTypes.number,
  /** Labels for the controls and texts, default is english */
  labels: PropTypes.shape({
    delete: PropTypes.string,
  }),
}

export default Statement
