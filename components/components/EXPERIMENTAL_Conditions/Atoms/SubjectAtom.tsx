import React from 'react'
import PropTypes from 'prop-types'

import Select from '../../EXPERIMENTAL_Select'
import { withForwardedRef, refShape } from '../../../modules/withForwardedRef'

class SubjectAtom extends React.Component {
  handleChangeStatement = (newValue, structure) => {
    this.props.onChangeStatement(newValue, structure)
  }

  render() {
    const {
      forwardedRef,
      options,
      statements,
      isFullWidth,
      statementIndex,
      placeholder,
    } = this.props
    const condition = statements[statementIndex]

    const subjectOptions = Object.keys(options).map(choiceKey => {
      return {
        value: choiceKey,
        label: options[choiceKey].label,
        unique: options[choiceKey].unique || false,
      }
    })

    const subjectsInUse = statements
      .map(statement => {
        return statement.subject
      })
      .filter(subject => {
        return subject !== ''
      })

    const uniqueOptions = subjectOptions.filter(option => {
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
      <div className={`mh3 ${isFullWidth ? 'pb3' : ''} w-30`}>
        <Select
          ref={forwardedRef}
          placeholder={placeholder}
          options={uniqueOptions}
          value={
            !condition.subject
              ? ''
              : uniqueOptions.find(
                  option => option.value === condition.subject
                ) || ''
          }
          onChange={value => {
            const subject = value !== null ? value.value : null
            this.handleChangeStatement(subject, 'subject')
          }}
          multi={false}
        />
      </div>
    )
  }
}

SubjectAtom.defaultProps = {
  onChangeStatement: () => {},
}

SubjectAtom.propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
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
  /** Placeholder for dropdown */
  placeholder: PropTypes.string.isRequired,
  /** Stretch component to 100% of the width */
  isFullWidth: PropTypes.bool,
  /** To which row does this Statement belong to?  */
  statementIndex: PropTypes.number,
  /** Value changed callback */
  onChangeStatement: PropTypes.func,
}

export default withForwardedRef(SubjectAtom)
