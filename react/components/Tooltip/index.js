import PropTypes from 'prop-types'
import withHover from './withHover'
import TheTooltip from './Tooltip'

const Tooltip = withHover(TheTooltip)

Tooltip.defaultProps = {
  hoverable: true,
}

Tooltip.propTypes = {
  /** If is visible on hover */
  hoverable: PropTypes.bool,
  /** Text inside of the tooltip */
  label: PropTypes.node.isRequired,
  /** Content that the tooltip is aligned centered by */
  children: PropTypes.node.isRequired,
}

export default Tooltip
