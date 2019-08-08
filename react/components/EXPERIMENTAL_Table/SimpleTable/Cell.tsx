import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

const propTypes = {
  content: PropTypes.any,
  isHeading: PropTypes.bool,
}

type Props = InferProps<typeof propTypes>

const Cell: FC<Props> = ({ content, isHeading }) => {
  const CellTag = isHeading ? 'th' : 'td'
  const classNames = `w-100 pa2 tl bb b--muted-4 ${isHeading ? 'bt' : ''}`

  return <CellTag className={classNames}>{content}</CellTag>
}

Cell.defaultProps = {
  content: '',
  isHeading: false,
}

Cell.propTypes = propTypes

export default Cell
