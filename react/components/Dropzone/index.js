import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import PaperIcon from './PaperIcon'

const dropzoneRef = createRef()

class InputDropzone extends PureComponent {
  constructor() {
    super()
    this.state = {
      isHovering: false,
    }
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
    const { isHovering } = this.state
    const classes = `ba tc br2 bw1 b--dashed ${
      isHovering ? '' : 'b--muted-4'
    } pa7 pa9-ns`

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
            <div className="pt7">
              <span className="f4">Drop here your XLS or </span>
              <span className="f4 c-link" style={{ cursor: 'pointer' }}>
                choose a file
              </span>
            </div>
          </div>
        )}
      </Dropzone>
    )
  }
}

InputDropzone.propTypes = {
  onDrop: PropTypes.func.isRequired,
}

export default InputDropzone
