#### An Input Dropzone is an area for a drag and drop of files.

##### Restrictions

This component requires react 16.8+ (hooks)

Barebone example:

```js
<InputDropzone onDrop={file => console.log(file)} />
```

With children:

```js
<InputDropzone onDrop={file => console.log(file)}>
  <div className="pt7">
    <span className="f4">Drop here your XLS or </span>
    <span className="f4 c-link" style={{ cursor: 'pointer' }}>
      choose a file
    </span>
  </div>
</InputDropzone>
```
