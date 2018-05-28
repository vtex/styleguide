Default

```js
<div>
  <Tab label="label 1" active />
  <Tab label="label 2" />
  <Tab label="label 3" />
</div>
```

Working example

```js
class TabsExample extends React.Component {
  constructor() {
    super()

    this.state = {
      active: 1,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(value) {
    this.setState({ active: value })
  }

  render() {
    return (
      <div>
        <div>
          <Tab
            label="label 1"
            active={this.state.active === 1}
            onClick={() => this.handleClick(1)}
          />
          <Tab
            label="label 2"
            active={this.state.active === 2}
            onClick={() => this.handleClick(2)}
          />
          <Tab
            label="label 3"
            active={this.state.active === 3}
            onClick={() => this.handleClick(3)}
          />
        </div>
        {this.state.active === 1 && <p>Content 1</p>}
        {this.state.active === 2 && <p>Content 2</p>}
        {this.state.active === 3 && <p>Content 3</p>}
      </div>
    )
  }
}
;<TabsExample />
```
