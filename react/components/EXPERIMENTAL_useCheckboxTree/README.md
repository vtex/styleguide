The `EXPERIMENTAL_useChecbokTree` is a hook to helps holding state the state of checboxes lists or trees.

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

...

## Detailed props

#### Inputs

The `useCheckboxTree` hook receives a single object as a parameter, which contains the following props:

##### items

- Represents the items of your collection. Each one will be related to a single checkbox and may be toggled by parents.
- **Type**: `Array<T>`
- ⚠️This property is required!

##### nodesKey

- Name of the property that contains the nested items, which is children by default.
- Type: `string`
- **Default**: `'children'`

##### checked

- List of items that are checked by default.
- Type: `Array<T>`
- **Default**: `[]`

##### comparator

- The curry that defines the condition that makes an item unique in the collection. You MUST grant item unicity! If the comparator condition is ambiguous the toggle algorithm will not work as it supposed to.
- **Type**: `(item: T) => (candidante: T) => boolean`
- **Default**: `(item: T) => (candidante: T) => item.id === candidate.id`

##### onToggle

- Funtion that is called on every item toggle.
- **Type**: `({ checkedItems: T[] }) => void`
- **Default**: `undefined`

##### isDisabled

- Function that defines a item disabled or not. Returns `true` for a disabled item
- **Type**: `(item: T | Tree<T>) => boolean`
- **Default**: `() => false`

#### Outputs

##### checkedItems

##### isChecked

##### allChecked

##### someChecked

##### isPartiallyChecked

##### itemTree

##### toggle

##### toggleAll

##### check

##### checkAll

##### uncheck

##### uncheckAll

##### isDisabled

##### disabledItems
