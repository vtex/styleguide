import React from 'react'

import IconCaretDown from '../icon/CaretDown/index.js'
import { Labels, Operator } from './typings'
import { DEFAULT_LABELS, SMALL_ICON_SIZE } from './constants'

type Props = {
  isRtl?: boolean
  labels: Pick<
    Labels,
    'headerPrefix' | 'headerSufix' | 'operatorAll' | 'operatorAny'
  >
  onChangeOperator: (operator: Props['operator']) => void
  operator: Operator
}

const StrategySelector: React.FC<Props> = ({
  isRtl,
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

  const seletorContent = [
    <span key="seletorContent-operator" className="mh3 b">
      {operator === 'all'
        ? labels.operatorAll || DEFAULT_LABELS.operatorAll
        : labels.operatorAny || DEFAULT_LABELS.operatorAny}
    </span>,
    <select
      key="seletorContent-select"
      className="o-0 absolute top-0 left-0 w-100 bottom-0 pointer t-small"
      onChange={handleOperatorChange}
      value={operator}
      style={{
        // safari select height fix
        WebkitAppearance: 'menulist-button',
      }}>
      <option value="all">
        {labels.operatorAll || DEFAULT_LABELS.operatorAll}
      </option>
      <option value="any">
        {labels.operatorAny || DEFAULT_LABELS.operatorAny}
      </option>
    </select>,
    <IconCaretDown key="seletorContent-icon" size={SMALL_ICON_SIZE} />,
  ]

  return (
    <div className="flex flex-row nowrap">
      <span className={isRtl ? 'mr3' : ''}>
        {labels.headerPrefix || DEFAULT_LABELS.headerPrefix}
      </span>
      <div className="c-link relative">
        {isRtl ? seletorContent.reverse() : seletorContent}
      </div>
      <span className={isRtl ? '' : 'ml3'}>
        {labels.headerSufix || DEFAULT_LABELS.headerSufix}
      </span>
    </div>
  )
}

export default StrategySelector
