import React from 'react'
import './global.css'
import styles from './styles.css'

interface Props {
  /** This is a message */
  message?: string
}

export default function Hello(props: Props): React.ReactElement {
  console.log(styles)
  return <div className={`hello ${styles.helloTypescript}`}>Hello {props.message || 'Typescript!'}</div>
}
