A component to shows _something_ when there's nothing to show.
Use a component copy that explains what should be in that space and encourages the user to take the most appropriate action.


Default with title and children

```js
<div>
  <EmptyState
    title="A big headline"
  >
    <p>
      A longer explanation of what should be here, and why should I care about what should be here.
    </p>

    <div className="pt5">
      <Button
        variation="secondary"
        size="small"
      >
        <span className="flex align-baseline">
          Suggested action
        </span>
      </Button>
    </div>
  </EmptyState>
</div>
```
