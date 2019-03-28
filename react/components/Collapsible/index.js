import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import CaretDown from '../icon/CaretDown'
import CaretUp from '../icon/CaretUp'

class Collapsible extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: !props.initiallyOpened,
    }
  }

  handleCollapse = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
    }))
  }

  render() {
    const { collapsed } = this.state
    const { header, children, align, muted } = this.props

    const color = muted ? 'c-muted-3' : 'c-action-primary'

    return (
      <div>
        <div
          className="flex flex-wrap items-center pointer"
          onClick={this.handleCollapse}>
          {align === 'left' ? (
            <Fragment>
              <div className={`${color} mr3`}>
                {collapsed ? <CaretDown /> : <CaretUp />}
              </div>
              <div>{header}</div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="flex-grow-1">{header}</div>
              <div className={`${color} ml3`}>
                {collapsed ? <CaretDown /> : <CaretUp />}
              </div>
            </Fragment>
          )}
        </div>
        {!collapsed && <div className="mt4">{children}</div>}
      </div>
    )
  }
}

Collapsible.defaultProps = {
  align: 'left',
  initiallyOpened: false,
  muted: false,
}

Collapsible.propTypes = {
  /** Caret alignment.
   * Use _right_ alignment only in small width scenarios */
  align: PropTypes.oneOf(['right', 'left']),
  /** Content of the collapsible */
  children: PropTypes.node.isRequired,
  /** Component to be used as the header of the collapsible */
  header: PropTypes.node.isRequired,
  /** Whether the component will be already opened or not when rendered */
  initiallyOpened: PropTypes.bool,
  /** Renders the caret in muted-3 instead of action-primary.
   * To be used only in dense scenarios, or when the affordance is clearly
   * conveyed by the context. */
  muted: PropTypes.bool,
}

export default Collapsible
