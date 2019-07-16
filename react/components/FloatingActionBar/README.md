#### Floating Action Bar allow users to easily find the save button while editing an instance of an entity.

### 👍 Dos

- Only use when the action affects the whole page.
- The actions on this component may be used to help user cancel or proceed a new change.
- This component can be used anywhere but it will always show at the bottom og the page.

### 👎 Don'ts

- Avoid to use this component for specific contexts.
- The component won't be afected by the page overflow.

### Related components

- There is no related components, **yet**.

### Usage

```js
<FloatingActionBar
  onSave={() => alert('This was invoked because save was pressed')}
  saveLabel={formatMessage(messages.save)}
  cancelLabel={formatMessage(messages.cancel)}
/>
```
