#### Basic Tooltip ✨

```jsx
<div className="flex w-100">
  <Tooltip label="Tooltip!" position="left">
    <div className="ba br3 pa3">Tooltip on left</div>
  </Tooltip>
  <Tooltip label="Tooltip!" position="top">
    <div className="ba br3 pa3 ml2">Tooltip on top</div>
  </Tooltip>
  <Tooltip label="Tooltip!" position="bottom">
    <div className="ba br3 pa3 ml2">Tooltip on bottom</div>
  </Tooltip>
  <Tooltip label="Tooltip!" position="right">
    <div className="ba br3 pa3 ml2">Tooltip on right</div>
  </Tooltip>
</div>
```

#### Off the screen

```jsx
<div className="flex flex-column w-100">
  <Tooltip
    label="Tooltip will be at the bottom!"
    position="right"
    fallbackPosition="left">
    <div className="ba br3 pa3">Tooltip on the right with left as fallback</div>
  </Tooltip>
  <Tooltip label="Tooltip will be on bottom!" position="right">
    <div className="ba br3 pa3 mt2">
      Tooltip on right with bottom as default fallback
    </div>
  </Tooltip>
</div>
```

#### On click/focus

```jsx
const ButtonWithIcon = require('../ButtonWithIcon').default
const Button = require('../Button').default
const IconHelp = require('../icon/Help').default

;<div className="flex w-100 items-center">
  <Tooltip label="Tooltip!">
    <div className="pa3">
      <Button variation="tertiary">Tooltip on hover by default</Button>
    </div>
  </Tooltip>
  <Tooltip label="Tooltip!" trigger="focus">
    <div className="pa3">
      <ButtonWithIcon variation="tertiary" icon={<IconHelp />}>
        Tooltip on focus/click
      </ButtonWithIcon>
    </div>
  </Tooltip>
</div>
```
