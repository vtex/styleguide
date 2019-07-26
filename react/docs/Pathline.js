import React from 'react'
import PropTypes from 'prop-types'
import copy from 'clipboard-copy'
import { MdContentCopy } from 'react-icons/md'
import ToolbarButton from 'rsg-components/ToolbarButton'
import Styled from 'rsg-components/Styled'

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
      <ToolbarButton
        small
        className={classes.copyButton}
        onClick={() => copy(vtexIOString)}
        title="Copy to clipboard">
        <MdContentCopy />
      </ToolbarButton>

      <br />
      <br />
      <small>
        <strong>npm</strong>
      </small>
      <br />
      {npmString}
      <ToolbarButton
        small
        className={classes.copyButton}
        onClick={() => copy(npmString)}
        title="Copy to clipboard">
        <MdContentCopy />
      </ToolbarButton>
    </div>
  )
}

PathlineRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object,
}

export default Styled(styles)(PathlineRenderer)
