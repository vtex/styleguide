import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Success extends Component {
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
          transform="translate(-1423.000000, -293.000000)"
        >
          <g
            id="Group-6"
            transform="translate(1407.000000, 272.000000)"
            fill={this.props.fill}
            fillRule="nonzero"
          >
            <g id="Group-11" transform="translate(16.000000, 21.000000)">
              <path
                d="M7,0 C3.140375,0 0,3.140375 0,7 C0,10.859625 3.140375,14 7,14 C10.859625,14 14,10.859625 14,7 C14,3.140375 10.859625,0 7,0 Z M7,12.25 C4.104625,12.25 1.75,9.895375 1.75,7 C1.75,4.104625 4.104625,1.75 7,1.75 C9.895375,1.75 12.25,4.104625 12.25,7 C12.25,9.895375 9.895375,12.25 7,12.25 Z"
                id="Shape"
              />
              <polygon
                id="Shape"
                points="6.125 9.98725 3.13775 7 4.375 5.76275 6.125 7.51275 9.625 4.01275 10.86225 5.25"
              />
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

Success.defaultProps = {
  fill: '#8bc34a',
}

Success.propTypes = {
  fill: PropTypes.string,
}

export default Success
