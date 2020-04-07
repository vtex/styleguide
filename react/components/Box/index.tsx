import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classNames from 'classnames'

const propTypes = {
  /** Content of the box */
  children: PropTypes.node.isRequired,
  /** Use the full size of the box. */
  noPadding: PropTypes.bool,
  /** Title to the box */
  title: PropTypes.string,
  /** Defines if the Box should fill the parent element's height and width */
  fill: PropTypes.bool,
}

type Props = InferProps<typeof propTypes>

const Box: FC<Props> = ({ children, noPadding, title, fill }) => {
  const boxClasses = classNames(
    'styleguide__box bg-base t-body c-on-base br3 b--muted-4 ba',
    {
      pa7: !noPadding,
      'h-100 w-100': fill,
    }
  )
  return (
    <div className={boxClasses}>
      {title && <h3 className="t-heading-4 mt0">{title}</h3>}
      {children}
    </div>
  )
}

Box.propTypes = propTypes
Box.defaultProps = {
  fill: false,
}

export default Box
