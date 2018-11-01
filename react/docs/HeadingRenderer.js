import React from 'react'
import PropTypes from 'prop-types'
// import cx from 'classnames'
// import Styled from 'rsg-components/Styled'

const styles = {
  h1: 'f1 fw1 mt9 mb8',
  h2: 'f1 fw8 mt8 mb2',
  h3: 'f4 fw5 mt7 mb6 c-muted-1',
  h4: 'f4 fw5 mt3 mb2',
  h5: 'f5 fw5 mv2',
  h6: 'f6 fw5 mv1',
}

function HeadingRenderer({ level, children, ...props }) {
  const Tag = `h${level}`
  const headingClasses = styles[Tag]

  return (
    <Tag {...props} className={headingClasses}>
      {children}
    </Tag>
  )
}

HeadingRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node,
}

export default HeadingRenderer
