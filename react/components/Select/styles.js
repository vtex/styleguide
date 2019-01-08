export const getFontClassNameFromSize = size => {
  switch (size) {
    case 'large':
      return 't-body'
    case 'small':
    default:
      return 't-small'
  }
}
export const getValueContainerHeightFromSize = size => {
  switch (size) {
    case 'large':
      return '3rem'
    case 'small':
      return '2rem'
    default:
      return '2.5rem'
  }
}
