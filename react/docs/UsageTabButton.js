import PropTypes from 'prop-types'

const UsageTabButton = () => {
  return null
}

UsageTabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  props: PropTypes.shape({
    props: PropTypes.array,
    methods: PropTypes.array,
  }).isRequired,
  active: PropTypes.bool,
}

export default UsageTabButton
