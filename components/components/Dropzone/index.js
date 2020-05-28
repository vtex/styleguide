import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import ReactDropZone from 'react-dropzone'

import FileIcon from './FileIcon'
import Spinner from '../Spinner'
import ButtonWithIcon from '../ButtonWithIcon'
import IconDelete from '../icon/Delete'

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

  handleDropAccepted = files => {
    this.setState({ isHovering: false, fileDropped: true, files })
    this.props.onDropAccepted(files)
  }

  handleDropRejected = files => {
    this.setState({ isHovering: false })
    this.props.onDropRejected(files)
  }

  handleRemoveFile = fileIndex => {
    const { files } = this.state

    if (files.length > 1) {
      const filteredFiles = files.filter((_, i) => i !== fileIndex)
      this.setState({ files: filteredFiles }, () => {
        this.props.onFileReset(filteredFiles)
      })
    } else {
      this.handleReset()
      this.props.onFileReset()
    }
  }

  handleReset = () => {
    this.setState({ files: [], fileDropped: false })
  }

  render() {
    const { children, isLoading, icon, multiple } = this.props
    const { isHovering, fileDropped, files } = this.state
    const initialState = !isHovering && !fileDropped

    let dropzoneContainerClasses =
      'flex flex-column items-center justify-center b--light-blue ba br2 bw1 b--dashed '
    let iconHolderClasses =
      'flex items-center justify-center pa6  bg-near-white '
    const droppedContainerClasses = 'w-100 '

    const holderSize = '120px'
    const iconHolderStyles = {
      borderRadius: '100%',
      width: holderSize,
      height: holderSize,
    }

    if (initialState) {
      dropzoneContainerClasses += 'pa8 '
    }

    if (isHovering) {
      dropzoneContainerClasses += 'pa8 b--action-primary bg-action-secondary '
      iconHolderClasses += 'bg-action-primary '
    }

    if (fileDropped) {
      dropzoneContainerClasses += 'pv4 ph5 bg-muted-5 b--muted-3 '
    }

    return (
      <ReactDropZone
        ref={dropzoneRef}
        multiple={multiple}
        onDropAccepted={this.handleDropAccepted}
        onDropRejected={this.handleDropRejected}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}>
        {({ getRootProps, getInputProps }) => (
          <div className={dropzoneContainerClasses} {...getRootProps()}>
            {isLoading ? (
              <div className={iconHolderClasses} style={iconHolderStyles}>
                <Spinner size={32} />
              </div>
            ) : fileDropped ? (
              <div className={droppedContainerClasses}>
                {files.map((file, fileIndex) => (
                  <div
                    key={file.name}
                    className={`black-70 flex flex-row justify-between items-center ${
                      files.length > 1 && fileIndex !== files.length - 1
                        ? 'mb2'
                        : ''
                    }`}>
                    <span>{file.name}</span>
                    <ButtonWithIcon
                      onClick={() => this.handleRemoveFile(fileIndex)}
                      variation="tertiary"
                      icon={<IconDelete />}
                    />
                  </div>
                ))}
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
  onDropRejected: () => {},
  children: null,
  icon: null,
  isLoading: false,
  onFileReset: () => {},
  multiple: false,
}

Dropzone.propTypes = {
  /** Callback when file(s) is(are) droppped and accepted */
  onDropAccepted: PropTypes.func.isRequired,
  /** Callback when file(s) is(are) droppped and rejected (e.g: when props.multiple is false and multiple files are dragged and dropped.*/
  onDropRejected: PropTypes.func,
  /** Callback when a file is removed */
  onFileReset: PropTypes.func,
  /** Content after the file icon */
  children: PropTypes.node,
  /** Loading state */
  isLoading: PropTypes.bool,
  /** Custom icon */
  icon: PropTypes.node,
  /** Allow multiple files drop */
  multiple: PropTypes.bool,
}

export default Dropzone
