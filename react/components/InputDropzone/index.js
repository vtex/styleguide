import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import PaperIcon from './PaperIcon'

const dropzoneRef = createRef()

class InputDropzone extends PureComponent {
  state = {
    isHovering: false,
  }

  handleStartHovering = () => {
    this.setState({ isHovering: true })
  }

  handleStopHovering = () => {
    this.setState({ isHovering: false })
  }

  handleDrop = files => {
    this.setState({ isHovering: false })
    this.props.onDrop(files)
  }

  render() {
    const { children } = this.props
    const { isHovering } = this.state

    const baseClasses = 'flex flex-column items-center justify-center'
    const hoveredClasses = 'b--action-primary bg-action-secondary'
    const nonHoveredClasses = 'b--muted-4'
    let classes = `${baseClasses} ba br2 bw1 b--dashed pa7 pa9-ns `
    classes += `${isHovering ? hoveredClasses : nonHoveredClasses}`

    return (
      <Dropzone
        ref={dropzoneRef}
        onDrop={this.handleDrop}
        onDragEnter={this.handleStartHovering}
        onDragLeave={this.handleStopHovering}>
        {({ getRootProps, getInputProps }) => (
          <div className={classes} {...getRootProps()}>
            <input {...getInputProps()} />
            <PaperIcon />
            {children && children}
          </div>
        )}
      </Dropzone>
    )
  }
}

InputDropzone.propTypes = {
  onDrop: PropTypes.func.isRequired,
  /** Content after the file icon */
  children: PropTypes.node,
}

export default InputDropzone
