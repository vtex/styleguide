import React, { FC } from 'react'

import ActionMenu from '../../ActionMenu'
import OptionsDots from '../icon/OptionsDots'

const LineAction: FC<LineActionProps> = ({ lineActions, rowData }) => (
  <ActionMenu
    buttonProps={{
      variation: 'tertiary',
      icon: <OptionsDots />,
    }}
    options={lineActions.map(action => ({
      ...action,
      label: action.renderLabel
        ? action.renderLabel({ rowData })
        : action.label,
      onClick: () => action.onClick({ rowData }),
    }))}
  />
)

export type LineActionObject = {
  label: string
  renderLabel?: ({ rowData: unknow }) => React.ReactNode
  isDangerous: boolean
  onClick: Function
}

export type LineActionProps = {
  lineActions: Array<LineActionObject>
  rowData: Record<string, any>
}

export default LineAction
