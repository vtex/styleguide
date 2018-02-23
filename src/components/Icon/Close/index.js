import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Close extends PureComponent {
  render() {
    const { fill, width, height } = this.props
    return (
      <svg
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <path
          d="M7.829.171a.552.552 0 0 0-.8 0L4 3.2.971.171a.552.552 0 0 0-.8 0 .552.552 0 0 0 0 .8L3.2 4 .171 7.029a.552.552 0 0 0 0 .8.519.519 0 0 0 .4.171.519.519 0 0 0 .4-.171L4 4.8l3.029 3.029a.617.617 0 0 0 .4.171.617.617 0 0 0 .4-.171.552.552 0 0 0 0-.8L4.8 4 7.829.971a.552.552 0 0 0 0-.8z"
          fill={fill}
        />
      </svg>
    )
  }
}

Close.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Close
