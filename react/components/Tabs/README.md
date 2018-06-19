Default

```js
<div>
  <Tabs
    options={[
      { id: "1", label: "label 1", onClick: () => {} },
      { id: "2", label: "label 2", onClick: () => {} },
      { id: "3", label: "label 3", onClick: () => {} }
    ]}
    active="1" />
</div>
```

Working example

```js
class TabsExample extends React.Component {
  constructor() {
    super()
    this.handleTabClick = this.handleTabClick.bind(this)
    this.state = { active: "1",
      options: 
      [
        { id: "1", label: "label 1", onClick: this.handleTabClick },
        { id: "2", label: "label 2", onClick: this.handleTabClick },
        { id: "3", label: "label 3", onClick: this.handleTabClick },
      ]
    }
  }

  handleTabClick(e) {
    this.setState({ active: e.target.id })
  }

  render() {
    return (
      <div>
        <div>
          <Tabs
            options={this.state.options}
            active={this.state.active}
          />
        </div>
        {this.state.active === "1" && <p>Content 1</p>}
        {this.state.active === "2" && <p>Content 2</p>}
        {this.state.active === "3" && <p>Content 3</p>}
      </div>
    )
  }
}
;<TabsExample />
```
