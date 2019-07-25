import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../Button'

import { constants } from '../util'

const Box = ({ alignMenu, height, width, groupActions, children }) => {
  return (
    <div
      className={`absolute ${
        alignMenu === 'right' ? 'right-0' : 'left-0'
      } z-999 ba b--muted-4 br2 mt2 mh2`}
      style={{
        ...constants.BOX_SHADOW_STYLE,
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
  height: PropTypes.number,
  width: PropTypes.number,
  alignMenu: PropTypes.oneOf(['right', 'left']),
  groupActions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      handleClick: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Box
