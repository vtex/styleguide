import React, { FC } from 'react'
import csx from 'classnames'

import { ORDER_CLASSNAMES, NAMESPACES } from '../constants'
import Actions from './Actions'
import Right from './Right'

const BULK_ACTIONS_HEIGHT = 56
const BULK_ACTIONS_TRANSITION =
  'height 0.2s ease-in-out, padding 0.2s ease-in-out'

const BulkActions: FC<BulkActionsProps> & Composites = ({
  active = false,
  children,
}) => {
  return (
    <div
      id={NAMESPACES.BULK_ACTIONS}
      className={csx(
        'flex flex-row justify-between bg-action-primary c-on-action-primary br3 br--top ph4',
        {
          pv4: active,
        },
        ORDER_CLASSNAMES.BULK_ACTIONS
      )}
      style={{
        height: active ? BULK_ACTIONS_HEIGHT : 0,
        overflow: active ? 'auto' : 'hidden',
        transition: BULK_ACTIONS_TRANSITION,
      }}>
      {children}
    </div>
  )
}

export type BulkActionsProps = {
  active: boolean
}

type Composites = {
  Actions: FC
  Right: FC
}

BulkActions.Actions = Actions
BulkActions.Right = Right

export default BulkActions
