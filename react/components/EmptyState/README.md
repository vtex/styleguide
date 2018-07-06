A component to shows _something_ when there's nothing to show.

## What problem it solves
Explains what should be in that particular space, and encourages the designer/developer to instruct the user what to do.
1. Informs about the empty screen, the whats, whys, and hows
2. Prompt towards taking an action to populate the platform
3. Educates about the platform and all its features

## Design decisions
- A muted color are used so this component has a weak prominence in the screen.
- The container borders helps show the space that would be normally filled in the screen if it wasn't "empty". This reduces cognitive load on consequent user visits.
- Although Empty States [in the wild](http://emptystat.es/) often include a personalized icon, we decided not to include it here for now. In the Credit Control case we had half a dozen empty states possible, and it would be cumbersome to search for custom icons for each one, and we couldn't come up with a reusable pattern for that. In addition to that, an icon, even if with muted colors, adds a lot of visual weight to this section, which in our case wasn't desirable.


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
