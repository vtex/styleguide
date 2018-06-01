Default

```js
<div>
  <div className="mb6">
    <Textarea label="With a label">I haz content</Textarea>
  </div>
  <div className="mb6">
    <Textarea disabled label="Disabled">
      Cant touch this!
    </Textarea>
  </div>
  <div className="mb6">
    <Textarea
      label="With helper"
      helpText={<span>Your help text goes here!</span>}
    >
      I content, shall be readable.
    </Textarea>
  </div>
  <div>
    <Textarea label="With error" error errorMessage="Somehow wrong" />
  </div>
</div>
```
