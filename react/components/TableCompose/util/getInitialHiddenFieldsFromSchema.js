export default schema => {
  const hiddenFields = []
  Object.keys(schema.properties).forEach(key => {
    if (schema.properties[key].hidden) {
      hiddenFields.push(key)
    }
  })
  return hiddenFields
}
