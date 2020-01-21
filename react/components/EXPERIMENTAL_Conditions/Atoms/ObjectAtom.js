import React from 'react'
import PropTypes from 'prop-types'

import Input from '../../Input'

class ObjectAtom extends React.Component {
  static EmptyObjectAtom = () => (
    <div className="flex-auto">
      <div className="mh3 mb3">
        <Input disabled />
      </div>
    </div>
  )

  render() {
    const {
      options,
      isFullWidth,
      statements,
      statementIndex,
      onChangeObjectCallback,
    } = this.props
    const condition = statements[statementIndex]
    const myChoice = options[condition.subject]

    if (!condition.verb) {
      return <ObjectAtom.EmptyObjectAtom />
    }

    if (!myChoice) {
      return <ObjectAtom.EmptyObjectAtom />
    }

    const currentVerb = myChoice.verbs.find(
      verb => verb.value === condition.verb
    )

    if (!currentVerb) {
      return <ObjectAtom.EmptyObjectAtom />
    }

    return (
      <div className="mh3 flex-auto">
        {currentVerb.object.renderFn({
          statementIndex: statementIndex,
          statements: statements,
          isFullWidth: isFullWidth,
          values: condition.object,
          error: null,
          extraParams: currentVerb.object.extraParams,
          onChangeObjectCallback,
        })}
      </div>
    )
  }
}

ObjectAtom.defaultProps = {
  onChangeStatement: () => {},
  onChangeObjectCallback: () => {},
}

ObjectAtom.propTypes = {
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
  /** Stretch component to 100% of the width */
  isFullWidth: PropTypes.bool,
  /** To which row does this Statement belong to?  */
  statementIndex: PropTypes.number,
  /** Value changed callback */
  onChangeStatement: PropTypes.func,
  /** Object Value changed callback */
  onChangeObjectCallback: PropTypes.func,
}

export default ObjectAtom
