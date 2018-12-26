import React from 'react'
import Dropdown from '../../Dropdown'
import PropTypes from 'prop-types'

class VerbAtom extends React.Component {
  static Dropdown = props => (
    <div className={`mh3 ${props.isFullWidth ? 'pb3' : ''}`}>
      <Dropdown
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

  render() {
    const { choices, isFullWidth, statements, statementIndex } = this.props
    const condition = statements[statementIndex]
    const myChoice = choices[condition.subject]

    return (
      <div className="flex-auto">
        <VerbAtom.Dropdown
          condition={condition}
          choices={choices}
          isFullWidth={isFullWidth}
          verbs={(myChoice && myChoice.verbs) || [{ label: '', value: '' }]}
          onChange={verb => {
            this.handleChangeStatement(verb.value, 'verb')
          }}
        />
      </div>
    )
  }
}

VerbAtom.defaultProps = {
  onChangeStatement: () => {},
}

VerbAtom.propTypes = {
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

export default VerbAtom
