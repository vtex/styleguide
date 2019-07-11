#### Floating Action Bar allow users to easily fint the save button while editing a instance.

### 👍 Dos

- Only use when the action affects the whole page.
-The actions on this component may be used to help user cancel or proceed a new change.
- This component must be used on the bottom of a page.



### 👎 Don'ts

- Avoid to use this component for specific contexts.
- The component can't be afected by the page overflow.
- Never change the component's position

### Related components

- In some cases for numerical inputs you might want a <a href="#/Components/Forms/NumericStepper">NumericStepper</a>.


Version

```js
///This is just an example and Shall be replaced by the component once it is finished.
const Input = require('./FloatingActionBar.js').default

<div>
const FloatingActionBar = ({
  onSave,
  onCancel,
  cancelLabel,
  saveLabel,
  parentId,
}) => {
  if (document && document.createElement) {
    const barContainer = document.createElement('div')
    const barAsDom = document.getElementById(parentId)
    barAsDom && barAsDom.appendChild(barContainer)

    return barContainer
      ? createPortal(
          <div className="w-100 bg-base shadow-1 tr pv5 pr7 absolute fixed bottom-0">
            <span className="mr5">
              <Button variation="secondary" onClick={onCancel}>
                {cancelLabel}
              </Button>
            </span>
            <span>
              <Button variation="primary" onClick={onSave}>
                {saveLabel}
              </Button>
            </span>
          </div>,
          barContainer
        )
      : null
  }
}
</div>
```
