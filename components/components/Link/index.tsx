import React from 'react'
import PropTypes from 'prop-types'

import ExternalLink from '../icon/ExternalLink'

const classes =
  'pointer c-link hover-c-link active-c-link no-underline underline-hover'

const Link = ({ children, href, target, mediumWeigth }) => (
  <a
    href={href}
    target={target}
    className={`${classes} ${mediumWeigth ? 'fw5' : ''}`}>
    {children}
    {target === '_blank' && (
      <span className="ml2">
        <ExternalLink size={12} />
      </span>
    )}
  </a>
)

Link.defaultProps = {
  target: '_self',
  mediumWeigth: false,
}

Link.propTypes = {
  /** Content of the link */
  children: PropTypes.string.isRequired,
  /** Spec attribute */
  href: PropTypes.string.isRequired,
  /** Spec attribute */
  target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
  /** Weight property */
  mediumWeigth: PropTypes.bool,
}

export default Link
