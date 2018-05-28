function replace(source, j, componentName) {
  return j(source)
    .find(j.JSXOpeningElement, { name: { name: componentName } })
    .forEach(p => {
      const { name, attributes, selfClosing } = p.value

      const newAttributes = attributes.map(attribute => {
        if (attribute.name.name === 'size') {
          return j.jsxAttribute(
            j.jsxIdentifier('size'),
            j.literal(getNewSize(attribute.value.value))
          )
        }

        if (
          attribute.name.name === 'primary' ||
          attribute.name.name === 'secondary'
        ) {
          return j.jsxAttribute(
            j.jsxIdentifier('variation'),
            j.literal(attribute.name.name)
          )
        }

        return attribute
      })

      const deprecatedAttribute = attributes.find(isDeprecatedAttribute)
      const hasPropVariation = attributes.find(isPropVariation)

      if (!deprecatedAttribute && !hasPropVariation) {
        newAttributes.unshift(
          j.jsxAttribute(j.jsxIdentifier('variation'), j.literal('tertiary'))
        )
      }

      const hasPropSize = attributes.find(isPropSize)
      if (!hasPropSize) {
        newAttributes.unshift(
          j.jsxAttribute(j.jsxIdentifier('size'), j.literal('small'))
        )
      }

      j(p).replaceWith(j.jsxOpeningElement(name, newAttributes, selfClosing))
    })
    .toSource()
}

function isDeprecatedAttribute(attribute) {
  const { name } = attribute.name
  return ['primary', 'secondary'].includes(name)
}

function isPropVariation(attribute) {
  const { name } = attribute.name
  return name === 'variation'
}

function isPropSize(attribute) {
  const { name } = attribute.name
  return name === 'size'
}

function getNewSize(value) {
  switch (value) {
    case 'regular': {
      return 'small'
    }
    case 'large': {
      return 'regular'
    }
    case 'x-large': {
      return 'large'
    }
    default: {
      return 'regular'
    }
  }
}

module.exports = function(file, { jscodeshift: j }) {
  let { source } = file
  source = replace(source, j, 'Button')

  return source
}
