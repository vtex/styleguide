import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import ActionMenu from '../../ActionMenu'

const LineActions: FC<Props> = ({ lineActions }) => {
    return <div></div>
}
const propTypes = {
  lineActions: PropTypes.arrayOf(
    PropTypes.shape({
      /** Function that returns a string for the action label */
      label: PropTypes.func,
      /** Mark whether the action performs a dangerous option or not */
      isDangerous: PropTypes.bool,
      /** Handles the callback function of the action */
      onClick: PropTypes.func,
    })
  )
}
type Props = InferProps<typeof propTypes>

export default LineActions