import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'
import Input from '../Input'
import SearchIcon from '../icon/Search'
import DenyIcon from '../icon/Deny'

class InputSearch extends Component {
  handleSubmit = event => {
    this.props.onSubmit && this.props.onSubmit(event)
  }

  handleClickClear = event => {
    this.props.inputProps.onChange &&
      this.props.inputProps.onChange({
        ...event,
        target: {
          ...event.target,
          value: '',
        },
      })
  }

  render() {
    const size = this.props.inputProps.size
    const iconSize = size === 'large' ? 18 : size === 'x-large' ? 20 : 16

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          {...this.props.inputProps}
          suffixIcon={
            <span className="pointer">
              {this.props.inputProps.value ? (
                <span
                  tabIndex={0}
                  onClick={this.handleClickClear}
                  className="pointer"
                >
                  <DenyIcon color={config.colors.blue} size={iconSize} />
                </span>
              ) : (
                <SearchIcon color={config.colors.blue} size={iconSize} />
              )}
            </span>
          }
        />
      </form>
    )
  }
}

InputSearch.defaultProps = {}

InputSearch.propTypes = {
  /** onSubmit event */
  onSubmit: PropTypes.func,
  /** Input props */
  inputProps: PropTypes.object,
}

export default React.forwardRef((props, ref) => (
  <InputSearch {...props} forwardedRef={ref} />
))
