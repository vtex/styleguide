#### Default

```js
<div>
  <p>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the{" "}
    <ToolTip html={"ola 8-)"}>
      <span
        className=""
        style={{
          textDecorationStyle: "dotted",
          textDecorationLine: "underline",
          textDecorationSkipInk: "none",
          WebkitTextDecorationStyle: "dotted",
          WebkitTextDecorationLine: "underline",
          WebkitTextDecorationSkipInk: "none"
        }}
        href="#"
      >
        industry's standard
      </span>
    </ToolTip>{" "}
    dummy text ever since the 1500s, when an unknown printer took a galley of
    type and scrambled it to make a type specimen book.
  </p>
  <p style={{position: 'relative'}}>
    Lorem Ipsum is simply dummy text{" "}
    <ToolTip html={"Some text"}>
      <span style={{
        display: 'inline-block',
        transform: 'rotate(180deg)',
        transformOrigin: 'center',
        marginLeft: '2px'
      }}>
        <Icon type="warning" width="14" fill="368DF7" />
      </span>
    </ToolTip>
  </p>
</div>
```

#### Interactive

```js
class TipExample extends React.Component {
  constructor() {
    super()
    this.state = { value: "I am interactive" }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(data) {
    this.setState({ value: data.target.value })
  }

  render() {
    const htmlContent = (
      <div>
        <label className="mr3">Label</label>
        <input
          value={this.state.value}
          type="text"
          onChange={this.handleChange}
        />
      </div>
    )

    return <ToolTip html={htmlContent}>{this.state.value}</ToolTip>
  }
};

<TipExample />
```
