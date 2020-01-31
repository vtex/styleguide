import React, { FC } from 'react'
import classNames from 'classnames'

import { ORDER_CLASSNAMES, NAMESPACES } from '../constants'
import Actions from './Actions'
import Tail from './Tail'
import useTableMotion from '../hooks/useTableMotion'
import ActionBar from '../ActionBar'

const BULK_ACTIONS_HEIGHT = 56

const DEFAULT_TRANSITION = {
  duration: 200,
  func: 'ease-in-out',
  delay: 0,
  optimize: false,
}

const TRANSITIONS = [
  {
    prop: 'height',
    ...DEFAULT_TRANSITION,
  },
  {
    prop: 'padding',
    ...DEFAULT_TRANSITION,
  },
]

const BulkActions: FC<BulkActionsProps> & Composites = ({
  active = false,
  children,
}) => {
  const motion = useTableMotion(TRANSITIONS)
  const positionFixer =
    React.Children.count(children) > 1 ? null : (
      <div className={ORDER_CLASSNAMES.BULK_CHILD.POSITION_FIXER} />
    )
  return (
    <ActionBar
      id={NAMESPACES.BULK_ACTIONS}
      order={ORDER_CLASSNAMES.BULK}
      className={classNames(
        'flex flex-row justify-between bg-action-primary c-on-action-primary br3 br--top ph4',
        {
          pv4: active,
        }
      )}
      style={{
        height: active ? BULK_ACTIONS_HEIGHT : 0,
        overflow: active ? 'auto' : 'hidden',
        ...motion,
      }}
      noMargin>
      {children}
      {positionFixer}
    </ActionBar>
  )
}

export type BulkActionsProps = {
  active: boolean
}

type Composites = {
  Actions: FC
  Tail: FC
}

BulkActions.Actions = Actions
BulkActions.Tail = Tail

export default BulkActions
