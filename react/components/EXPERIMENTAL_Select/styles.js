export const getFontClassNameFromSize = size => {
  switch (size) {
    case 'large':
      return 't-body'
    default:
      return 't-small'
  }
}

export const getTagPaddingFromSize = size => {
  switch (size) {
    case 'large':
      return '.25rem .5rem' // pv2 ph3
    case 'small':
      return '0 .125rem' // pv0 ph1
    default:
      return '.25rem .5rem' // pv2 ph3
  }
}

export const getControlHeightFromSize = size => {
  switch (size) {
    case 'large':
      return '3rem'
    case 'small':
      return '2rem'
    default:
      return '2.5rem'
  }
}
