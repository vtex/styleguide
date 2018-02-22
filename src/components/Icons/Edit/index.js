import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Edit extends Component {
  render() {
    return (
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          transform="translate(-198.000000, -660.000000)"
        >
          <g
            transform="translate(198.000000, 660.000000)"
            fill="#444444"
            fillRule="nonzero"
          >
            <path
              d="M11.7,0.3 C11.3,-0.1 10.7,-0.1 10.3,0.3 L0.3,10.3 C0.1,10.5 0,10.7 0,11 L0,15 C0,15.6 0.4,16 1,16 L5,16 C5.3,16 5.5,15.9 5.7,15.7 L15.7,5.7 C16.1,5.3 16.1,4.7 15.7,4.3 L11.7,0.3 Z M4.6,14 L2,14 L2,11.4 L8,5.4 L10.6,8 L4.6,14 Z M12,6.6 L9.4,4 L11,2.4 L13.6,5 L12,6.6 Z"
              id="Shape"
            />
          </g>
        </g>
      </svg>
    )
  }
}

Edit.defaultProps = {
  fill: '#000',
}

Edit.propTypes = {
  fill: PropTypes.string,
}
