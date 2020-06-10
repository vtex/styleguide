import React from 'react'

import ButtonWithIcon from '../../ButtonWithIcon'
import Close from '../icon/Close'
import Button from '../../Button'

export default function Tail({ children }) {
  return <div className="tr flex flex-row items-center order-2">{children}</div>
}

Tail.Info = Info
Tail.Toggle = Toggle
Tail.Dismiss = Dismiss

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
