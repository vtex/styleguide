import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

function Tooltip({ children, label, visible }) {
  return (
    <div className="vtex-tooltip relative z-4 w-100 w-auto-ns flex">
      {children}
      <div
        className={`${styles.tooltip} ${
          visible ? '' : 'dn'
        } vtex-tooltip__container absolute h-auto mw5 bg-base--inverted pa1 br1 z-5`}>
        <div className="vtex-tooltip__label bg-base--inverted c-on-base--inverted pa2 t-body">
          {label}
        </div>
        <div
          className={`${styles.arrow} vtex-tooltip__arrow c-on-base absolute`}
        />
        <div className={`${styles.gap} vtex-tooltip__gap w-100 absolute`} />
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
}

export default Tooltip
