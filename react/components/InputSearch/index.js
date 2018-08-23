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
    this.props.onChange &&
      this.props.onChange({
        ...event,
        target: {
          ...event.target,
          value: '',
        },
      })
  }

  render() {
    const size = this.props.size
    const iconSize = size === 'large' ? 18 : size === 'x-large' ? 20 : 16

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          {...this.props}
          type="search"
          suffixIcon={
            <span className="pointer">
              {this.props.value ? (
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

  value: PropTypes.String,
  onChange: PropTypes.func,
  size: PropTypes.string,
}

export default React.forwardRef((props, ref) => (
  <InputSearch {...props} forwardedRef={ref} />
))
