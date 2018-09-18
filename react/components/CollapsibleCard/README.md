Default card

```jsx
<CollapsibleCard label="Click me">
  Hello there
</CollapsibleCard>
```

With custom icons

```jsx
const ArrowDown = require('../icon/ArrowDown').default
const ArrowUp = require('../icon/ArrowUp').default

;<CollapsibleCard label="I'm another collapsible card" openIcon={ArrowDown} closeIcon={ArrowUp}>
  Lorem ipsum dolor sit amet
</CollapsibleCard>
```
