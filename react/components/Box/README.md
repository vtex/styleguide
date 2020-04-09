#### A simple container for organizing stuff of any sizes or hierarchies.

### 👎 Don'ts

- Don't make the whole box as a big interactable area, use a <a href="#/Components/Containers/Card">Card</a> for that.

```js
<div className="bg-muted-5 pa8">
  <Box title="Distributed Order Management">
    <ul className="mid-gray">
      <li className="mb4">
        Integrate all sales channels through a single order management system.
      </li>
      <li className="mb4">
        Optimize time and costs through multiple fulfillment scenarios as pickup
        points, ship from store, scheduled delivery and more.
      </li>
      <li className="mb4">Simplify order's change and reverse logistics.</li>
      <li className="mb4">
        Create a single source of truth for inventory, logistics, and
        fulfillment.
      </li>
      <li>Stay up to date with our real-time, customizable order flow.</li>
    </ul>
  </Box>
</div>
```
