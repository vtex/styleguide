import React from 'react'
import PropTypes from 'prop-types'
import { baseClassname } from '../icon/utils'

const radius = 40
const circ = 2 * radius * Math.PI

const WORKING = 'working'
const IDLE = 'idle'

class Spinner extends React.Component {
  constructor(props) {
    super(props)

    this.strokeAnim = React.createRef()

    this.state = {
      animating: props.status === WORKING,
    }
  }

  onNextLoop = callback => {
    this.strokeAnim.current.onrepeat = () => {
      callback()
      this.strokeAnim.current.onrepeat = null
    }
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    const { status: prevStatus } = prevProps

    if (status !== prevStatus) {
      if (status === IDLE) {
        this.onNextLoop(() => {
          this.setState({
            animating: false,
          })
        })
      } else if (status === WORKING) {
        this.onNextLoop(() => {
          this.setState({
            animating: true,
          })
        })
      }
    }
  }

  render() {
    const { color, size, block } = this.props
    const { animating } = this.state

    return (
      <svg
        className={
          `${baseClassname('spinner')} ${!color ? 'c-action-primary' : ''} ${block ? 'db' : ''}`
        }
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        height={size}
        width={size}
      >
        <g visibility={animating ? 'inherit' : 'hidden'}>
          <circle
            cx="50"
            cy="50"
            fill="none"
            r={radius}
            stroke={color || 'currentColor'}
            strokeWidth="10"
            strokeDasharray={`0 0 2 ${circ}`}
            strokeLinecap="round"
            strokeDashoffset="1"
            transform="rotate(-90 50 50)"
          >
            <animate
              attributeName="stroke-dasharray"
              dur="1.25s"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.455, 0.030, 0.515, 0.955; 0.455, 0.030, 0.515, 0.955"
              repeatCount="indefinite"
              values={
                `0 0 2 ${circ};
          0 0 ${circ * 0.75} ${circ};
          0 ${circ - 2} ${circ * 0.75} ${circ}`
              }
              ref={this.strokeAnim}
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              calcMode="linear"
              values="-90 50 50;275 50 50"
              keyTimes="0;1"
              dur="0.625s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    )
  }
}

Spinner.propTypes = {
  /** Color of the spinner */
  color: PropTypes.string,
  /** Size (diameter) of the spinner */
  size: PropTypes.number,
  /** Status of the spinner; used for smooth transitioning between different states */
  status: PropTypes.oneOf(['working', 'idle']),
  /** Sets the display to block */
  block: PropTypes.bool,
}

Spinner.defaultProps = {
  block: false,
  size: 40,
  status: WORKING,
}

export default Spinner
