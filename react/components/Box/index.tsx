import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

const propTypes = {
  /** Content of the box */
  children: PropTypes.node.isRequired,
  /** Use the full size of the box. */
  noPadding: PropTypes.bool,
  /** Title to the box */
  title: PropTypes.string,
}

type Props = InferProps<typeof propTypes>

const Box: FC<Props> = ({ children, noPadding, title }) => {
  const padding = noPadding ? '' : 'pa7'
  return (
    <div
      className={`styleguide__box bg-base t-body c-on-base ${padding} br3 b--muted-4 ba`}>
      {title && <h3 className="t-heading-4 mt0">{title}</h3>}
      {children}
    </div>
  )
}

Box.propTypes = propTypes

export default Box
