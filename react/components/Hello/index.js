import React from 'react'
import './hello.global.css'
import styles from './styles.css'

export default function Hello() {
  console.log(styles)
  return <div className={`hello ${styles.helloTypescript}`}>Hello</div>
}
