#### An Input Dropzone is an area for a drag and drop of files.

```js
class MyDropZone extends React.Component {
  constructor() {
    super()
    this.state = { file: null }
    this.handleFile = this.handleFile.bind(this)
  }

  handleFile(file) {
    this.setState({ file })
  }

  render() {
    const { file } = this.state
    return (
      <InputDropzone onDrop={this.handleFile}>
        <div className="pt7">
          {this.state.file ? (
            <div>
              {file[0].path} - {file[0].size} bytes
            </div>
          ) : (
            <div>
              <span className="f4">Drop here your XLS or </span>
              <span className="f4 c-link" style={{ cursor: 'pointer' }}>
                choose a file
              </span>
            </div>
          )}
        </div>
      </InputDropzone>
    )
  }
}
;<MyDropZone />
```
