```md
To import Tabs children (Tab) when using in `npm` you can either

`import Tab from '@vtex/styleguide/lib/Tab'` or

`import Tab from '@vtex/styleguide/lib/Tabs/Tab'`
```

#### Tabs are navigation solutions for alternating between content that is in the same level of hierarchy.

### 👍 Dos

- Use short labels.
- Use tabs in any place of your page hierarchy: as a top-level navigation or inside another component.
- You may use icons instead of text if you want, but be mindful it may hurt usability.

### 👎 Don'ts

- Don't use too many tabs. More than 5 starts looking weird.
- Don't use dropdown menus with these tabs (althought we might one day support that).
- Don't nest tabs directly inside tabs, it will be very confusing. (@todo we might need an alternative visual for tabs when used inside other tabs)
- Avoid forcing the user to alternate back-and-forth between tabs to execute an important task.

### Related components

- <a href="#/Components/Forms/ButtonGroup">ButtonGroup</a>

Default

```js
const Tab = require('./Tab').default
;<div>
  <Tabs>
    <Tab label="label 1" active onClick={() => {}} />
    <Tab label="label 2" onClick={() => {}} />
    <Tab label="label 3" onClick={() => {}} />
  </Tabs>
</div>
```

Full width tabs

```js
const Tab = require('./Tab').default
;<div>
  <Tabs fullWidth>
    <Tab label="full width 1" active onClick={() => {}} />
    <Tab label="full width 2" onClick={() => {}} />
    <Tab label="full width 3" onClick={() => {}} />
  </Tabs>
</div>
```

Disabled tabs

```js
const Tab = require('./Tab').default
;<div>
  <Tabs>
    <Tab label="Active and disabled tab" active disabled onClick={() => {}} />
    <Tab label="Disabled tab" disabled onClick={() => {}} />
  </Tabs>
</div>
```

Working example

```js
const Tab = require('./Tab').default
class TabsExample extends React.Component {
  constructor() {
    super()
    this.state = {
      currentTab: 1,
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
          <Tab
            label="Tab 1"
            active={this.state.currentTab === 1}
            onClick={() => this.handleTabChange(1)}>
            <p>Content for tab 1</p>
          </Tab>
          <Tab
            label="Tab 2"
            active={this.state.currentTab === 2}
            onClick={() => this.handleTabChange(2)}>
            <p>Content for tab 2</p>
          </Tab>
          <Tab
            label="Tab 3"
            active={this.state.currentTab === 3}
            onClick={() => this.handleTabChange(3)}>
            <p>Content for tab 3</p>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
;<TabsExample />
```

Sticky Example

```jsx
const Tab = require('./Tab').default
;<div className="h4">
  <Tabs sticky>
    <Tab label="Tab 1" active>
      <div className="h5 flex flex-column">
        <p>Scroll to see full content</p>
        <div className="flex items-end h-100">
          <p>The end!</p>
        </div>
      </div>
    </Tab>
  </Tabs>
</div>
```
