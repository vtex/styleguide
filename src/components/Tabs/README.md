Default

```js
const Tab = require('./Tab').default
;<div>
  <Tabs>
    <Tab label="label 1">content 1</Tab>
    <Tab label="label 2">content 2</Tab>
    <Tab label="label 3">content 3</Tab>
  </Tabs>
</div>
```

Start at specific index

```js
const Tab = require('./Tab').default
;<div>
  <Tabs activeIndex={1}>
    <Tab label="label 1">content 1</Tab>
    <Tab label="label 2">content 2</Tab>
    <Tab label="label 3">content 3</Tab>
  </Tabs>
</div>
```
