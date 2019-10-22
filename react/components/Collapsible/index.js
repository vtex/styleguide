import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import CaretDown from '../icon/CaretDown'
import CaretUp from '../icon/CaretUp'
import { jsFocusVisible } from './styles.css'

const colorMap = {
  base: 'c-on-base',
  primary: 'c-action-primary',
  muted: 'c-muted-3',
}

function handleClick(callback, isOpen) {
  callback &&
    callback({
      target: {
        isOpen,
      },
    })
}

function mapToCSSClass(color) {
  return colorMap[color]
}

class Collapsible extends Component {
  constructor(props) {
    super(props)
    this.childrenRef = React.createRef()
    this.openTimeout = null
    this.closeTimeout = null
    this.state = {
      height: 0,
    }
  }

  handleTransitionEnd = () => {
    this.setState({
      height: this.props.isOpen ? 'auto' : 0,
    })
  }

  openCard = () => {
    this.childrenRef.current.style.height = 'auto'
    const childrenHeight = this.childrenRef.current.offsetHeight
    this.childrenRef.current.style.height = 0
    /** after force setting element height like the line above
     * you have to force layout / reflow so the height value
     * may actually apply. You can do this by requesting
     * element offsetHeight again, like the line below
     */
    this.childrenRef.current.offsetHeight
    this.setState({
      height: childrenHeight,
    })
  }

  closeCard = () => {
    const childrenHeight = this.childrenRef.current.offsetHeight
    this.setState(
      {
        height: childrenHeight,
      },
      () => {
        window.requestAnimationFrame(() => this.setState({ height: 0 }))
      }
    )
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.setState({ height: 'auto' })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      if (this.props.isOpen) {
        this.openCard()
      } else {
        this.closeCard()
      }
    }
  }

  render() {
    const {
      align,
      children,
      header,
      muted,
      onClick: callback,
      isOpen,
      arrowAlign,
    } = this.props
    let { caretColor } = this.props
    const { height } = this.state
    const childrenContainerStyle = {
      height,
      overflow: 'hidden',
      transition: 'height 250ms ease-in-out',
    }
    if (muted) {
      caretColor = caretColor || 'muted'
      console.warn(
        `The "muted" prop on the "Collapsible" component is depreacted and will be removed in a future version. Use "caretColor='muted'" instead.`
      )
    }

    const color = caretColor ? mapToCSSClass(caretColor) : 'c-action-primary'

    return (
      <div className={jsFocusVisible}>
        <div
          className="flex flex-row items-center pointer"
          tabIndex={0}
          role="button"
          onClick={() => handleClick(callback, !isOpen)}
          onKeyDown={e => e.key === 'Enter' && handleClick(callback, !isOpen)}
          aria-expanded={isOpen}>
          {align === 'left' ? (
            <Fragment>
              <div className={`${color} mr3 self-${arrowAlign}`}>
                {isOpen ? <CaretUp /> : <CaretDown />}
              </div>
              <div className="flex-grow-1">{header}</div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="flex-grow-1">{header}</div>
              <div className={`${color} ml3  self-${arrowAlign}`}>
                {isOpen ? <CaretUp /> : <CaretDown />}
              </div>
            </Fragment>
          )}
        </div>
        <div
          ref={this.childrenRef}
          style={childrenContainerStyle}
          role="region"
          onTransitionEnd={this.handleTransitionEnd}>
          {children}
        </div>
      </div>
    )
  }
}

Collapsible.defaultProps = {
  align: 'left',
  isOpen: false,
  muted: false,
  arrowAlign: 'center',
}

Collapsible.propTypes = {
  /** Caret alignment.
   * Use _right_ alignment only in small width scenarios. */
  align: PropTypes.oneOf(['right', 'left']),
  /** Content of the collapsible */
  children: PropTypes.node.isRequired,
  /** Component to be used as the header of the collapsible. */
  header: PropTypes.node.isRequired,
  /** @deprecated Use the 'muted' option in the caretColor prop instead.
   * To be used only in dense scenarios, or when the affordance is clearly
   * conveyed by the context. */
  muted: PropTypes.bool,
  /** Controls whether the collapsible is open or not. */
  isOpen: PropTypes.bool,
  /** _onClick_ event. */
  onClick: PropTypes.func,
  /** Color or semantic to be applied to the Caret Icon in the Collapsible header.*/
  caretColor: PropTypes.oneOf(Object.keys(colorMap)),
  /** Vertical position of arrow icon.*/
  arrowAlign: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'baseline',
    'stretch',
  ]),
}

export default Collapsible
