import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Close extends Component {
  render() {
    return (
      <svg
        width="8px"
        height="8px"
        viewBox="0 0 8 8"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Tags,-Cards,-msg-box---Components"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          transform="translate(-1836.000000, -434.000000)"
        >
          <g
            id="Group-15"
            transform="translate(1407.000000, 417.000000)"
            fill={this.props.fill}
            fillRule="nonzero"
          >
            <g id="simple-remove" transform="translate(429.000000, 17.000000)">
              <path
                d="M7.82857143,0.171428571 C7.6,-0.0571428571 7.25714286,-0.0571428571 7.02857143,0.171428571 L4,3.2 L0.971428571,0.171428571 C0.742857143,-0.0571428571 0.4,-0.0571428571 0.171428571,0.171428571 C-0.0571428571,0.4 -0.0571428571,0.742857143 0.171428571,0.971428571 L3.2,4 L0.171428571,7.02857143 C-0.0571428571,7.25714286 -0.0571428571,7.6 0.171428571,7.82857143 C0.285714286,7.94285714 0.4,8 0.571428571,8 C0.742857143,8 0.857142857,7.94285714 0.971428571,7.82857143 L4,4.8 L7.02857143,7.82857143 C7.14285714,7.94285714 7.31428571,8 7.42857143,8 C7.54285714,8 7.71428571,7.94285714 7.82857143,7.82857143 C8.05714286,7.6 8.05714286,7.25714286 7.82857143,7.02857143 L4.8,4 L7.82857143,0.971428571 C8.05714286,0.742857143 8.05714286,0.4 7.82857143,0.171428571 Z"
                id="Shape"
              />
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

Close.defaultProps = {
  fill: '#676767',
}

Close.propTypes = {
  fill: PropTypes.string,
}
