import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import ActionMenu from '../../ActionMenu'
import OptionsDots from '../../icon/OptionsDots'

const LineAction: FC<LineActionProps> = ({ lineActions, rowData }) => (
  <>
    <ActionMenu
      buttonProps={{
        variation: 'tertiary',
        icon: <OptionsDots />,
        onMouseEnter: () => {},
        onMouseLeave: () => {},
      }}
      options={lineActions.map(action => ({
        ...action,
        label: action.label({ rowData }),
        onClick: () => action.onClick({ rowData }),
      }))}
    />
  </>
)

type LineAction = {
  label: Function,
  isDangerous: Boolean,
  onClick: Function,
}

export type LineActionProps = {
  lineActions: Array<LineAction>,
  rowData: Object,
}

export default LineAction