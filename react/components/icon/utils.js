export const calcIconSize = (iconBase, newSize) => {
  const isHorizontal = iconBase.width >= iconBase.height

  const width = isHorizontal
    ? newSize
    : newSize * iconBase.width / iconBase.height

  const height = !isHorizontal
    ? newSize
    : newSize * iconBase.height / iconBase.width

  return { width, height }
}
