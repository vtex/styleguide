import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import ReactDropZone from 'react-dropzone'

import FileIcon from './FileIcon'
import Spinner from '../Spinner'
import ButtonWithIcon from '../ButtonWithIcon'
import IconClose from '../icon/Close'

const dropzoneRef = createRef()

class Dropzone extends PureComponent {
  state = {
    files: [],
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
    this.setState({ isHovering: false, fileDropped: true, files })
    this.props.onDrop(files)
  }

  handleReset = () => {
    this.setState({ files: [], fileDropped: false })
  }

  render() {
    const { children, isLoading, icon } = this.props
    const { isHovering, fileDropped, files } = this.state
    const initialState = !isHovering && !fileDropped

    let dropzoneContainerClasses =
      'flex flex-column items-center justify-center b--light-blue ba br2 bw1 b--dashed '
    let iconHolderClasses =
      'flex items-center justify-center pa6  bg-near-white '
    const droppedContainerClasses =
      'bg-light-silver flex flex-row justify-between w-100 items-top'

    const holderSize = '120px'
    const iconHolderStyles = {
      borderRadius: '100%',
      width: holderSize,
      height: holderSize,
    }

    if (initialState) {
      dropzoneContainerClasses += 'pa7 '
    }

    if (isHovering) {
      dropzoneContainerClasses += 'pa7 b--action-primary bg-action-secondary '
      iconHolderClasses += 'bg-action-primary '
    }

    if (fileDropped) {
      dropzoneContainerClasses += 'pv4 ph5 bg-muted-5 b--muted-3 '
    }

    return (
      <ReactDropZone
        ref={dropzoneRef}
        multiple
        onDrop={this.handleDrop}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}>
        {({ getRootProps, getInputProps }) => (
          <div className={dropzoneContainerClasses} {...getRootProps()}>
            {fileDropped ? (
              <div className={droppedContainerClasses}>
                <div className="flex flex-column">
                  {files.map((file, fileIndex) => (
                    <div
                      key={file.name}
                      className={`black-70 ${
                        files.length > 1 && fileIndex !== files.length - 1
                          ? 'mb2'
                          : ''
                      }`}>
                      {file.name}
                    </div>
                  ))}
                </div>
                <ButtonWithIcon
                  onClick={this.handleReset}
                  variation="tertiary"
                  icon={<IconClose />}
                />
              </div>
            ) : isLoading ? (
              <div className={iconHolderClasses} style={iconHolderStyles}>
                <Spinner size="32" />
              </div>
            ) : (
              <>
                <input {...getInputProps()} />
                <div className={iconHolderClasses} style={iconHolderStyles}>
                  {icon || <FileIcon />}
                </div>
                {children && children}
              </>
            )}
          </div>
        )}
      </ReactDropZone>
    )
  }
}

Dropzone.defaultProps = {
  children: null,
  icon: null,
  isLoading: false,
  isLoadingText: null,
}

Dropzone.propTypes = {
  /** Callback with the conten of the file(s) */
  onDrop: PropTypes.func.isRequired,
  /** Content after the file icon */
  children: PropTypes.node,
  /** Loading state */
  isLoading: PropTypes.bool,
  /** Custom icon */
  icon: PropTypes.node,
}

export default Dropzone
