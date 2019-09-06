import React, { FC } from 'react'

import Button from '../../../Button/index.js'

import { BOX_ALIGNMENT } from '../../constants'

export type BoxProps = {
  height?: string | number
  width?: string | number
  alignMenu?: Alignment
  noMargin?: boolean
  borderClasses?: string
  groupActions?: Array<MenuAction>
}

const Box: FC<BoxProps> = ({
  alignMenu,
  height,
  width,
  noMargin,
  borderClasses,
  groupActions,
  children,
}) => {
  const isAlignRight = alignMenu === BOX_ALIGNMENT.RIGHT
  return (
    <div
      className={`absolute z-999 shadow-4 ${
        isAlignRight ? 'right-0' : 'left-0'
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
                  onClick={action.onClick}>
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

export default Box
