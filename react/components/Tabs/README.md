Default

```js
const Tab = require('./Tab').default;
<div>
  <Tabs>
    <Tab label="label 1" active onClick={() => {}} />
    <Tab label="label 2" onClick={() => {}} />
    <Tab label="label 3" onClick={() => {}} />
  </Tabs>
</div>
```

Full width tabs

```js
const Tab = require('./Tab').default;
<div>
  <Tabs fullWidth>
    <Tab label="full width 1" active onClick={() => {}} />
    <Tab label="full width 2" onClick={() => {}} />
    <Tab label="full width 3" onClick={() => {}} />
  </Tabs>
</div>
```

Working example

```js
const Tab = require('./Tab').default;
class TabsExample extends React.Component {
  constructor() {
    super()
    this.state = {
      currentTab: 1
    }
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange(tabIndex) {
    this.setState({
      currentTab: tabIndex,
    })
  }

  render() {
    return (
      <div>
          <Tabs>
            <Tab label="Tab 1" active={this.state.currentTab === 1} onClick={() => this.handleTabChange(1)}>
              <p>Content for tab 1</p>
            </Tab>
            <Tab label="Tab 2" active={this.state.currentTab === 2} onClick={() => this.handleTabChange(2)}>
              <p>Content for tab 2</p>
            </Tab>
            <Tab label="Tab 3" active={this.state.currentTab === 3} onClick={() => this.handleTabChange(3)}>
              <p>Content for tab 3</p>
            </Tab>
          </Tabs>
      </div>
    )
  }
}
;<TabsExample />
```
