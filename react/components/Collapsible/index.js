import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import CaretDown from '../icon/CaretDown'
import CaretUp from '../icon/CaretUp'

function handleClick(callback, opened) {
  callback &&
    callback({
      target: {
        opened: !opened,
      },
    })
}

function Collapsible({
  align,
  children,
  header,
  muted,
  onClick: callback,
  opened,
}) {
  const color = muted ? 'c-muted-3' : 'c-action-primary'

  return (
    <div>
      <div
        className="flex flex-wrap items-center pointer"
        onClick={() => handleClick(callback, !opened)}>
        {align === 'left' ? (
          <Fragment>
            <div className={`${color} mr3`}>
              {opened ? <CaretUp /> : <CaretDown />}
            </div>
            <div>{header}</div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="flex-grow-1">{header}</div>
            <div className={`${color} ml3`}>
              {opened ? <CaretUp /> : <CaretDown />}
            </div>
          </Fragment>
        )}
      </div>
      {opened && <div className="mt4">{children}</div>}
    </div>
  )
}

Collapsible.defaultProps = {
  align: 'left',
  opened: false,
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
  /** Controls whether the collapsible is opened or not. */
  opened: PropTypes.bool,
  /** _onClick_ event. */
  onClick: PropTypes.func,
}

export default Collapsible
