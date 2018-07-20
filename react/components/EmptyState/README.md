A component to shows _something_ when there's nothing to show.
Use a component copy that explains what should be in that space and encourages the user to take the most appropriate action.

According to [Swetha Suresh](https://medium.com/@swethasuresh1108/the-empty-states-design-mantra-91c56eb88b3b), an Empty State:

- Informs about the empty screen, the whats, whys, and hows
- Prompt towards taking an action to populate the platform
- Educates about the platform and all its features

The idea is that all fields (heading, body and call-to-action) are
optional, however at least a heading or a body should be present for it to
make sense. Optionally the call-to-action can be a link, let's say to a
VTEX Help article for example.

Default with title and children

```js
<div>
  <EmptyState title="A big headline">
    <p>
      A longer explanation of what should be here, and why should I care about
      what should be here.
    </p>

    <div className="pt5">
      <Button variation="secondary" size="small">
        <span className="flex align-baseline">Suggested action</span>
      </Button>
    </div>
  </EmptyState>
</div>
```
