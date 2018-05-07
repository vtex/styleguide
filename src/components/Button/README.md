Types

```js
<div>
  <span className="mr4">
    <Button>Neutral</Button>
  </span>
  <span className="mr4">
    <Button primary>Primary</Button>
  </span>
  <span className="mr4">
    <Button secondary>Secondary</Button>
  </span>
  <span className="mr4">
    <Button disabled>Disabled</Button>
  </span>
</div>
```

Sizes

```js
<div>
  <div className="mb4">
    <span className="mr4">
      <Button>Default</Button>
    </span>
    <span className="mr4">
      <Button size="large">Large</Button>
    </span>
    <span className="mr4">
      <Button size="x-large">Extra large</Button>
    </span>
  </div>
  <div className="mb4">
    <span className="mr4">
      <Button primary>Default</Button>
    </span>
    <span className="mr4">
      <Button primary size="large">
        Large
      </Button>
    </span>
    <span className="mr4">
      <Button primary size="x-large">
        Extra large
      </Button>
    </span>
  </div>
  <div className="mb4">
    <span className="mr4">
      <Button secondary>Default</Button>
    </span>
    <span className="mr4">
      <Button secondary size="large">
        Large
      </Button>
    </span>
    <span className="mr4">
      <Button secondary size="x-large">
        Extra large
      </Button>
    </span>
  </div>
  <div>
    <span className="mr4">
      <Button disabled>Default</Button>
    </span>
    <span className="mr4">
      <Button disabled size="large">
        Large
      </Button>
    </span>
    <span className="mr4">
      <Button disabled size="x-large">
        Extra large
      </Button>
    </span>
  </div>
</div>
```

Box types

```js
<div>
  <div className="mb4">
    <Button primary>Default</Button>
  </div>
  <div className="mb4">
    <Button primary block>
      Block
    </Button>
  </div>
</div>
```

Colored container background

```js
<div className="bg-washed-blue pa5">
  <span className="mr4">
    <Button>Neutral</Button>
  </span>
  <span className="mr4">
    <Button primary>Primary</Button>
  </span>
  <span className="mr4">
    <Button secondary>Secondary</Button>
  </span>
  <span className="mr4">
    <Button disabled>Disabled</Button>
  </span>
</div>
```

With icon

```js
const CloseIcon = require('../icon/Close').default
;<Button icon primary>
  <CloseIcon color="#fff" />
</Button>
```

Loading state

```js
class ButtonLoadingExample extends React.Component {
  constructor() {
    super()
    this.state = { isLoading: false, isLoading2: false, isLoading3: false }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleToggle2 = this.handleToggle2.bind(this)
    this.handleToggle3 = this.handleToggle3.bind(this)
  }

  handleToggle() {
    this.setState({ isLoading: !this.state.isLoading })
  }
  handleToggle2() {
    this.setState({ isLoading2: !this.state.isLoading2 })
  }
  handleToggle3() {
    this.setState({ isLoading3: !this.state.isLoading3 })
  }

  render() {
    return (
      <div>
        <span className="mr4">
          <Button
            primary
            onClick={this.handleToggle}
            isLoading={this.state.isLoading}
          >
            Toggle loading state
          </Button>
        </span>
        <span className="mr4">
          <Button
            size="large"
            secondary
            onClick={this.handleToggle2}
            isLoading={this.state.isLoading2}
          >
            Toggle loading state
          </Button>
        </span>
        <span className="mr4">
          <Button
            size="x-large"
            onClick={this.handleToggle3}
            isLoading={this.state.isLoading3}
          >
            Toggle loading state
          </Button>
        </span>
        <span className="mr4">
          <Button disabled onClick={this.handleToggle3} isLoading={true}>
            Toggle loading state
          </Button>
        </span>
      </div>
    )
  }
}
;<ButtonLoadingExample />
```
