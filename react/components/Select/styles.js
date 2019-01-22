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
      return '3rem' // h-large
    case 'small':
      return '2rem' // h-small
    default:
      return '2.5rem' // h-regular
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
