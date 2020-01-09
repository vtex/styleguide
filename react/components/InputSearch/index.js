import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'
import SearchIcon from '../icon/Search'
import ClearIcon from '../icon/Clear'
import { withForwardedRef, refShape } from '../../modules/withForwardedRef'

class InputSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      focus: false,
    }
  }

  static iconSizes = {
    small: 14,
    regular: 16,
    large: 18,
  }
  static separatorHeight = {
    small: 28,
    regular: 36,
    large: 44,
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
    this.props.onClear && this.props.onClear(event)
  }

  handleSubmit = event => {
    const { onSubmit, value } = this.props
    onSubmit &&
      onSubmit({
        ...event,
        target: {
          ...event.target,
          value,
        },
        preventDefault: event.preventDefault || (() => {}),
      })
  }

  handleHovering = hover => {
    this.setState({ hover })
  }

  handleFocus = focus => {
    this.setState({ focus })
  }

  render() {
    const { hover, focus } = this.state
    const { size } = this.props
    const iconSize =
      InputSearch.iconSizes[size] || InputSearch.iconSizes.regular

    return (
      <Input
        {...this.props}
        onFocus={() => this.handleFocus(true)}
        onBlur={() => this.handleFocus(false)}
        onMouseEnter={() => this.handleHovering(true)}
        onMouseLeave={() => this.handleHovering(false)}
        onKeyUp={e => e.key === 'Enter' && this.handleSubmit(e)}
        type="search"
        suffix={
          <div className="flex flex-row items-center">
            {this.props.value && (
              <span
                tabIndex={0}
                onClick={this.handleClickClear}
                className="pointer mr4 c-muted-3">
                <ClearIcon size={iconSize} />
              </span>
            )}
            <div
              className={`mh2 bw1 bl ${
                focus ? 'b--muted-2' : hover ? 'b--muted-3' : 'b--muted-4'
              }`}
              style={{
                height:
                  InputSearch.separatorHeight[size] ||
                  InputSearch.separatorHeight.regular,
              }}
            />
            <span className="pointer pl4 c-link" onClick={this.handleSubmit}>
              <SearchIcon size={iconSize} />
            </span>
          </div>
        }
      />
    )
  }
}

InputSearch.propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onClear: PropTypes.func,
  size: PropTypes.string,
  value: PropTypes.string,
}

export default withForwardedRef(InputSearch)
