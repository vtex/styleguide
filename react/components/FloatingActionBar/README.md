#### Floating Action Bar allow users to easily find the save button while editing an instance of an entity.

### 👍 Dos

- Only use when the action affects the whole page.
- The actions on this component may be used to help user cancel or proceed a new change.
- This component can be used anywhere but it will always show at the bottom of the page.

### Usage

See the action bar at the bottom of this page.

```js
<FloatingActionBar
  save={{
    label: 'save',
    onClick: () => alert('This was invoked because save was pressed')
  }}
  cancel={{
    label: 'cancel'
  }}
/>
```
