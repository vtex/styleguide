import React from 'react'
import Dropdown from '../../Dropdown'
import PropTypes from 'prop-types'

class SubjectAtom extends React.Component {
  handleChangeStatement = (newValue, structure) => {
    this.props.onChangeStatement(newValue, structure)
  }

  render() {
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

    return (
      <div className="flex-auto">
        <div className={`mh3 ${isFullWidth ? 'pb3' : ''}`}>
          <Dropdown
            options={uniqueOptions}
            value={!condition.subject ? '' : condition.subject || ''}
            onChange={(e, value) =>
              this.handleChangeStatement(value, 'subject')
            }
          />
        </div>
      </div>
    )
  }
}

SubjectAtom.defaultProps = {
  onChangeStatement: () => {},
}

SubjectAtom.propTypes = {
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
  /** To which row does this Statement belong to?  */
  statementIndex: PropTypes.number,
  /** Value changed callback */
  onChangeStatement: PropTypes.func,
}

export default SubjectAtom
