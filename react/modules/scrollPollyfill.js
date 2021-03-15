function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  )
}

if (!isFunction(window.scroll)) {
  window.scroll = window.scrollTo
}
