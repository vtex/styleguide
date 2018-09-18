Default card

```jsx
<CollapsableCard label="Click me">
  Hello there
</CollapsableCard>
```

With custom icons

```jsx
const ArrowDown = require('../icon/ArrowDown').default
const ArrowUp = require('../icon/ArrowUp').default

;<CollapsableCard label="I'm another collapsable card" openIcon={ArrowDown} closeIcon={ArrowUp}>
  Lorem ipsum dolor sit amet
</CollapsableCard>
```
