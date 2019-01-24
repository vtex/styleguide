import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NumberFormat from 'react-number-format'

import Input from '../Input'

/** WORKAROUND incoming!
 * BaseInput is a wrapper for the Input component for being able to use the
 * prefix prop with the NumberFormat component.
 * We can remove this as soon as the following issue is resolved:
 * https://github.com/s-yadav/react-number-format/issues/276
 *
 */
var BaseInput = props => {
  const { inputPrefix: prefix } = props
  return <Input {...props} prefix={prefix} />
}

BaseInput.propTypes = {
  inputPrefix: PropTypes.string.isRequired,
}

class InputCurrency extends Component {
  handleClickClear = event => {
    this.props.onChange &&
      this.props.onChange({
        ...event,
        target: {
          ...event.target,
          value: '',
        },
      })
    this.props.onClear && this.props.onClear(event)
  }

  render() {
    const { currencySymbol, decimalSeparator, thousandSeparator } = this.props
    return (
      <div>
        <NumberFormat
          {...this.props}
          inputPrefix={currencySymbol}
          decimalSeparator={decimalSeparator}
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator={thousandSeparator}
          customInput={BaseInput}
        />
      </div>
    )
  }
}

const InputCurrencyWithRef = React.forwardRef((props, ref) => (
  <InputCurrency {...props} forwardedRef={ref} />
))

InputCurrencyWithRef.displayName = 'InputCurrency'

InputCurrencyWithRef.propTypes = {
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  size: PropTypes.string,
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  /** Currency symbol used as the input prefix. */
  currencySymbol: PropTypes.string,
  /** Character used for decimal separation. Eg: '.' in US$ 1,325.25. */
  decimalSeparator: PropTypes.string,
  /** Character used for thounsand separation. Eg: ',' in US$ 1,325.25. */
  thousandSeparator: PropTypes.string,
}

InputCurrencyWithRef.defaultProps = {
  currencySymbol: '¤',
  decimalSeparator: '.',
  thousandSeparator: ',',
}

InputCurrency.propTypes = InputCurrencyWithRef.propTypes

export default InputCurrencyWithRef
