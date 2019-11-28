import React from 'react'
import csx from 'classnames'

import ButtonWithIcon from '../../ButtonWithIcon'
import Close from '../../icon/Close'
import Button from '../../Button'
import { ORDER_CLASSNAMES } from '../constants'

export default function Right({ children }) {
  const className = csx(
    'tr flex flex-row items-center',
    ORDER_CLASSNAMES.BULK_CHILD.RIGHT
  )
  return <div className={className}>{children}</div>
}

Right.Info = Info
Right.Toggle = Toggle
Right.Dismiss = Dismiss

function Dismiss({ onClick }: { onClick: () => void }) {
  return <ButtonWithIcon icon={<Close />} onClick={onClick} />
}

function Info({ children }) {
  return <span className="mr4 c-muted-4">{children}</span>
}

function Toggle({ children, button, active }) {
  const { onClick, text } = button
  return (
    <span className="mr2">
      {active ? (
        children
      ) : (
        <Button onClick={onClick}>
          <span className="ttu">{text}</span>
        </Button>
      )}
    </span>
  )
}
