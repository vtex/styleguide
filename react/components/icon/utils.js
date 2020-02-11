import React from 'react'

export const calcIconSize = (iconBase, newSize) => {
  const isHorizontal = iconBase.width >= iconBase.height

  const width = isHorizontal
    ? newSize
    : (newSize * iconBase.width) / iconBase.height

  const height = !isHorizontal
    ? newSize
    : (newSize * iconBase.height) / iconBase.width

  return { width, height }
}

export const baseClassname = (name, variation) =>
  `vtex__icon-${name} ${variation ? `vtex__icon-${name}--${variation}` : ''}`

const Use = ({ id }) => <use href={`#${id}`} xlinkHref={`#${id}`} />

export const IconBase = props => {
  const { size, block, children, id } = props
  const element =
    document && document.getElementById(id) ? (
      <Use id={`icon-${id}`} />
    ) : (
      children
    )
  return (
    <svg
      className={`${baseClassname(id)} ${block ? 'db' : ''}`}
      width={size.width}
      height={size.height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      {element}
    </svg>
  )
}
