import copy from 'clipboard-copy'
import PropTypes from 'prop-types'
import React from 'react'
import { MdContentCopy } from 'react-icons/md'
// import { Styled, ToolbarButton } from 'rsg-components'

export const styles = ({ space, fontFamily, fontSize, color }) => ({
  pathline: {
    fontFamily: fontFamily.monospace,
    fontSize: fontSize.small,
    color: color.light,
    wordBreak: 'break-all',
  },
  copyButton: {
    marginLeft: space[0],
  },
})

export function PathlineRenderer({ classes, children }) {
  const npmString = `import ${children.componentName} from '@vtex/styleguide/lib/${children.dir}'`
  const vtexIOString = `import { ${children.componentName} } from 'vtex.styleguide'`

  return (
    <div className={classes.pathline}>
      <small>
        <strong>VTEX IO</strong>
      </small>
      <br />
      {vtexIOString}
      {/* <ToolbarButton */}
        small
        className={classes.copyButton}
        onClick={() => copy(vtexIOString)}
        title="Copy to clipboard">
        <MdContentCopy />
      {/* </ToolbarButton> */}

      <br />
      <br />
      <small>
        <strong>npm</strong>
      </small>
      <br />
      {npmString}
      {/* <ToolbarButton */}
        small
        className={classes.copyButton}
        onClick={() => copy(npmString)}
        title="Copy to clipboard">
        <MdContentCopy />
      {/* </ToolbarButton> */}
    </div>
  )
}

PathlineRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object,
}

export default PathlineRenderer
