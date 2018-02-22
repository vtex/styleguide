import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Warning extends Component {
  render() {
    return (
      <svg
        width="14px"
        height="14px"
        viewBox="0 0 14 14"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Tags,-Cards,-msg-box---Components"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          transform="translate(-1423.000000, -438.000000)"
        >
          <g
            id="Group-15"
            transform="translate(1407.000000, 417.000000)"
            fill={this.props.fill}
            fillRule="nonzero"
          >
            <g
              id="circle-bold-delete"
              transform="translate(16.000000, 21.000000)"
            >
              <rect
                id="Rectangle-path"
                x="3.5"
                y="6.125"
                width="7"
                height="1.75"
              />
              <path
                d="M7,0 C3.15,0 0,3.15 0,7 C0,10.85 3.15,14 7,14 C10.85,14 14,10.85 14,7 C14,3.15 10.85,0 7,0 Z M7,12.25 C4.1125,12.25 1.75,9.8875 1.75,7 C1.75,4.1125 4.1125,1.75 7,1.75 C9.8875,1.75 12.25,4.1125 12.25,7 C12.25,9.8875 9.8875,12.25 7,12.25 Z"
                id="Shape"
              />
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

Warning.defaultProps = {
  fill: '#FFB100',
}

Warning.propTypes = {
  fill: PropTypes.string,
}
