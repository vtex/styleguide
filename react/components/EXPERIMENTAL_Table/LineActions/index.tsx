import React, { FC } from 'react'

import ActionMenu from '../../ActionMenu'
import OptionsDots from '../../icon/OptionsDots'

const LineAction: FC<LineActionProps> = ({ lineActions, rowData }) => (
  <ActionMenu
    buttonProps={{
      variation: 'tertiary',
      icon: <OptionsDots />
    }}
    options={lineActions.map(action => ({
      ...action,
      label: action.renderLabel? action.renderLabel({ rowData }): action.label,
      onClick: () => action.onClick({ rowData }),
    }))}
  />
)

export type LineActionObject = {
  label: String,
  renderLabel?: ({ rowData: unknow}) => React.ReactNode,
  isDangerous: Boolean,
  onClick: Function,
}

type LineActionProps = {
  lineActions: Array<LineActionObject>,
  rowData: Object,
}

export default LineAction