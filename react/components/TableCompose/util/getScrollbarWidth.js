import constants from './constants'

export default () => {
  if (!window || !document || !document.documentElement)
    return constants.DEFAULT_SCROLLBAR_WIDTH
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth
  return isNaN(scrollbarWidth)
    ? constants.DEFAULT_SCROLLBAR_WIDTH
    : scrollbarWidth
}
