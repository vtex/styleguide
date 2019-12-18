The `EXPERIMENTAL_useChecbokTree` is a hook to helps holding state the state of checboxes lists or trees.

Overview:

#### Inputs

##### items

- Represents the items of your list . The hook will generate a tree
- **Type**: `Array<T>`
- ⚠️This property is required!

##### nodesKey

-
- Type: `string`
- **Default**: `'children'`

##### checked

- Lorem
- Type: `Array<T>`
- **Default**: `[]`

##### comparator

- Curry that defines which props makes a item unique in the collection. It's important to grant unicity, or the checked items will not work as it supposed to.
- **Type**: `(item: T) => (candidante: T) => boolean`
- **Default**: `(item: T) => (candidante: T) => item.id === candidate.id`

##### onToggle

- Funtion that is called on every item toggle.
- **Type**: `({ checkedItems: T[] }) => void`
- **Default**: `undefined`

##### isDisabled

- Lorem
- **Type**: `(item: T | Tree<T>) => boolean`
- **Default**: `() => false`

#### Outputs

checkedItems,
isChecked,
allChecked,
someChecked,
isPartiallyChecked,
itemTree,
toggle,
toggleAll,
check,
checkAll,
uncheck,
uncheckAll,
isDisabled,
disabledItems,

```js
const useCheckboxTree = require('./index.tsx').default
const Checkbox = require('../Checkbox/index.js').default

const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

function Case() {
  const checkboxes = useCheckboxTree({
    items,
  })

  return (
    <>
      <Checkbox
        key={checkboxes.itemTree}
        checked={checkboxes.allChecked}
        partial={checkboxes.someChecked}
        onChange={checkboxes.toggleAll}
        label="Root"
      />

      {checkboxes.itemTree.children.map(item => (
        <Checkbox
          key={item.id}
          id={item.id}
          checked={checkboxes.isChecked(item)}
          partial={checkboxes.isPartiallyChecked(item)}
          onChange={() => checkboxes.toggle(item)}
          label={`item ${item.id}`}
        />
      ))}
    </>
  )
}
;<Case />
```

### Nested

You can define which item
