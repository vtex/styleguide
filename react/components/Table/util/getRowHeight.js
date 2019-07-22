export default density => {
  switch (density) {
    case 'low':
      return 76
    case 'medium':
      return 48
    case 'high':
      return 32
    default:
      return 45
  }
}
