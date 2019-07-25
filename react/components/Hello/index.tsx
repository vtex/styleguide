import React from 'react'
import PropTypes from 'prop-types'
import './hello.global.css'
import styles from './styles.css'

const propTypes = {
  /** This is a message */
  message: PropTypes.string,
}

type Props = PropTypes.InferProps<typeof propTypes>

export default function Hello(props: Props): React.ReactElement {
  return (
    <div className={`hello ${styles.helloTypescript}`}>
      {props.message || 'This is a Typescript component! (using global css and css modules)'}
    </div>
  )
}

Hello.propTypes = propTypes
