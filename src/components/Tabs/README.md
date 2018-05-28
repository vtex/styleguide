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
    this.state = { active: 1 }
  }

  render() {
    const { active } = this.state
    return (
      <div>
        <div>
          <Tab
            label="label 1"
            active={active === 1}
            onClick={() => this.setState({ active: 1 })}
          />
          <Tab
            label="label 2"
            active={active === 2}
            onClick={() => this.setState({ active: 2 })}
          />
          <Tab
            label="label 3"
            active={active === 3}
            onClick={() => this.setState({ active: 3 })}
          />
        </div>
        {active === 1 && <p>Content 1</p>}
        {active === 2 && <p>Content 2</p>}
        {active === 3 && <p>Content 3</p>}
      </div>
    )
  }
}
;<TabsExample />
```
