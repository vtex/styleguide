import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import PaperIcon from './PaperIcon'

const dropzoneRef = createRef()

class InputDropzone extends PureComponent {
  state = {
    isHovering: false,
    fileDropped: false,
  }

  handleDragEnter = () => {
    this.setState({ isHovering: true })
  }

  handleDragLeave = () => {
    this.setState({ isHovering: false })
  }

  handleDrop = files => {
    this.setState({ isHovering: false, fileDropped: true })
    this.props.onDrop(files)
  }

  render() {
    const { children } = this.props
    const { isHovering, fileDropped } = this.state

    const baseClasses =
      'flex flex-column items-center justify-center b--light-blue '

    const hoveredClasses = 'b--action-primary bg-action-secondary '

    let dropzoneContainerClasses = `${baseClasses} ba br2 bw1 b--dashed pa7 pa9-ns `

    const holderSize = '120px'
    let iconHolderClasses =
      'icon-holder-classes pa6 flex items-center justify-center '
    const iconHolderStyles = {
      borderRadius: '100%',
      width: holderSize,
      height: holderSize,
    }

    dropzoneContainerClasses += `${
      isHovering || fileDropped ? hoveredClasses : ''
    }`
    iconHolderClasses += `${
      isHovering || fileDropped ? 'bg-action-primary ' : 'bg-near-white '
    }`

    return (
      <Dropzone
        ref={dropzoneRef}
        onDrop={this.handleDrop}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}>
        {({ getRootProps, getInputProps }) => (
          <div className={dropzoneContainerClasses} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={iconHolderClasses} style={iconHolderStyles}>
              <PaperIcon />
            </div>
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
