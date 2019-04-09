import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import CaretDown from '../icon/CaretDown'
import CaretUp from '../icon/CaretUp'

function handleClick(callback, isOpen) {
  callback &&
    callback({
      target: {
        isOpen,
      },
    })
}

function Collapsible({
  align,
  children,
  header,
  muted,
  onClick: callback,
  isOpen,
}) {
  const color = muted ? 'c-muted-3' : 'c-action-primary'

  return (
    <div>
      <div
        className="flex flex-wrap items-center pointer"
        onClick={() => handleClick(callback, !isOpen)}>
        {align === 'left' ? (
          <Fragment>
            <div className={`${color} mr3`}>
              {isOpen ? <CaretUp /> : <CaretDown />}
            </div>
            <div className="flex-grow-1">{header}</div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="flex-grow-1">{header}</div>
            <div className={`${color} ml3`}>
              {isOpen ? <CaretUp /> : <CaretDown />}
            </div>
          </Fragment>
        )}
      </div>
      {isOpen && children}
    </div>
  )
}

Collapsible.defaultProps = {
  align: 'left',
  isOpen: false,
  muted: false,
}

Collapsible.propTypes = {
  /** Caret alignment.
   * Use _right_ alignment only in small width scenarios. */
  align: PropTypes.oneOf(['right', 'left']),
  /** Content of the collapsible */
  children: PropTypes.node.isRequired,
  /** Component to be used as the header of the collapsible. */
  header: PropTypes.node.isRequired,
  /** Renders the caret in muted-3 instead of action-primary.
   * To be used only in dense scenarios, or when the affordance is clearly
   * conveyed by the context. */
  muted: PropTypes.bool,
  /** Controls whether the collapsible is open or not. */
  isOpen: PropTypes.bool,
  /** _onClick_ event. */
  onClick: PropTypes.func,
}

export default Collapsible
