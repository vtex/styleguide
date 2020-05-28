import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  h1: 'near-black f1 fw1 mt9 mb8 lh-title',
  h2: 'near-black f1 fw8 mt8 mb3 lh-title',
  h3: 'near-black f5 fw6 mt7 mb2 ttu lh-title',
  h4: 'near-black f3 fw4 mt3 mb2 lh-copy',
  h5: 'near-black f5 fw5 mv2',
  h6: 'near-black f6 fw5 mv1',
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
  classes: PropTypes.object,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node,
}

export default HeadingRenderer
