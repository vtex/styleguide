import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import ActionMenu from '../../ActionMenu'
import OptionsDots from '../../icon/OptionsDots'

const LineAction: FC<LineActionProps> = ({ lineActions }) => {
    return (
    <div>
      <ActionMenu
        buttonProps={{
          variation: 'tertiary',
          icon: <OptionsDots />,
          onMouseEnter: () => {},
          onMouseLeave: () => {},
        }}
        options={lineActions.map(action => ({
          ...action,
          label: action.label,
          onClick: () => action.onClick,
        }))}
      />
    </div>
  )
}

const propTypes = {
  lineActions: PropTypes.arrayOf(
    PropTypes.shape({
      /** Function that returns a string for the action label */
      label: PropTypes.func,
      /** Mark whether the action performs a dangerous option or not */
      isDangerous: PropTypes.bool,
      /** Handles the callback function of the action */
      onClick: PropTypes.func,
    })
  )
}

export type LineActionProps = InferProps<typeof propTypes>

export default LineAction