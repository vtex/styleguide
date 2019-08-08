import React from 'react'
import Dropdown from '../../Dropdown'
import PropTypes from 'prop-types'
import { withForwardedRef, refShape } from '../../../modules/withForwardedRef'

class VerbAtom extends React.Component {
  handleChangeStatement = (newValue, structure) => {
    this.props.onChangeStatement(newValue, structure)
  }

  render() {
    const {
      forwardedRef,
      options,
      isFullWidth,
      statements,
      statementIndex,
    } = this.props
    const condition = statements[statementIndex]
    const myChoice = options[condition.subject]
    const verbs = (myChoice && myChoice.verbs) || [{ label: '', value: '' }]
    return (
      <div className={`mh3 ${isFullWidth ? 'pb3' : ''}`}>
        <Dropdown
          ref={forwardedRef}
          disabled={!condition.subject}
          options={verbs}
          value={!condition.subject ? '' : condition.verb || ''}
          onChange={(e, value) => {
            const foundVerb = verbs.find(verb => verb.value === value)
            this.handleChangeStatement(foundVerb.value, 'verb')
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
  /** Stretch component to 100% of the width */
  isFullWidth: PropTypes.bool,
  /** To which row does this Statement belong to?  */
  statementIndex: PropTypes.number,
  /** Value changed callback */
  onChangeStatement: PropTypes.func,
}

export default withForwardedRef(VerbAtom)
