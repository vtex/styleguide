import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Error extends Component {
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
          transform="translate(-1423.000000, -365.000000)"
        >
          <g
            id="Group"
            transform="translate(1407.000000, 344.000000)"
            fill={this.props.fill}
            fillRule="nonzero"
          >
            <g
              id="circle-bold-remove"
              transform="translate(16.000000, 21.000000)"
            >
              <polygon
                id="Shape"
                points="8.8375 3.9375 7 5.775 5.1625 3.9375 3.9375 5.1625 5.775 7 3.9375 8.8375 5.1625 10.0625 7 8.225 8.8375 10.0625 10.0625 8.8375 8.225 7 10.0625 5.1625"
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

Error.defaultProps = {
  fill: '#FF8080',
}

Error.propTypes = {
  fill: PropTypes.string,
}

export default Error
