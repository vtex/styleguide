export const calcIconSize = (
  iconBase: { width: number; height: number },
  newSize: number
) => {
  const isHorizontal = iconBase.width >= iconBase.height

  const width = isHorizontal
    ? newSize
    : (newSize * iconBase.width) / iconBase.height

  const height = !isHorizontal
    ? newSize
    : (newSize * iconBase.height) / iconBase.width

  return { width, height }
}

export const baseClassname = (name: string, variation?: string) =>
  `vtex__icon-${name} ${variation ? `vtex__icon-${name}--${variation}` : ''}`
