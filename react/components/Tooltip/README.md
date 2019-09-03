#### Tooltips are a small informative text that appear when an item is being, hovered, focused or touched.

### 👍 Dos

- Do use tooltips when you want to add a label to an specific icon.
- Do use tooltips when you want to add an informative text in situations where more clarification may be needed.

### 👎 Don'ts

- Don't change the tooltip colors.
- Don't use long texts in tooltips - a good character limit is 220.

#### Positioning tooltip

The position where the tooltip appears can be set and its fallback position too. By default the tooltip appears at the top and follows clockwise.

```jsx
const Button = require('../Button').default

;<div className="flex w-100 justify-between">
  <Tooltip label="Tooltip text">
    <Button variation="tertiary">Top</Button>
  </Tooltip>
  <Tooltip label="Tooltip text" position="left">
    <Button variation="tertiary">Left</Button>
  </Tooltip>
  <Tooltip label="Tooltip text" position="right">
    <Button variation="tertiary">Right</Button>
  </Tooltip>
  <Tooltip label="Tooltip text" position="bottom">
    <Button variation="tertiary">Bottom</Button>
  </Tooltip>
</div>
```

#### Label and Informative text

```jsx
const Edit = require('../icon/Edit').default
const Info = require('../icon/Info').default

;<div className="flex w-100 justify-center items-center">
  <div className="ph9">
    <Tooltip label="Edit">
      <span className="c-on-base pointer">
        <Edit />
      </span>
    </Tooltip>
  </div>
  <div className="ph9">
    <Tooltip label="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
      <span className="c-on-base pointer">
        <Info />
      </span>
    </Tooltip>
  </div>
</div>
```

#### Hover vs Focused

```jsx
const Button = require('../Button').default

;<div className="flex w-100 items-center justify-center">
  <div className="pa3">
    <Tooltip label="Tooltip text">
      <Button variation="tertiary">Hover</Button>
    </Tooltip>
  </div>
  <div className="pa3">
    <Tooltip label="Tooltip text" trigger="focus">
      <Button variation="tertiary">Focused</Button>
    </Tooltip>
  </div>
</div>
```
