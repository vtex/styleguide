import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../Button'

const Box = ({
  alignMenu,
  height,
  width,
  groupActions,
  noMargin,
  borderClasses,
  children,
}) => {
  return (
    <div
      className={`absolute z-999 shadow-4 ${
        alignMenu === 'right' ? 'right-0' : 'left-0'
      } ${borderClasses || 'b--muted-4 br2 ba'} ${noMargin ? '' : 'mt2 mh2'}`}
      style={{
        width: width,
      }}>
      <div className="w-100 b2 br2 bg-base">
        {groupActions && (
          <div className="flex inline-flex bb b--muted-4 w-100 justify-center pv4">
            {groupActions.map(action => (
              <div className="mh2" key={action.id}>
                <Button
                  variation="secondary"
                  size="small"
                  onClick={action.handleClick}>
                  {action.label}
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="overflow-auto" style={{ height: height }}>
          {children}
        </div>
      </div>
    </div>
  )
}

Box.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  alignMenu: PropTypes.oneOf(['right', 'left']),
  groupActions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      handleClick: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  noMargin: PropTypes.bool,
  borderClasses: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Box
