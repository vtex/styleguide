import React from 'react'
import PropTypes from 'prop-types'

import { baseClassname } from './utils'

const Use = ({ id }) => <use href={`#${id}`} xlinkHref={`#${id}`} />

Use.propTypes = {
  id: PropTypes.string.isRequired,
}

export const Svg = props => {
  const { size, block, children, name, variation, ...svgProps } = props
  const id = variation ? `icon-${name}-${variation}` : `icon-${name}`
  const element =
    typeof document !== 'undefined' &&
    document &&
    document.getElementById(id) ? (
      <Use id={id} />
    ) : (
      children
    )
  return (
    <svg
      className={`${baseClassname(name, variation)} ${block ? 'db' : ''}`}
      width={size.width}
      height={size.height}
      {...svgProps}>
      {element}
    </svg>
  )
}

Svg.propTypes = {
  name: PropTypes.string.isRequired,
  variation: PropTypes.string,
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  block: PropTypes.bool,
  viewBox: PropTypes.string,
  fill: PropTypes.string,
  xmlns: PropTypes.string,
  xmlnsXlink: PropTypes.string,
  children: PropTypes.node,
}

Svg.defaultProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  size: {
    width: 16,
    height: 16,
  },
  block: false,
  viewBox: '0 0 16 16',
  fill: 'none',
  variation: null,
}
