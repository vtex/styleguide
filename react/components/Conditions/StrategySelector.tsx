import React from 'react'
import PropTypes from 'prop-types'
import IconCaretDown from '../icon/CaretDown/index.js'

const SMALL_ICON_SIZE = 14

const propTypes = {
  /** Operator indicates whether all the conditions should be met or any of them */
  operator: PropTypes.oneOf(['all', 'any']),
  /** Operator change callback: one of 'any', 'all' */
  onChangeOperator: PropTypes.func,
  /** Labels for the controls and texts, default is english */
  labels: PropTypes.shape({
    operatorAll: PropTypes.string,
    operatorAny: PropTypes.string,
    headerPrefix: PropTypes.string,
    headerSufix: PropTypes.string,
  }),
}
type Props = PropTypes.InferProps<typeof propTypes>

const StrategySelector: React.FC<Props> = ({
  operator,
  onChangeOperator,
  labels,
}) => {
  const handleOperatorChange = event => {
    const newOperator = event.target.value
    if (operator !== newOperator) {
      onChangeOperator(newOperator)
    }
  }

  return (
    <div className="flex flex-row nowrap">
      <span>{labels.headerPrefix}</span>
      <div className="c-link relative">
        <span className="mh3 b">
          {operator === 'all'
            ? labels.operatorAll
            : labels.operatorAny}
        </span>
        <select
          className="o-0 absolute top-0 left-0 w-100 bottom-0 pointer t-small"
          onChange={handleOperatorChange}
          value={operator}
          style={{
            // safari select height fix
            WebkitAppearance: 'menulist-button',
          }}>
          <option value="all">{labels.operatorAll}</option>
          <option value="any">{labels.operatorAny}</option>
        </select>
        <IconCaretDown size={SMALL_ICON_SIZE} />
      </div>
      <span className="ml3">{labels.headerSufix}</span>
    </div>
  )
}

export default StrategySelector
