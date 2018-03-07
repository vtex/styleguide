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
          webkitTextDecorationStyle: "dotted",
          webkitTextDecorationLine: "underline",
          webkitTextDecorationSkipInk: "none"
        }}
        href="#"
      >
        industry's standard
      </span>
    </ToolTip>{" "}
    dummy text ever since the 1500s, when an unknown printer took a galley of
    type and scrambled it to make a type specimen book.
  </p>
  <p>
    Lorem Ipsum is simply dummy text of the{" "}
    <ToolTip html={"Some text"}>
      <Icon type="warning" />
    </ToolTip>
  </p>
</div>
```

#### Opened & interactive

```js
class TipExample extends React.Component {
  constructor() {
    super()
    this.state = { value: "I am open & interactive" }
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
