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
initialState = { currentTab: 1 }
<div>
  <Tabs>
    <Tab
      label="Today"
      active={state.currentTab === 1}
      onClick={() => setState({ currentTab: 1 })}>
      <p>Content for today.</p>
    </Tab>
    <Tab
      label="Yesterday"
      active={state.currentTab === 2}
      onClick={() => setState({ currentTab: 2 })}>
      <p>Content for yesterday.</p>
    </Tab>
    <Tab
      label="Last week"
      active={state.currentTab === 3}
      onClick={() => setState({ currentTab: 3 })}>
      <p>Content for last week.</p>
    </Tab>
    <Tab
      label="Last month"
      active={state.currentTab === 4}
      onClick={() => setState({ currentTab: 4 })}>
      <p>Content for last month.</p>
    </Tab>
    <Tab
      label="Last year"
      active={state.currentTab === 5}
      onClick={() => setState({ currentTab: 5 })}>
      <p>Content for last year.</p>
    </Tab>
  </Tabs>
</div>
```

Full width tabs

```js
const Tab = require('./Tab').default
initialState = { currentTab: 1 }
<div>
  <Tabs fullWidth>
    <Tab
      label="Accounts"
      active={state.currentTab === 1}
      onClick={() => setState({ currentTab: 1 })}>
      <p>Content for the accounts.</p>
    </Tab>
    <Tab
      label="Invoices"
      active={state.currentTab === 2}
      onClick={() => setState({ currentTab: 2 })}>
      <p>Content for the invoices.</p>
    </Tab>
    <Tab
      label="Settings"
      active={state.currentTab === 3}
      onClick={() => setState({ currentTab: 3 })}>
      <p>Content for settings.</p>
    </Tab>
  </Tabs>
</div>
```

Disabled tabs

```js
const Tab = require('./Tab').default
<div>
  <Tabs>
    <Tab label="Active and disabled tab" active disabled onClick={() => {}} />
    <Tab label="Disabled tab" disabled onClick={() => {}} />
  </Tabs>
</div>
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
          <p>The end.</p>
        </div>
      </div>
    </Tab>
  </Tabs>
</div>
```
