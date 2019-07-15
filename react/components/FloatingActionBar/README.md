#### Floating Action Bar allow users to easily find the save button while editing an instance of an entity.

### 👍 Dos

- Only use when the action affects the whole page.
- The actions on this component may be used to help user cancel or proceed a new change.
- This component can be used anywhere, but for proper working
  its necessary that the element that has `parentId` as ID to be at the bottom of the page.

### 👎 Don'ts

- Avoid to use this component for specific contexts.
- The component won't be afected by the page overflow.

### Related components

- There is no related components, **yet**.

Version

```js
//Bottom of index.js
<div id="action-bar"/>

//[Where you want to call the component].js
<FloatingActionBar
    parentId="action-bar"
    onSave={() => save(updated)}
    saveLabel={formatMessage(messages.save)}
    cancelLabel={formatMessage(messages.cancel)}
/>
```
