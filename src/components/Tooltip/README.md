Default

```js
<div>
  <p>
    I am a paragraph with a
    <a
      data-tip
      data-for="tipDefault"
      className="dib"
      style={{ borderBottom: '1px dotted #333', cursor: 'help' }}
    >
      tooltip
    </a> in the middle.
  </p>
  <Tooltip id="tipDefault">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </Tooltip>
</div>
```

Custom position

```js
<div>
  <p>
    I am a paragraph with a
    <a
      data-tip
      data-for="tipPosition"
      className="dib"
      style={{ borderBottom: '1px dotted #333', cursor: 'help' }}
    >
      tooltip
    </a> in the middle.
  </p>
  <Tooltip id="tipPosition" position="left">
    <strong>Master of Puppets.</strong>
  </Tooltip>
</div>
```
