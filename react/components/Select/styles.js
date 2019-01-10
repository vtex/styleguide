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

export const getDropdownIndicatorPaddingRightFromSize = size => {
  switch (size) {
    case 'large':
      return '1rem' // pr5
    case 'small':
      return '0.5rem' // pr3
    default:
      return '0.75rem' // pr4
  }
}

export const getTagPaddingFromSize = size => {
  switch (size) {
    case 'large':
      return '.25rem .75rem' // pv2 ph4
    case 'small':
      return '0 .125rem' // pv0 ph1
    default:
      return '.25rem .75rem' // pv2 ph4
  }
}
