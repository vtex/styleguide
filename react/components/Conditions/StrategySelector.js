import React from 'react'
import PropTypes from 'prop-types'
import IconCaretDown from '../icon/CaretDown'

class StrategySelector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOperator: props.operator,
    }
  }

  handleOperatorChange = event => {
    const newOperator = event.target.value
    const { selectedOperator } = this.state
    if (selectedOperator !== newOperator) {
      this.props.onChangeOperator(newOperator)
      this.setState({ selectedOperator: newOperator })
    }
  }

  render() {
    const { labels } = this.props

    return (
      <div className="flex flex-row nowrap">
        <span>{labels.headerPrefix}</span>
        <div className="c-link relative">
          <span className="mh3 b">
            {this.state.selectedOperator === 'all'
              ? labels.operatorAll
              : labels.operatorAny}
          </span>
          <select
            className="o-0 absolute top-0 left-0 w-100 bottom-0 pointer f6"
            onChange={this.handleOperatorChange}
            value={this.state.selectedOperator}
            style={{
              // safari select height fix
              WebkitAppearance: 'menulist-button',
            }}>
            <option value="all">{labels.operatorAll}</option>
            <option value="any">{labels.operatorAny}</option>
          </select>
          <IconCaretDown size={14} />
        </div>
        <span className="ml3">{labels.headerSufix}</span>
      </div>
    )
  }
}

StrategySelector.propTypes = {
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

export default StrategySelector
