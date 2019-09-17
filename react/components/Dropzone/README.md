#### A Dropzone is an area for a drag and drop of files.

Working example

```js
class MyDropZone extends React.Component {
  constructor() {
    super()
    this.state = { files: null }
    this.handleFile = this.handleFile.bind(this)
  }

  handleFile(files) {
    console.log(files)
  }

  handleReset(files) {
    if (files) {
      console.log(files)
    }
  }

  render() {
    return (
      <Dropzone onDropAccepted={this.handleFile} onFileReset={this.handleReset}>
        <div className="pt7">
          <div>
            <span className="f4">Drop here your XLS or </span>
            <span className="f4 c-link" style={{ cursor: 'pointer' }}>
              choose a file
            </span>
          </div>
        </div>
      </Dropzone>
    )
  }
}
;<MyDropZone />
```

Custom icon

```js
const TableIcon = (
  <svg width="44" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 24h44v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V24z" fill="#E3E4E6" />
    <rect x="4" y="29" width="8" height="2" rx="1" fill="#727273" />
    <rect x="18" y="29" width="8" height="2" rx="1" fill="#727273" />
    <rect x="36" y="29" width="4" height="2" rx="1" fill="#727273" />
    <path d="M44 12H0V1a1 1 0 0 1 1-1h42a1 1 0 0 1 1 1v11z" fill="#F71963" />
    <rect
      x="40"
      y="7"
      width="4"
      height="2"
      rx="1"
      transform="rotate(180 40 7)"
      fill="#fff"
    />
    <rect
      x="26"
      y="7"
      width="8"
      height="2"
      rx="1"
      transform="rotate(180 26 7)"
      fill="#fff"
    />
    <rect
      x="12"
      y="7"
      width="8"
      height="2"
      rx="1"
      transform="rotate(180 12 7)"
      fill="#fff"
    />
    <path d="M0 12h44v12H0V12z" fill="#CACBCC" />
    <rect x="4" y="17" width="8" height="2" rx="1" fill="#727273" />
    <rect x="18" y="17" width="8" height="2" rx="1" fill="#727273" />
    <rect x="36" y="17" width="4" height="2" rx="1" fill="#727273" />
  </svg>
)
;<div>
  <Dropzone icon={TableIcon} />
</div>
```

Loading state

```js
<Dropzone isLoading />
```
