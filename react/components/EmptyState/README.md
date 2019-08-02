#### An Empty State shows _something_ when there's nothing to show. Instead of leaving the user with a blank space, it explains what should be there and encourage to take an appropriate action.

### 👍 Dos
- Guide the user to what should be done to populate that screen, either if it's an empty search result or onboarding of a new product feature.
- Although its parts (heading, body and call-to-action) are all optional, do try to use most of them.
- You may use as a call-to-action whatever makes more sense to you: a button, a link, etc.
- Do use an illustration or icon if it's very important for your product to delight the user at this step.

### 👎 Don'ts
- Don't use informal language. An empty state might be a break in the user expectations, so it's not the time to be funny. But do try to be friendly and instructive.
- Don't reuse the same copy for empty search results and empty application states.


```js
const Button = require('../Button').default

;<div>
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
