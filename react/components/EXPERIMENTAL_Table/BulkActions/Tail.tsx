import React, { PropsWithChildren } from 'react'
import classNames from 'classnames'

import ButtonWithIcon from '../../ButtonWithIcon'
import Close from '../../icon/Close'
import Button from '../../Button'
import { ORDER_CLASSNAMES } from '../constants'

export default function Tail({ children }: PropsWithChildren<{}>) {
  const className = classNames(
    'tr flex flex-row items-center',
    ORDER_CLASSNAMES.BULK_CHILD.RIGHT
  )
  return <div className={className}>{children}</div>
}

Tail.Info = Info
Tail.Toggle = Toggle
Tail.Dismiss = Dismiss

function Dismiss({ onClick }: { onClick: () => void }) {
  return <ButtonWithIcon icon={<Close />} onClick={onClick} />
}

function Info({ children }: PropsWithChildren<{}>) {
  return <span className="mr4 c-muted-4">{children}</span>
}

type ToggleProps = PropsWithChildren<{
  button: {
    onClick: () => void
    text: string
  }
  active: boolean
}>

function Toggle({ children, button, active }: ToggleProps) {
  const { onClick, text } = button
  return (
    <span className="mr2">
      {active ? (
        children
      ) : (
        <Button type="button" onClick={onClick}>
          <span className="ttu">{text}</span>
        </Button>
      )}
    </span>
  )
}
