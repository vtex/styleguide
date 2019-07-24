import React from 'react'

interface Props {
  /** This is a message */
  message?: string
}

export default function Hello(props: Props): React.ReactElement {
  return <div>Hello {props.message || 'Typescript!'}</div>
}
