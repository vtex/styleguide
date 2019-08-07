import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

const propTypes = {
  /** Content of the box */
  children: PropTypes.node.isRequired,
  /** Use the full size of the box. */
  noPadding: PropTypes.bool,
}

type Props = InferProps<typeof propTypes>

const Box: FC<Props> = ({ children, noPadding }) => {
  const padding = noPadding ? '' : 'pa7'
  return (
    <div
      className={`styleguide__box bg-base t-body c-on-base ${padding} br3 b--muted-4 bt bb bl br`}>
      {children}
    </div>
  )
}

Box.propTypes = propTypes

export default Box
