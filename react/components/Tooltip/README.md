#### A Tooltip

### 👍 Dos
- If you use the manual version, display it after an user action with a timeout.

### 👎 Don'ts
- Don't keep the Tooltip always visible


Default

```js
const IconHelp = require('../icon/Help').default;
<div class="ml4 mt6 mb6">
  <div class="dib flex">
    <div class="ml3">
      <Tooltip label={
        <div class="w4 lh-copy">
          That is a big message example.
        </div>
      }>
        What does this mean?
        <span class="ml2">
          <IconHelp solid />
        </span>
      </Tooltip>
    </div>
  </div>
</div>
```

Manual Trigger

```js
const IconDownload = require('../icon/Download').default;
initialState = { clicked: false };
<div class="ml7 mt7 mb2">
  <div class="dib w-20">
    <Tooltip hoverable={false} visible={state.clicked} label="Downloading">
      <span
        class="pointer"
        onClick={() => {
          setState({ clicked: true })
          setTimeout(() => (setState({ clicked: false })), 2000)
        }}>
        <IconDownload />
      </span>
    </Tooltip>
  </div>
</div>
```
