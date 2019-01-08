import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Clear extends PureComponent {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.size}
        height={this.props.size}
        viewBox="0 0 16 16"
        fill="none">
        <path
          d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM11.1464 9.74645C11.3417 9.94171 11.3417 10.2583 11.1464 10.4536L10.4536 11.1464C10.2583 11.3417 9.94171 11.3417 9.74645 11.1464L8 9.4L6.25355 11.1464C6.05829 11.3417 5.74171 11.3417 5.54645 11.1464L4.85355 10.4536C4.65829 10.2583 4.65829 9.94171 4.85355 9.74645L6.6 8L4.85355 6.25355C4.65829 6.05829 4.65829 5.74171 4.85355 5.54645L5.54645 4.85355C5.74171 4.65829 6.05829 4.65829 6.25355 4.85355L8 6.6L9.74645 4.85355C9.94171 4.65829 10.2583 4.65829 10.4536 4.85355L11.1464 5.54645C11.3417 5.74171 11.3417 6.05829 11.1464 6.25355L9.4 8L11.1464 9.74645Z"
          fill={this.props.color}
        />
      </svg>
    )
  }
}

Clear.defaultProps = {
  size: 16,
  color: 'currentColor',
}

Clear.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}

export default Clear
