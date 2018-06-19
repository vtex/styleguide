Default

```js
const { Tab } = require('./index');
<div>
  <Tabs>
    <Tab label="label 1" active onClick={() => {}} />
    <Tab label="label 2" onClick={() => {}} />
    <Tab label="label 3" onClick={() => {}} />
  </Tabs>
</div>
```

Working example

```js
const { Tab } = require('./index');
class TabsExample extends React.Component {
  constructor() {
    super()
    this.state = {
      active: 'label 1'
    }
    this.handleTabClick = this.handleTabClick.bind(this)
  }

  handleTabClick(e) {
    this.setState({ active: e.target.id })
  }

  render() {
    return (
      <div>
          <Tabs>
            <Tab label="label 1" active={this.state.active === "label 1"} onClick={this.handleTabClick}>
              <p>Content 1</p>
            </Tab>
            <Tab label="label 2" active={this.state.active === "label 2"} onClick={this.handleTabClick}>
              <p>Content 2</p>
            </Tab>
            <Tab label="label 3" active={this.state.active === "label 3"} onClick={this.handleTabClick}>
              <p>Content 3</p>
            </Tab>
          </Tabs>
      </div>
    )
  }
}
;<TabsExample />
```
